import React, { useState, useEffect } from 'react';
import heroImage from '../images/images.jpeg';
import Posts from '../components/Posts';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lastVisit = localStorage.getItem('lastVisit');
    const currentTime = new Date().getTime();

    if (lastVisit) {
      const minutesSinceLastVisit = (currentTime - lastVisit) / (1000 * 60); // Convert to minutes
      if (minutesSinceLastVisit < 10) {
        // If less than 10 minutes, skip the loader
        setIsLoading(false);
        return;
      }
    }

    // Show the loader and update the last visit time
    const timer = setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('lastVisit', currentTime);
    }, 4000); // Loader duration: 4 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <section className="hero__section">
        <div className="hero--container">
          <div className="hero--text">
            <h1>Starter - a Minimalist <br /> Personal Blog Website</h1>
            <p>Welcome to Starter – a space for sharing stories, ideas, and inspiration. Here, your words hold the power to spark change, ignite conversations, and shape perspectives. 
                Whether you’re here to write, read or discover new ideas, this is your platform to grow, connect, and make an impact.
                Your voice matters. Together, let’s build a community where creativity flourishes, ideas thrive, and stories inspire action.
                So, what’s your next chapter? Let’s write it together!</p>
          </div>
          <div className="hero--image">
            <img src={heroImage} alt="hero image" />
          </div>
          <small>Minimalism is the key of peaceful life</small>
        </div>
      </section>
      <Posts />
      <Footer />
    </>
  );
};

export default Home;