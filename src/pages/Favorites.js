import React, { Component } from 'react';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    loading: true,
    data: [],
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const data = await getFavoriteSongs();
    this.setState({ data, loading: false });
  };

  getTrackId = async (str) => {
    const { data } = this.state;
    const found = data.find((music) => music.trackId === Number(str));
    this.setState({ loading: true });
    await removeSong(found);
    const newData = await getFavoriteSongs();
    this.setState({ data: newData, loading: false });
  };

  render() {
    const { loading, data } = this.state;
    return (loading ? <Loading />
      : (
        <div data-testid="page-favorites">
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

export default Favorites;
