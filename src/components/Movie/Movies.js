import React, { Component } from "react";
import { API_URL, API_KEY } from "../../config";
import Navigation from "../elements/Navigation/Navigation";
import MovieInfo from "../elements/MovieInfo/MovieInfo";
import MovieInfoBar from "../elements/MovieInfoBar/MovieInfoBar";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import Actor from "../elements/Actor/Actor";
import Spinner from "../elements/Spinner/Spinner";
import "./Movie.css";

class Movie extends Component {
  state = {
    movie: null,
    actors: null,
    download: null,
    downloads: [],
    directors: [],
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true });
    //first fetch movie...
    const endpoint = `https://mmsubmovie.herokuapp.com/movie/${
      this.props.match.params.movieId
    }`;
    this.fetchItems(endpoint);
  }

  fetchItems = endpoint => {
    fetch(endpoint)
      .then(result => result.json())
      .then(result => {
        if (result.status_code) {
          this.setState({ loading: false });
        } else {
          this.setState({ movie: result }, () => {
            //...then fetch actors in the setState callback function
            const endpoint = `https://mmsubmovie.herokuapp.com/movie/${
              this.props.match.params.movieId
            }`;
            fetch(endpoint)
              .then(result => result.json())
              .then(result => {
                // const downloads = result.download
                const directors = result.director;
                this.setState({
                  actors: result.actors,
                  downloads: result.download,
                  directors,
                  loading: false
                });
              });
          });
        }
      })
      .catch(error => console.error("Error", error));
  };

  render() {
    return (
      <div className="rmdb-movie">
        {this.state.movie ? (
          <div>
            <Navigation movie={this.props.location.movieName} />
            {/* <MovieInfo
              movie={this.state.movie}
              directors={this.state.directors}
            /> */}
            {/* <MovieInfoBar
              time={this.state.movie.runtime}
              budget={this.state.movie.budget}
              revenue={this.state.movie.revenue}
            /> */}
            {this.state.downloads.map((ele, i) => {
              return (
                <p key={i}>
                  {" "}
                  {ele.site} | {ele.size}
                </p>
              );
            })}
          </div>
        ) : null}
        {this.state.actors ? (
          <div className="rmdb-movie-grid">
            <FourColGrid header={"Actors"}>
              {this.state.actors.map((element, i) => {
                return <Actor key={i} actor={element} />;
              })}
            </FourColGrid>
          </div>
        ) : null}
        {!this.state.actors && !this.state.loading ? (
          <h1>No Movie Found</h1>
        ) : null}
        {this.state.loading ? <Spinner /> : null}
      </div>
    );
  }
}

export default Movie;
