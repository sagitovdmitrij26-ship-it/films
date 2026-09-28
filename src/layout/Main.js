import React from "react";
import MovieList from "../components/MovieList";
import Preloader from "../components/Preloader";
import Search from "../components/Search";
import "../Main.css";

class Main extends React.Component {
  state = {
    movies: [],
    loading: true,
    count: 0,
  };

  /* воспользуемся методом componentDidMount чтобы при загрузке страницы получить данные из файла movies.json  */
  componentDidMount() {
    /* Воспользуемся fetch для получения данных */
    fetch("http://www.omdbapi.com/?apikey=7b280481&s=matrix")
      .then((response) =>
        response.json(),
      ) /* получаем с сервера объект response и преобразуем его в json  */
      .then((data) =>
        this.setState({
          movies: data.Search,
          loading: false,
          count: data.totalResults,
        }),
      ); /* получаем данные data  */
  }
  searchMovie = (str, type = "all", page) => {
    this.setState({ loading: true });
    /* Воспользуемся fetch для получения данных */
    fetch(
      `http://www.omdbapi.com/?apikey=7b280481&s=${str}${type !== "all" ? `&type=${type}` : ""}${`&page=${page}`}`,
    )
      .then((response) =>
        response.json(),
      ) /* получаем с сервера объект response и преобразуем его в json  */
      .then((data) =>
        this.setState({ movies: data.Search, loading: false, count: data.totalResults }),
      ); /* получаем данные data  */
  };
  render() {
    const { movies, loading, count } = this.state;
    return (
      <div className="main">
        <div className="wrap">
          <Search searchMovie={this.searchMovie} totalCount = {count} />
          {loading ? <Preloader /> : <MovieList movies={movies} />}
        </div>
      </div>
    );
  }
}

export default Main;
