import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    user: '',
    loading: true,
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user: user.name, loading: false });
  }

  render() {
    const { loading, user } = this.state;
    return (
      loading
        ? <Loading />
        : (
          <div data-testid="header-component">
            <h2 data-testid="header-user-name">{ user }</h2>
            <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          </div>
        )
    );
  }
}

export default Header;
