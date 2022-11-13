import React, { Component } from "react"
import PropTypes from "prop-types"
import Loading from "./Loading"
import { addSong, getFavoriteSongs, removeSong } from "../services/favoriteSongsAPI"

class MusicCard extends Component {
  state = {
    loading: false,
    favorite: false
  }

  async componentDidMount() {
    const { trackId } = this.props
    const data = await getFavoriteSongs()
    const favoriteIds = new Set(data.map((music) => music.trackId))
    const unique = [...favoriteIds]
    if (unique.includes(trackId)) this.setState({ favorite: true })
  }

  handleFavorite = async (e) => {
    const { name, checked, id } = e.target
    const { music, getTrackId } = this.props
    getTrackId(id)
    this.setState({ loading: true, [name]: checked })
    let result = ""
    if (checked) {
      result = await addSong(music)
    } else {
      result = await removeSong(music)
    }
    if (result) {
      this.setState({ loading: false, [name]: checked })
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props
    const { loading, favorite } = this.state
    return loading ? (
      <Loading />
    ) : (
      <div className="flex flex-col border shadow-md p-4 justify-center items-center">
        <span className="font-bold justify-right">{trackName}</span>
        <div className="flex gap-3">
          <audio
            data-testid="audio-component"
            src={previewUrl}
            controls
          >
            <track kind="captions" />O seu navegador não suporta o elemento audio.
          </audio>
          <label
            htmlFor={trackId}
            data-testid={`checkbox-music-${trackId}`}
            className="self-center"
          >
            <input
              type="checkbox"
              name="favorite"
              id={trackId}
              checked={favorite}
              onChange={this.handleFavorite}
            />
            Favorita
          </label>
        </div>
      </div>
    )
  }
}

MusicCard.defaultProps = {
  music: {},
  trackId: 0
}

MusicCard.propTypes = {
  music: PropTypes.shape({}),
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number,
  previewUrl: PropTypes.string.isRequired,
  getTrackId: PropTypes.func.isRequired
}

export default MusicCard
