import React from 'react';
import ResultsList from '../components/ResultsList';
import SearchForm from '../components/SearchForm';

const Home = () => {
  return (
    <main>
      <SearchForm />
      <ResultsList />
    </main>
  );
};

export default Home;
