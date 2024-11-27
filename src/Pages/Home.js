import React, { useEffect } from 'react';
import Testimonials from '../Component/Testimonials';
import HeroAbout from '../Component/HeroAbout';
import Hero from '../Component/Hero';
import Popular from '../Component/Popular';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';

function Home() {
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (user) {
        console.log(user); 
    } else {
        console.log("User data is not available");
    }

    // Check cookie
    const authToken = Cookies.get('auth_token');
    if (authToken) {
        console.log(authToken);
    } else {
        console.log("Auth token is not found");
    }
}, [user]); 

  return (
    <div>
      <Hero />
      <HeroAbout />
      <Popular />
      <Testimonials />
    </div>
  );
}

export default Home;
