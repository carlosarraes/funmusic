import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    user: '',
    img: '',
    loading: true,
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user: user.name, img: user.image, loading: false });
  }

  render() {
    const { loading, user, img } = this.state;
    return (
      loading
        ? <Loading />
        : (
          <nav data-testid="header-component" className="bg-white border-gray-200 shadow px-2 sm:px-4 py-2.5 rounded-b dark:text-white dark:bg-gray-700">
            <div className="container flex flex-wrap flex-col gap-4 sm:flex-row sm:gap-0  justify-between items-center mx-auto">
              <h1 className='font-bold text-xl self-center'>FunMusic</h1>
              <div className='flex flex-col gap-2 sm:gap-16 sm:flex-row justify-between items-center'>
                <Link to="/search" data-testid="link-to-search" className="hover:underline">Pesquisar</Link>
                <Link to="/favorites" data-testid="link-to-favorites" className="hover:underline">Favoritos</Link>
                <Link to="/profile" data-testid="link-to-profile" className="hover:underline">Perfil</Link>
              </div>
              <div className='flex justify-between gap-4'>
                <h2 data-testid="header-user-name" className='self-center hidden sm:block'>{ user }</h2>
                {img && <img src={img} alt={user} className="w-8 h-8 rounded-full self-center ring-2 ring-green-500" />}
              </div>
            </div>
          </nav>
        )
    );
  }
}

export default Header;
