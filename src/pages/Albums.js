import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

class Albums extends Component {
  state = {
    albums: []
  }

  async componentDidMount() {
    const { albums } = await this.props
    this.setState({ albums })
  }

  render() {
    const { albums } = this.state
    const { searched } = this.props
    return (
      <main>
        <h3 className="text-md my-2">{`Resultado de álbuns de ${searched}`}</h3>
        {albums.length === 0 ? (
          <span>Nenhum álbum foi encontrado</span>
        ) : (
          <div className="flex flex-wrap gap-2 justify-around">
            {albums.map((album) => (
              <div
                className="flex flex-col justify-between w-48 shadow bg-gray-100 rounded-sm p-2"
                key={album.collectionId}
              >
                <img
                  src={album.artworkUrl100}
                  alt={album.collectionName}
                  className="w-full"
                />
                <h2 className="text-center">{album.collectionName}</h2>
                <Link
                  to={`/album/${album.collectionId}`}
                  data-testid={`link-to-album-${album.collectionId}`}
                  className="font-xs ml-2 underline text-blue-700 hover:text-blue-900"
                >
                  Saiba mais
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    )
  }
}

Albums.propTypes = {
  searched: PropTypes.string.isRequired
}

export default Albums
