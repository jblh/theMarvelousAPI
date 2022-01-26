import React, { useRef } from 'react';
import { useGlobalContext } from '../context';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const { selectedCategory, setSelectedCategory } = useGlobalContext();

  const myInputRef = useRef();

  React.useEffect(() => {
    myInputRef.current.focus();
  }, []);

  const searchMarvel = () => {
    setSearchTerm(myInputRef.current.value);
  };

  const clearInput = () => {
    myInputRef.current.value = '';
  };

  return (
    <div>
      <Box pt={5}>
        <Container align='center'>
          <InputLabel>
            <Typography variant='subtitle1' color='primary' marginBottom='10px'>
              Search for:
            </Typography>
            <Button
              onClick={() => {
                setSelectedCategory('character');
                clearInput();
              }}
              variant={
                selectedCategory === 'character' ? 'contained' : 'filled'
              }
              color={selectedCategory === 'character' ? 'primary' : 'secondary'}
            >
              character
            </Button>
            <Button
              onClick={() => {
                setSelectedCategory('creator');
                clearInput();
              }}
              variant={selectedCategory === 'creator' ? 'contained' : 'filled'}
              color={selectedCategory === 'creator' ? 'primary' : 'secondary'}
            >
              creator
            </Button>
            <Button
              onClick={() => {
                setSelectedCategory('comic');
                clearInput();
              }}
              variant={selectedCategory === 'comic' ? 'contained' : 'filled'}
              color={selectedCategory === 'comic' ? 'primary' : 'secondary'}
            >
              comic
            </Button>
          </InputLabel>
          <TextField
            variant='standard'
            inputRef={myInputRef}
            onChange={searchMarvel}
            align='inherit'
            style={{ width: 200 }}
          />
        </Container>
      </Box>
    </div>
  );
};

export default SearchForm;
