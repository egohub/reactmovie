import React from "react";
import { Link } from "react-router-dom";
import "./MovieThumb.css";
import PropTypes from "prop-types";

const MovieThumb = props => {
  return (
    <div className="rmdb-moviethumb">
      {props.clickable ? (
        <Link
          to={{
            pathname: `/${props.movieId}`,
            movieName: `${props.movieName}`
          }}
        >
          <img src={props.image} alt="Movie Thumb" />
        </Link>
      ) : (
        <img src={props.image} alt="Movie Thumb" />
      )}
    </div>
  );
};

MovieThumb.propTypes = {
  image: PropTypes.string,
  movieID: PropTypes.string,
  movieName: PropTypes.string
};

export default MovieThumb;
