import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Albums extends Component {
  state = {
    albums: [],
  };

  async componentDidMount() {
    const { albums } = await this.props;
    this.setState({ albums });
  }

  render() {
    const { albums } = this.state;
    const { searched } = this.props;
    return (
      <div>
        <h3>
          {`Resultado de álbuns de: ${searched}`}
        </h3>
        {albums.length === 0 ? (
          <span>Nenhum álbum foi encontrado</span>
        ) : (
          <div>
            {albums.map((album) => (
              <div
                key={ album.collectionId }
              >
                <h2>{ album.collectionName }</h2>
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  Link
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

Albums.propTypes = {
  searched: PropTypes.string.isRequired,
};

export default Albums;
