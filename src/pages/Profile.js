import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    loading: true,
  };

  async componentDidMount() {
    const userData = await getUser();
    this.setState({
      name: userData.name,
      email: userData.email,
      image: userData.image,
      description: userData.description,
      loading: false,
    });
  }

  render() {
    const { name, email, image, loading, description } = this.state;
    return (loading ? <Loading />
      : (
        <div data-testid="page-profile">
          <div>
            <img src={ image } alt="" data-testid="profile-image" />
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
          <div>
            <h3>Nome</h3>
            <span>{name}</span>
            <h3>E-mail</h3>
            <span>{email}</span>
            <h3>Descrição</h3>
            <span>{description}</span>
          </div>
        </div>
      )
    );
  }
}

export default Profile;
