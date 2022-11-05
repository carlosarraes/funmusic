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
          <div data-testid="page-search" className='self-center'>
            <form className="input-group relative flex flex-wrap items-stretch w-96 mt-6">
                <input
                  type="search"
                  name="search"
                  id="search"
                  data-testid="search-artist-input"
                  value={ search }
                  onChange={ handleChange }
                  className="form-control relative min-w-0 w-full px-3 text-gray-700 bg-white bg-clip-padding border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                  placeholder="Pesquisar" 
                  aria-label="Pesquisar" 
                  aria-describedby="button-addon2"
                  />
                <button
                  className="btn cursor-pointer absolute px-6 py-3 border border-gray-600 right-0 bg-gray-600 text-white font-medium text-base leading-tight uppercase rounded-r shadow-md hover:bg-gray-800 hover:shadow-lg focus:bg-gray-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" 
                  type="submit" 
                  id="button-addon2"
                  onClick={ handleSearch }
                  disabled={ searchButton }
                  >
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                  </svg>
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
