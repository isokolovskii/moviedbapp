import {useActions, useTypedSelector} from '../hooks';
import React from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {Item, ItemComponentStyles} from './components';

const MoviesList: React.FC = () => {
  const {width} = useWindowDimensions();
  const {fetchMovies, refreshMovies, fetchMoreMovies} = useActions();
  const {loading, refreshing, data, error, fetchingMore} = useTypedSelector(
    state => state.movies,
  );

  const estimatedItemHeight = React.useMemo(
    () =>
      (width / 2 - ItemComponentStyles.item.padding * 2) * 1.5 +
      ItemComponentStyles.text.marginTop +
      ItemComponentStyles.text.lineHeight * 2 +
      ItemComponentStyles.item.padding * 2,
    [width],
  );

  React.useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      console.log('Refreshing every 30 seconds...');
      refreshMovies();
    }, 1000 * 30);
    return () => {
      clearInterval(interval);
    };
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating size={'large'} />
      </View>
    );
  }

  if (error) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        numColumns={2}
        renderItem={props => <Item {...props} />}
        keyExtractor={item => `${item.original_title}-${item.id}`}
        onEndReached={fetchMoreMovies}
        onEndReachedThreshold={0.2}
        estimatedItemSize={estimatedItemHeight}
        data={data}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshMovies} />
        }
        ListFooterComponent={
          fetchingMore ? (
            <View style={styles.loadingMoreContainer}>
              <ActivityIndicator animating size={'small'} />
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default MoviesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingMoreContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
});
