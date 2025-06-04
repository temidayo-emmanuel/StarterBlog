import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';

const Tags = () => {
  const categories = [
    'Agriculture',
    'Business',
    'Investment',
    'Education',
    'Weather',
    'Art',
    'Entertainment',
    'Uncategorized',
    "Technology"
  ];

  return (
    <>
     <section className="categories">
      <ul className="tag__categories">
        {categories.map((category) => (
          <li key={category}>
            <Link to={`/posts/categories/${category}`}>#{category}</Link>
          </li>
        ))}
      </ul>
      <BackButton />
    </section>
  
    </>
  
   
  );
 
};


export default Tags;