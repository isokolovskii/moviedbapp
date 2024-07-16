import React from 'react';
import {Image, ImageStyle, StyleProp, StyleSheet} from 'react-native';
import {TMDB_IMAGE_URL} from '../../config';

interface PosterProps {
  url: string;
  style?: StyleProp<ImageStyle>;
}

const Backdrop = React.memo<PosterProps>(({url, style}) => {
  return (
    <Image
      source={{uri: `${TMDB_IMAGE_URL}/${url}`}}
      style={[styles.poster, style]}
    />
  );
});

const styles = StyleSheet.create({
  poster: {
    aspectRatio: 16 / 9,
  },
});

export default Backdrop;
