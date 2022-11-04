import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';

class Search extends Component {
  render() {
    const {
      search,
      searchButton,
      handleChange,
      handleSearch,
      searchLoading,
    } = this.props;

    return (
      searchLoading ? <Loading />
        : (
          <div data-testid="page-search">
            <form>
              <input
                type="text"
                name="search"
                id="search"
                data-testid="search-artist-input"
                value={ search }
                onChange={ handleChange }
              />
              <button
                type="submit"
                data-testid="search-artist-button"
                onClick={ handleSearch }
                disabled={ searchButton }
              >
                Pesquisar
              </button>
            </form>
          </div>
        )
    );
  }
}

Search.propTypes = {
  search: PropTypes.string.isRequired,
  searchButton: PropTypes.bool.isRequired,
  searchLoading: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default Search;
