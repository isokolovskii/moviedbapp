import type {Movie} from '../../api';
import React from 'react';
import Poster from './Poster';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useModal} from 'react-native-modalfy';

interface ItemComponentProps {
  movie: Movie;
}

const Item = React.memo<ItemComponentProps>(({movie}) => {
  const {openModal} = useModal();

  const onPress = React.useCallback(() => {
    openModal('MovieDetails', {movie});
  }, [movie, openModal]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Poster url={movie.poster_path} style={styles.poster} />
      <Text numberOfLines={2} style={styles.text}>
        {movie.title}
      </Text>
    </TouchableOpacity>
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
