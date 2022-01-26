import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';

const CreatorResult = ({
  // _id,
  _fullName,
  // _resourceURI,
  _thumbnail,
  _comics,
  // _series,
  // _stories,
  _index,
}) => {
  const { path } = _thumbnail;
  // const fullPath = `${path}/portrait_xlarge.jpg`;
  // const comicsArr = _comics.items;

  return (
    <Card
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      align='center'
      jusitfy='center'
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography lineHeight={1} variant='h6'>
          {_fullName}
        </Typography>
      </CardContent>

      <CardActions style={{ justifyContent: 'center' }}>
        <Button variant='filled' size='small'>
          <Link to={`/creator/${_index}`}>
            <Typography lineHeight={1} variant='subtitle1' color='primary'>
              {`Comics by ${_fullName}`}
            </Typography>
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default CreatorResult;
