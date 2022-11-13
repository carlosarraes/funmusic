import React, { Component } from "react"
import PropTypes from "prop-types"
import getMusics from "../services/musicsAPI"
import MusicCard from "../components/MusicCard"
import Loading from "../components/Loading"

class Album extends Component {
  state = {
    info: [],
    data: [],
    loading: true,
    done: false
  }

  async componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props
    this.fetchData(id)
  }

  componentDidUpdate() {
    const { done, loading } = this.state
    if (done && loading) {
      this.setState({ loading: false })
    }
  }

  fetchData = async (id) => {
    const response = await getMusics(id)
    const info = response[0]
    const data = response.slice(1)
    this.setState({ info, data, done: true })
  }

  getTrackId = (str) => {}

  render() {
    const {
      info: { artistName, collectionName, artworkUrl60 },
      data,
      loading
    } = this.state
    return loading ? (
      <Loading />
    ) : (
      <section
        data-testid="page-album"
        className="flex flex-col justify-center items-center w-full mt-6 gap-4 md:items-start md:gap-0 md:flex-row md:justify-between"
      >
        <div className="flex flex-col w-full md:w-1/2">
          <img
            src={artworkUrl60}
            alt={collectionName}
            className="w-48 h-48 self-center"
          />
          <p
            data-testid="artist-name"
            className="self-center mt-6"
          >
            <span className="font-bold">Artist:</span> {artistName}
          </p>
          <p
            data-testid="album-name"
            className="self-center mt-2"
          >
            <span className="font-bold">Collection:</span> {collectionName}
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full md:w-1/2 -mt-1">
          {data.map((music) => (
            <MusicCard
              key={music.trackId}
              trackId={music.trackId}
              trackName={music.trackName}
              previewUrl={music.previewUrl}
              music={music}
              getTrackId={this.getTrackId}
            />
          ))}
        </div>
      </section>
    )
  }
}

Album.defaultProps = {
  match: {}
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
}

export default Album
