import React, { useState } from 'react';
import Loading from '../components/Loading';
import Comic from '../components/Comic';
import { useParams, Link } from 'react-router-dom';
import { useGlobalContext } from '../context';
import Button from '@mui/material/Button';

const comicUrl = `https://gateway.marvel.com/v1/public/comics?apikey=`;
const apikey = process.env.REACT_APP_MARVEL_API_KEY;

const SingleCreator = () => {
  const { creators } = useGlobalContext();

  const { id } = useParams();
  //
  // This info is from the initial fetch:
  const myCreator = creators[id];
  const { _fullName, _id } = myCreator;
  const name = _fullName;

  const [loading, setLoading] = React.useState(false);
  const [comicsList, setComicsList] = useState([]);

  // FETCH COMICS

  React.useEffect(() => {
    setLoading(true);

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
    getComics();
  }, []);

  const asyncFetch = async () => {
    try {
      const myfetchReq = await fetch(`${comicUrl}${apikey}&creators=${_id}`);

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
        <h2 className='section-title'>{name}</h2>
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

export default SingleCreator;
