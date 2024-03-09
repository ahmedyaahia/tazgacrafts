import React, { useEffect, useState } from 'react';
//component 
import { Header } from './header';
import { Features } from './features';
import { About } from './about';
import { Services } from './services';
import { Gallery } from './gallery';
import { Contact } from './contact';

// jason file
import JsonData from "../data/data.json";


const Home = () => {
    const [landingPageData, setLandingPageData] = useState({});
    useEffect(() => {
      setLandingPageData(JsonData);
    }, []);
  return (
    <div>
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Gallery data={landingPageData.Gallery} />
      {/*<Testimonials data={landingPageData.Testimonials} />
     <Team data={landingPageData.Team} />*/}
      <Contact data={landingPageData.Contact} />
    </div>
  );
};

export default Home;
