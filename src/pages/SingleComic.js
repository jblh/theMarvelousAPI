import React from 'react';
import Comic from '../components/Comic';
import { useGlobalContext } from '../context';

const SingleComic = () => {
  const { comicsBySearch } = useGlobalContext();

  if (comicsBySearch) {
    const { _comicName } = comicsBySearch;

    return (
      <div>
        <section className='section marvel-section'>
          <h2 className='section-title'>{_comicName}</h2>
        </section>

        <section className='section'>
          <h2 className='section-title'>comics</h2>
          <div className='marvel-center'>
            {comicsBySearch.map((item, index) => {
              item._index = index;
              return <Comic key={item._index} {...item} />;
            })}
          </div>
        </section>
      </div>
    );
  } else {
    return <p>no comics</p>;
  }
};

export default SingleComic;
