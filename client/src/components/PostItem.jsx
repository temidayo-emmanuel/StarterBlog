import React from 'react'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
// import {format} from "date-fns"

const PostItem = ({postID, category, title, description, authorID, thumbnail, createdAt}) => {
    const shortDescription = description.length > 145 ? description.substr(0, 145) + '...' : description;
    const postTitle = title.length > 30 ? title.substr(0, 30) + '...' : title;

  return (
    <article className='post'>
            <div className='post__left'>
                <div className='post__content'>
                    <Link to={`/posts/${postID}`}>
                        <h4 dangerouslySetInnerHTML={{__html: postTitle}}></h4>
                    </Link>
                    <p dangerouslySetInnerHTML={{__html: shortDescription}}></p>
                </div>
               
                <div className='post__footer'>
                    <PostAuthor authorID={authorID} createdAt={createdAt} />
                    {/* <time className='post__time'>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time> */}
                    <Link to={`/posts/categories/${category}`} className='btn category'>#{category}</Link>
                </div>
            </div>     
           
            <div className='post__thumbnail'>
                <img src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${thumbnail}`} alt={title} />
            </div>
    </article>
  )
}

export default PostItem
