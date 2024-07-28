import React from 'react';
import Popup from 'reactjs-popup';
import ReactPlayer from 'react-player';
import { IoIosCloseCircle } from "react-icons/io";
import './index.css';

const MovieItem = (props) => {
  const { movie } = props;
  const { movie_name, movie_imgurl, link } = movie;
console.log(link)
  return (
    <Popup
      modal
      trigger={(
        <li className='movie-container'>
          <img src={movie_imgurl} className="movie-img" alt="Movie Poster" />
          <h1 className='movie-name'>{movie_name}</h1>
        </li>
      )}
       className="popup-content"
    >
        
      {close => 
      
      (
        <div className='popup-container'>
            <button  className='close-btn' onClick={()=>close()} ><IoIosCloseCircle className='close-icon' /></button>
          <ReactPlayer url={link} />

        </div>
      )}
    </Popup>
  );
};

export default MovieItem;
