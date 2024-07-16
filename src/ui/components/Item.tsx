import type {ListRenderItem} from '@shopify/flash-list';
import type {Movie} from '../../api';
import React from 'react';
import {Poster} from './index.ts';
import {StyleSheet, Text, View} from 'react-native';

interface ItemComponentProps extends ListRenderItem<Movie> {}

const Item = React.memo<ItemComponentProps>(({item}) => {
  return (
    <View style={styles.item}>
      <Poster url={item.poster_path} style={styles.poster} />
      <Text numberOfLines={2} style={styles.text}>
        {item.title}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 4,
  },

  text: {
    marginTop: 4,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
  },

  poster: {
    borderRadius: 4,
  },
});

export default Item;
export {styles as ItemComponentStyles};
