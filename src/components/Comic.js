import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';
import Loading from '../components/Loading';
import { Card, CardMedia, Typography, Button } from '@mui/material';
import slugify from 'slugify';
import Modal from '@mui/material/Modal';

let theImagePath = '';

const Comic = ({ _comicName, _path, _id }) => {
  const fullPath = `${_path}/portrait_uncanny.jpg`;
  theImagePath = fullPath;

  const [show, setShow] = useState(false);

  return (
    <div>
      <Card mb={0}>
        <CardMedia>
          <div className='img-container'>
            <img src={fullPath} alt={_comicName} />
          </div>
        </CardMedia>
      </Card>
      <Button
        m={1}
        align='center'
        justifyContent='center'
        onClick={() => {
          setShow(!show);
        }}
      >
        <Typography>Details</Typography>
        {show}
      </Button>
      {show ? <SingleComic _id={_id} setShow={setShow} /> : <p></p>}
    </div>
  );
};

const SingleComic = ({ _id, setShow }) => {
  const url = `https://gateway.marvel.com/v1/public/comics/`;
  const id = _id;
  const apikey = process.env.REACT_APP_MARVEL_API_KEY;
  const comicUrl = `${url}${id}?apikey=${apikey}`;
  const [loading, setLoading] = React.useState(false);
  const [comic, setComic] = useState({});

  const { setCharName } = useGlobalContext();
  const { setCreatorId } = useGlobalContext();
  const { setCreatorName } = useGlobalContext();
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    setShow(false);
  };

  // FETCH COMIC
  React.useEffect(() => {
    console.log('useEffect');
    setLoading(true);

    async function getComic() {
      try {
        const responseJson = await asyncFetch();
        const comicProperties = responseJson.data.results;
        console.log('logging comicProperties');
        console.log(comicProperties);

        if (comicProperties) {
          // DECONSTRUCTING
          const {
            creators,
            description,
            id,
            images,
            isbn,
            pageCount,
            title,
            characters,
            urls,
          } = comicProperties[0];

          // COMIC OBJECT
          const newArrayOfProperties = {
            _creators: creators.items,
            _description: description,
            _id: id,
            _images: images,
            _isbn: isbn,
            _pageCount: pageCount,
            _title: title,
            _characters: characters.items,
            _urls: urls,
          };

          setComic(newArrayOfProperties);
        } else {
          setComic({});
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getComic();
  }, []);

  const asyncFetch = async () => {
    try {
      const myfetchReq = await fetch(comicUrl);
      const theBigReq = await myfetchReq.json();
      return theBigReq;
    } catch (error) {
      console.log(`error: ${error.message}`);
    }
  };

  if (loading) {
    return <Loading />;
  } else
    return (
      <Modal
        style={{
          position: 'fixed',
          top: '30%',
          margin: '0 auto',
          overflowY: 'auto',
        }}
        open={open}
        onClose={handleClose}
      >
        <Card
          style={{
            width: '100%',
            maxWidth: '490px',
            maxHeight: '90%',
            overflowY: 'auto',
            padding: '24px',
            margin: '0 auto',
          }}
        >
          <div justify-content='center'>
            <Typography variant='h5' style={{ marginBottom: '10px' }}>
              {comic._title}
            </Typography>

            {comic._description ? (
              <Typography
                variant='body2'
                style={{ marginTop: '10px', marginBottom: '10px' }}
              >
                {comic._description}
              </Typography>
            ) : null}
            {comic._pageCount ? (
              <Typography
                variant='body1'
                style={{ marginBottom: '10px', marginTop: '10px' }}
              >{`${comic._pageCount} pages`}</Typography>
            ) : null}
            <div style={{ marginBottom: '10px' }}>
              {comic._characters
                ? comic._characters.map((onecharacter, index) => {
                    const slugName = slugify(onecharacter.name);
                    return (
                      <Button
                        variant='contained'
                        color='secondary'
                        sx={{ m: 0.2, p: 0.9 }}
                        onClick={() => setCharName(onecharacter.name)}
                      >
                        <Link to={`/characters/${slugName}`}>
                          <Typography
                            variant='button'
                            style={{ color: 'black' }}
                          >
                            {onecharacter.name}
                          </Typography>
                        </Link>
                      </Button>
                    );
                  })
                : null}
            </div>
            {comic._creators
              ? comic._creators.map((onecreator, index) => {
                  const creatorText = `${onecreator.name} - ${onecreator.role}`;
                  const resourceURI = onecreator.resourceURI;
                  const arrayRURI = resourceURI.split('/');
                  const creatorID = arrayRURI[arrayRURI.length - 1];
                  const creatorIDText = `Creator ID: ${creatorID.toString()}`;
                  return (
                    <Button
                      variant='contained'
                      color='primary'
                      sx={{ m: 0.2, p: 0.9 }}
                      onClick={() => {
                        setCreatorId(creatorID);
                        setCreatorName(creatorText);
                      }}
                    >
                      <Link to={`/creators/${creatorID}`}>
                        <Typography variant='button' style={{ color: 'white' }}>
                          {creatorText}
                        </Typography>
                      </Link>
                    </Button>
                  );
                })
              : null}
            {comic._urls ? (
              <a href={comic._urls[0].url} target='_blank'>
                <Typography
                  variant='link'
                  color='primary'
                  sx={{
                    display: 'block',
                    marginTop: '14px',
                    marginBottom: '10px',
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                    '&:hover': {
                      textDecorationLine: 'underline',
                    },
                  }}
                >
                  Find out more at Marvel.com
                </Typography>
              </a>
            ) : null}
            <Typography variant='body2' color='primary'>
              Data provided by Marvel. © 2014 Marvel
            </Typography>
          </div>
        </Card>
      </Modal>
    );
};

export default Comic;
