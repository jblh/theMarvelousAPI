import React, { useState } from 'react';
import Loading from '../components/Loading';
import Comic from '../components/Comic';
import { useParams, Link } from 'react-router-dom';
import { useGlobalContext } from '../context';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const charUrl = `https://gateway.marvel.com/v1/public/characters?apikey=`;
const comicUrl = `https://gateway.marvel.com/v1/public/comics?apikey=`;
const apikey = process.env.REACT_APP_MARVEL_API_KEY;

const fetchIdOfChar = async (theName) => {
  const theFetchUrl = `${charUrl}${apikey}&name=${theName}`;

  try {
    const responseJson = await asyncFetchIdOfChar(theFetchUrl);

    const {
      data: { results },
    } = responseJson;

    if (results) {
      return results[0].id;
      // const NewArrayOfCharacters = results.map((character) => {
      //   const { id } = character;

      //   return {
      //     _id: id,
      //   };
      // });
      // setCharacters(NewArrayOfCharacters);
      // console.log(`Have fetched characters: ${characters}`);
    } else {
      // setCharacters([]);
    }
    // setLoading(false);
  } catch (error) {
    console.log(error);
    // setLoading(false);
  }
};

const asyncFetchIdOfChar = async (theFUrl) => {
  try {
    const myfetchReq = await fetch(theFUrl);
    const theBigReq = await myfetchReq.json();
    return theBigReq;
  } catch (error) {
    console.log(`error: ${error.message}`);
  }
};

const SingleCharNew = () => {
  const { charName } = useGlobalContext();
  let theId = 0;

  // initial fetch.
  // const { characters } = useGlobalContext();
  // const { id } = useParams();

  // This info is from the initial fetch:
  // const myCharacter = characters[0];
  // const myCharacter = characters[id];
  // const { _name, _thumbnail, _description, _comics, _id } = myCharacter;
  // Stories: { items: {name, resourceURI}}
  // const { items } = _comics;
  // Name
  // const name = _name;
  // Path for character thumbnail
  // use the big image with fullPath:
  // const { path } = _thumbnail;
  // const fullPath = `${path}/portrait_xlarge.jpg`;
  //
  const [loading, setLoading] = React.useState(false);
  const [comicsList, setComicsList] = useState([]);

  // FETCH COMICS
  React.useEffect(() => {
    setLoading(true);

    async function getId() {
      theId = await fetchIdOfChar(charName);

      if (theId != 0) {
        getComics();
      }
    }

    getId();
    // if (theId !== 0) {
    //   getComics();
    // }
  }, [charName]);

  async function getComics() {
    try {
      const responseJson = await asyncFetch();
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

        setComicsList(newArrayOfComics);
      } else {
        setComicsList([]);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const asyncFetch = async () => {
    try {
      const myfetchReq = await fetch(
        `${comicUrl}${apikey}&characters=${theId}`
      );

      const theBigReq = await myfetchReq.json();
      return theBigReq;
    } catch (error) {
      console.log(`error: ${error.message}`);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <section className='section marvel-section'>
        <Button variant='contained'>
          <Link to='/'>search</Link>
        </Button>
        <h2 className='section-title'>{charName}</h2>
      </section>

      <section className='section'>
        <h2 className='section-title'>comics</h2>
        <div className='marvel-center'>
          {comicsList.map((item, index) => {
            item._index = index;
            return <Comic key={item._index} {...item} />;
          })}
        </div>
      </section>
    </div>
  );
};

export default SingleCharNew;
