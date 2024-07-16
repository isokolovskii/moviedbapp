import React from 'react';
import {type StyleProp, StyleSheet} from 'react-native';
import {TMDB_IMAGE_URL} from '../../config';
import {type ImageStyle} from 'react-native-fast-image';
import LoadingImage from './LoadingImage';

interface PosterProps {
  url: string;
  style?: StyleProp<ImageStyle>;
}

const Backdrop = React.memo<PosterProps>(({url, style}) => {
  return (
    <LoadingImage
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
