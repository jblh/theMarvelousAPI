import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';

const CharacterResult = ({ _name, _thumbnail, _index }) => {
  const { path } = _thumbnail;
  const fullPath = `${path}/portrait_uncanny.jpg`;

  return (
    <Card
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      align='center'
      jusitfy='center'
    >
      <CardMedia component='img' image={fullPath} alt='random' />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography lineHeight={0} variant='button'>
          {_name}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'center' }}>
        <Button variant='filled' size='small'>
          <Link to={`/character/${_index}`}>
            <Typography lineHeight={1} variant='subtitle1' color='primary'>
              comics
            </Typography>
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default CharacterResult;
