import React from 'react';
import Header from './Header';
import Intro from './Intro';
import Footer from './Footer';
import HomepageContainer from './HomepageContainer';
import { ToastContainer } from 'react-toastify';

function LayoutHomepage ({ title, description, image, info, children,intro = true, toastcontainer = false }) {

  return(
    <div className="App">
        {toastcontainer && <ToastContainer />}
        <Header />
        {intro &&<Intro 
            title={title}
            description={description}
            image={image}
        />}
        {info && <HomepageContainer info={info} />}

        {children}
        <Footer />
    </div>
  );
};

export default LayoutHomepage;