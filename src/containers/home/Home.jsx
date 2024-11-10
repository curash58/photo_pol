import React from 'react';
import {MainPhoto, SectionAbout, SectionPortfolio, MainCategories, SectionLink, SectionPrice} from '../../components';

const Home = () => {
  return (
    <>
      <MainPhoto />
      <SectionAbout />
      <SectionPortfolio />
      <SectionPrice />
      <MainCategories />
      <SectionLink />
    </>
  );
}

export default Home;
