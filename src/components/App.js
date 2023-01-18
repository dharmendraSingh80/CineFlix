import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import React from "react";
import { addMovies } from "../actions";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fav: false,
    };
  }

  componentDidMount() {
    const { store } = this.props;
    store.subscribe(() => {
      console.log("updated");
      this.forceUpdate();
    });
    //make api call
    //dispatch action
    store.dispatch(addMovies(data));
    console.log("state", this.props.store.getState());
  }

  isMovieFavourite = (movie) => {
    const { favourites } = this.props.store.getState();
    const index = favourites.indexOf(movie);
    if (index !== -1) {
      //found the movie
      return true;
    }
    return false;
  };

  handleFavourite = () => {
    this.setState({ fav: true });
  };
  handleMoviesList = () => {
    this.setState({ fav: false });
  };

  render() {
    const { list, favourites } = this.props.store.getState(); //{list:[], favourites:[]}
    console.log("RENDER", this.props.store.getState());
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className="tab" onClick={this.handleMoviesList}>
              Movies
            </div>
            <div className="tab" onClick={this.handleFavourite}>
              Favourites
            </div>
          </div>
          <div className="list">
            {!this.state.fav
              ? list.map((movie, index) => (
                  <MovieCard
                    movie={movie}
                    key={`movies-${index}`}
                    dispatch={this.props.store.dispatch}
                    isFavourite={this.isMovieFavourite(movie)}
                  />
                ))
              : favourites.map((movie, index) => (
                  <MovieCard
                    movie={movie}
                    key={`movies-${index}`}
                    dispatch={this.props.store.dispatch}
                    isFavourite={this.isMovieFavourite(movie)}
                  />
                ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
