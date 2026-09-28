import "./Search.css";
import React from "react";

class Search extends React.Component {
  state = {
    search: "",
    type: "all",
    page: 1,
  };

  handleKey = (event) => {
    if (event.key === "Enter") {
      this.props.searchMovie(
        this.state.search,
        this.state.type,
        this.state.page,
      );
    }
  };

  handlerFilter = (event) => {
    this.setState({ type: event.target.dataset.type }, () =>
      this.props.searchMovie(
        this.state.search,
        this.state.type,
        this.state.page,
      ),
    );
  };

  prevPage = () => {
    this.setState(
       this.state.page >1 ? { page: this.state.page - 1 } : {page: 1},
        () =>
      this.props.searchMovie(
        this.state.search,
        this.state.type,
        this.state.page,
      ),
    );
  };

  nextPage = (page) => {
    this.setState( {page}, () => {
        this.props.searchMovie(
          this.state.search,
          this.state.type,
          this.state.page,        
        );
    },
)
  };


  numberPage = (el) => {
    this.setState(
        {page: Number(el.target.dataset.page)},
        () =>
      this.props.searchMovie(
        this.state.search,
        this.state.type,
        this.state.page,
      ),
    );
  };

  render() {
    let limit = 10;
    let totalPage = Math.ceil(this.props.totalCount / limit);
    const currentPage = Number(this.state.page) || 1;

    /* создадим переменную с количеством страниц */
    let visiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = startPage + visiblePages - 1;
    if(endPage > totalPage){
        endPage = totalPage;
        startPage = Math.max(1, endPage - visiblePages + 1);
    }

    let num = [];
    for(let i = startPage; i <= endPage; i++){
        num.push(i);
    }
    return (
      <>
        <div className="search">
          <input
            type="search"
            placeholder="Search"
            value={this.state.search}
            onChange={(event) => this.setState({ search: event.target.value })}
            onKeyDown={this.handleKey}
          />
          <button
            className="btn"
            onClick={() =>
              this.props.searchMovie(
                this.state.search,
                this.state.type,
                this.state.page,
              )
            }
          >
            Search
          </button>
        </div>
        <div className="radio">
          <label htmlFor="all">
            <input
              type="radio"
              name="type"
              id="all"
              data-type="all"
              checked={this.state.type === "all"}
              onChange={this.handlerFilter}
            />
            All
          </label>
          <label htmlFor="movie">
            <input
              type="radio"
              name="type"
              id="movie"
              data-type="movie"
              checked={this.state.type === "movie"}
              onChange={this.handlerFilter}
            />
            Movies only
          </label>
          <label htmlFor="series">
            <input
              type="radio"
              name="type"
              id="series"
              data-type="series"
              checked={this.state.type === "series"}
              onChange={this.handlerFilter}
            />
            Series only
          </label>
          <label htmlFor="game">
            <input
              type="radio"
              name="type"
              id="game"
              data-type="game"
              checked={this.state.type === "game"}
              onChange={this.handlerFilter}
            />
            Games only
          </label>
        </div>
        <div className="navigation">
          <button 
          className="btn" 
          onClick={this.prevPage} 
          style= {{opacity: Number(this.state.page) === 1 ? ".5" :"1"}}>
            Prev
          </button>

            <div className="items">
                {
                    num.map((el, index) => (
                        <button
                        className = "btn"
                        key = {index}
                        data-page = {el}
                        onClick = {(event) => this.numberPage(event)}
                        style = {{background: currentPage === el ? "#8f0d03" : "rgb(2, 122, 56)"}}>
                            {el}</button>
                    ))
                }
            </div>

          <button className="btn" onClick={this.nextPage}>
            Next
          </button>
        </div>
      </>
    );
  }
}

export default Search;
