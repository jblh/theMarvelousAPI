import React, { useState, useContext, useEffect } from 'react';
import { useCallback } from 'react';

const AppContext = React.createContext();
const characterUrl = `https://gateway.marvel.com/v1/public/characters?apikey=`;
const creatorUrl = `https://gateway.marvel.com/v1/public/creators?apikey=`;
const comicUrl = `https://gateway.marvel.com/v1/public/comics?apikey=`;
const apikey = process.env.REACT_APP_MARVEL_API_KEY;

// TO AVOID INFINITE LOOP:
// use useCallback, so that this function will not be created from scratch
// unless something inside it will change, like the searchTerm.

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('a');
  const [characters, setCharacters] = useState([]);
  const [creators, setCreators] = useState([]);

  const [comics, setComics] = useState([]);
  const [charName, setCharName] = useState('');
  const [creatorId, setCreatorId] = useState(0);
  const [creatorName, setCreatorName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('character');
  // This is the one I use by fetchComics. FetchComics is not like fetchCharacter & Creator, because I simply uses the fetch from the search
  // directly, without having to do a fetch for comics.
  // I set it here, then deconstruct it in SingleComic, call Comic with the values from comicsBySearch.
  const [comicsBySearch, setComicsBySearch] = useState([]);

  // FETCH CHARACTERS
  const fetchCharacters = useCallback(async () => {
    setLoading(true);

    try {
      const responseJson = await asyncFetchCharacters();

      const {
        data: { results },
      } = responseJson;

      if (results) {
        const NewArrayOfCharacters = results.map((character) => {
          const {
            comics,
            description,
            events,
            id,
            modified,
            name,
            resourceURI,
            series,
            stories,
            thumbnail,
            urls,
          } = character;

          return {
            _comics: comics,
            _description: description,
            _events: events,
            _id: id,
            _modified: modified,
            _name: name,
            _resourceURI: resourceURI,
            _series: series,
            _stories: stories,
            _thumbnail: thumbnail,
            _urls: urls,
          };
        });
        setCharacters(NewArrayOfCharacters);
      } else {
        setCharacters([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  });
  const asyncFetchCharacters = async () => {
    try {
      const myfetchReq = await fetch(
        `${characterUrl}${apikey}&nameStartsWith=${searchTerm}`
      );
      const theBigReq = await myfetchReq.json();
      return theBigReq;
    } catch (error) {
      console.log(`error: ${error.message}`);
    }
  };

  // FETCH CREATORS
  const fetchCreators = useCallback(async () => {
    setLoading(true);

    try {
      const responseJson = await asyncFetchCreators();

      const {
        data: { results },
      } = responseJson;

      if (results) {
        const NewArrayOfCreators = results.map((creator) => {
          const {
            id,
            fullName,
            resourceURI,
            thumbnail,
            comics,
            series,
            stories,
          } = creator;

          return {
            _id: id,
            _fullName: fullName,
            _resourceURI: resourceURI,
            _thumbnail: thumbnail,
            _comics: comics,
            _series: series,
            _stories: stories,
          };
        });
        setCreators(NewArrayOfCreators);
      } else {
        setCreators([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  });
  const asyncFetchCreators = async () => {
    try {
      const myfetchReq = await fetch(
        `${creatorUrl}${apikey}&nameStartsWith=${searchTerm}`
      );
      const theBigReq = await myfetchReq.json();
      return theBigReq;
    } catch (error) {
      console.log(`error: ${error.message}`);
    }
  };

  // FETCH COMICS
  // I'll use a SingleComic page to be the parent of the multiple comic objects.
  const fetchComics = useCallback(async () => {
    setLoading(true);

    try {
      const responseJson = await asyncFetchComics();
      const results = responseJson.data.results;

      let imagePath = '';

      if (results) {
        const newArrayOfComics = results.map((comic) => {
          const { title, images, description, id } = comic;

          if (images.length < 1) {
            imagePath = '';
          }
          if (images.length > 0) {
            images.map((image) => {
              if (image) {
                const { path } = image;
                imagePath = path;
              }
            });
          }

          return {
            _id: id,
            _comicName: title,
            _images: images,
            _path: imagePath,
            _description: description,
          };
        });

        setComicsBySearch(newArrayOfComics);
      } else {
        setComicsBySearch([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  });

  const asyncFetchComics = async () => {
    try {
      const myfetchReq = await fetch(
        `${comicUrl}${apikey}&titleStartsWith=${searchTerm}`
      );
      const theBigReq = await myfetchReq.json();
      return theBigReq;
    } catch (error) {
      console.log(`error: ${error.message}`);
    }
  };

  // USE-EFFECT
  useEffect(() => {
    if (selectedCategory === 'character') {
      fetchCharacters();
    }
    if (selectedCategory === 'creator') {
      fetchCreators();
    }
    if (selectedCategory === 'comic') {
      fetchComics();
    }
  }, [searchTerm]);

  // RETURNS
  return (
    <AppContext.Provider
      value={{
        loading,
        characters,
        creators,
        comics,
        charName,
        creatorId,
        selectedCategory,
        creatorName,
        comicsBySearch,
        setSearchTerm,
        setCharName,
        setCreatorId,
        setCreatorName,
        setComicsBySearch,
        setSelectedCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
