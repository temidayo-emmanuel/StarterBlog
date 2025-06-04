import React from 'react';


const SkeletonLoader = () => {
  return (
    <div className="skeleton-loader">
      <div className="skeleton-post__left">
        <div className="skeleton-post__content">
          <div className="skeleton-loader__title"></div>
          <div className="skeleton-loader__description"></div>
        </div>

        <div className="skeleton-post__footer">
          <div className="skeleton-post-author"></div>
          <div className="skeleton-category"></div>
        </div>
      </div>

      <div className="skeleton-post__thumbnail">
        <div className="skeleton-loader__thumbnail"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;