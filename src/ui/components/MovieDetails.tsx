import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import type {ModalProps} from 'react-native-modalfy';
import Backdrop from './Backdrop.tsx';
import Poster from './Poster.tsx';
import dayjs from 'dayjs';

type MovieDetailsProps = ModalProps<'MovieDetails'>;

const MovieDetails = React.memo<MovieDetailsProps>(({modal: {params}}) => {
  const {width} = useWindowDimensions();

  if (!params) {
    return null;
  }

  return (
    <SafeAreaView style={[styles.container, {width}]}>
      <Backdrop url={params.movie.backdrop_path} />
      <View style={styles.content}>
        <View style={styles.posterContainer}>
          <Poster style={styles.poster} url={params.movie.poster_path} />
          <Text style={styles.title}>{params.movie.title}</Text>
        </View>

        <Text style={styles.date}>
          Дата выхода фильма:
          {dayjs(params.movie.release_date, 'YYYY-MM-DD').format('DD MMM YYYY')}
        </Text>
        <Text style={styles.overview}>{params.movie.overview}</Text>
      </View>
    </SafeAreaView>
  );
});

export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },

  content: {
    paddingTop: 8,
  },

  posterContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: -150,
  },

  title: {
    flex: 1,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '900',
    textAlign: 'right',
    backgroundColor: 'white',
    paddingRight: 8,
  },

  poster: {
    height: 200,
    marginLeft: 8,
  },

  overview: {
    margin: 16,
    fontSize: 16,
    lineHeight: 24,
  },

  date: {
    fontSize: 12,
    lineHeight: 16,
    marginLeft: 16,
    marginTop: 8,
    color: 'gray',
  },
});
