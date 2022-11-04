import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    info: [],
    data: [],
    loading: true,
    done: false,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.fetchData(id);
  }

  componentDidUpdate() {
    const { done, loading } = this.state;
    if (done && loading) {
      this.setState({ loading: false });
    }
  }

  fetchData = async (id) => {
    const response = await getMusics(id);
    const info = response[0];
    const data = response.slice(1);
    this.setState({ info, data, done: true });
  };

  getTrackId = (str) => {
    console.log(str);
  };

  render() {
    const { info: { artistName, collectionName }, data, loading } = this.state;
    return (loading ? <Loading />
      : (
        <div data-testid="page-album">
          <p data-testid="artist-name">{`Artist Name: ${artistName}`}</p>
          <p data-testid="album-name">{`Collection Name: ${collectionName}`}</p>
          {data.map((music) => (
            <MusicCard
              key={ music.trackId }
              trackId={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              music={ music }
              getTrackId={ this.getTrackId }
            />
          ))}
        </div>
      )
    );
  }
}

Album.defaultProps = {
  match: {},
};

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default Album;
