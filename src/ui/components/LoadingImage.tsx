import React from 'react';
import FastImage from 'react-native-fast-image';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

type LoadingImageProps = React.ComponentProps<typeof FastImage>;

const LoadingImage = React.memo<LoadingImageProps>(props => {
  const [loading, setLoading] = React.useState(true);

  return (
    <View>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}
      <FastImage
        {...props}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
});

export default LoadingImage;

const styles = StyleSheet.create({
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
});
