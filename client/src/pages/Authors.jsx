import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Loader from "../components/Loader";
import BackButton from "../components/BackButton";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAuthors = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users`);
        setAuthors(response.data);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    getAuthors();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
     <section className="authors">
      {authors.length > 0 ? (
        <div className="container authors__container">
          {authors.map(({ _id: id, avatar, name, posts }) => (
            <Link key={id} to={`/posts/users/${id}`} className="author">
              <div className="post__author-avatar">
                <img
                  src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${avatar}`}
                  alt={`Image of ${name}`}
                />
              </div>
              <div className="author__info">
                <span>{name}</span>
                {/* <p>{posts}</p> */}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h2 className="center">No users found</h2>
      )}
    
    </section>
    <BackButton />
    </>
   
     
  );
};

export default Authors;