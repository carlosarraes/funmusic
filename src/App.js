import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Loading from './components/Loading';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import { createUser } from './services/userAPI';
import searchAlbumsAPI from './services/searchAlbumsAPI';
import Albums from './pages/Albums';

const MIN_LENGTH = 3;

class App extends Component {
  state = {
    name: '',
    search: '',
    searched: '',
    loading: false,
    redirect: false,
    buttonControl: true,
    searchButton: true,
    searchLoading: false,
    gotAlbums: false,
    albums: [],
  };

  validateForm = (input, str) => {
    if (input === 'name') {
      if (str.length >= MIN_LENGTH) this.setState({ buttonControl: false });
      else this.setState({ buttonControl: true });
    }

    if (input === 'search') {
      if (str.length >= MIN_LENGTH - 1) this.setState({ searchButton: false });
      else this.setState({ searchButton: true });
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => (
      { ...prevState, [name]: value }), this.validateForm(name, value));
  };

  handleClick = async (e) => {
    const { name } = this.state;
    e.preventDefault();
    this.setState({ loading: true });
    const response = await createUser({ name });
    if (response === 'OK') this.setState({ redirect: true });
  };

  handleSearch = async (e) => {
    e.preventDefault();
    this.setState({ searchLoading: true, });
    const { search } = this.state;
    const data = await searchAlbumsAPI(search);
    this.setState({
      searchLoading: false,
      gotAlbums: true,
      albums: data,
      searched: search,
      search: '',
    });
  };

  render() {
    const { name,
      search,
      buttonControl,
      searchButton,
      loading,
      redirect,
      searchLoading,
      gotAlbums,
      searched,
      albums } = this.state;

    return (
      <>
        <Switch>
          <Route path="/profile/edit">
            <section className='points flex flex-col'>
              <Header />
              <ProfileEdit />            
            </section>
          </Route>
          <Route path="/profile">
            <section className='points flex flex-col'>
              <Header />
              <Profile />
            </section>
          </Route>
          <Route
            path="/album/:id"
            render={ (props) => (
              <section className='points flex flex-col'>
                <Header />
                <Album { ...props } />
              </section>
            ) }
          />
          <Route path="/search">
            <section className='points flex flex-col'>
              <Header />
              <Search
                search={ search }
                handleSearch={ this.handleSearch }
                handleChange={ this.handleChange }
                searchButton={ searchButton }
                searchLoading={ searchLoading }
              />
              { gotAlbums && <Albums albums={ albums } searched={ searched } /> }
            </section>
          </Route>
          <Route path="/favorites">
            <section className='points flex flex-col'>
              <Header />
              <Favorites />            
            </section>
          </Route>
          <Route
            exact
            path="/"
          >
            {loading ? <Loading /> : <Login
              handleChange={ this.handleChange }
              handleClick={ this.handleClick }
              name={ name }
              buttonControl={ buttonControl }
            />}
            {redirect && <Redirect to="/search" />}
          </Route>
          <Route path="*" component={ NotFound } />
        </Switch>
      </>
    );
  }
}

export default App;
