import React from 'react';
import CharacterResult from './CharacterResult';
import CreatorResult from './CreatorResult';
import Loading from './Loading';
import { useGlobalContext } from '../context';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import SingleComic from '../pages/SingleComic';

const ResultsList = () => {
  const { characters, creators, comicsBySearch, loading, selectedCategory } =
    useGlobalContext();

  if (loading) {
    return <Loading />;
  }

  if (selectedCategory === 'character') {
    if (characters.length < 1) {
      return (
        <Typography
          variant='body2'
          align='center'
          color='primary'
          marginTop='140px'
        >
          No characters matched your search criteria
        </Typography>
      );
    }

    return (
      <Grid container spacing={4}>
        {characters.map((item, index) => {
          item._index = index;
          return (
            <Grid
              item
              key={item._id}
              mt={10}
              ml={0}
              mr={0}
              xs={12}
              sm={6}
              md={4}
              lg={2}
            >
              <CharacterResult key={item._id} {...item} />
            </Grid>
          );
        })}
      </Grid>
    );
  }

  if (selectedCategory === 'creator') {
    if (creators.length < 1) {
      return (
        <Typography
          variant='body2'
          align='center'
          color='primary'
          marginTop='140px'
        >
          No creators matched your search criteria
        </Typography>
      );
    }

    return (
      <Grid container spacing={4}>
        {creators.map((item, index) => {
          item._index = index;
          return (
            <Grid
              item
              key={item._id}
              mt={10}
              ml={0}
              mr={0}
              xs={12}
              sm={6}
              md={4}
              lg={2}
            >
              <CreatorResult key={item._id} {...item} />
            </Grid>
          );
        })}
      </Grid>
    );
  }

  if (selectedCategory === 'comic') {
    if (comicsBySearch.length < 1) {
      return (
        <Typography
          variant='body2'
          align='center'
          color='primary'
          marginTop='140px'
        >
          No comics matched your search criteria
        </Typography>
      );
    }

    return <SingleComic />;
  }
};

export default ResultsList;
