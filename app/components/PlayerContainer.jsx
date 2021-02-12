import React from 'react'
import Player from './Player'
import SongList from './SongList'
import playlist from '../playlist.js'
import AUDIO from '../audio'

// Player Container
export default class PlayerContainer extends React.Component {
  state = {
    currentSong: { ...playlist[0], index: 0 },
    isPlaying: false,
    shuffle: false
  }

  componentDidMount() {
    AUDIO.addEventListener('ended', () => this.setNextSong())
  }

  componentWillUnmount() {
    AUDIO.removeEventListener('ended', () => this.setState({ isPlaying: false }));  
  }

  play = () => {
    AUDIO.play()
    this.setState({ isPlaying: true })
  }

  pause = () => {
    // TODO: make pause resume at expected time
    AUDIO.pause()
    this.setState({ isPlaying: false })
  }

  load = (currentSong) => {
    AUDIO.src = currentSong.url
    AUDIO.load()
    this.setState({
      currentSong
    })
  }

  startSong = (song) => {
    this.pause()
    this.load(song)
    this.play()
  }

  playOrPauseSong = () => {
    const { currentSong, isPlaying } = this.state;
    if (isPlaying) {
      this.pause()
    } else {
      this.startSong(currentSong)
    }
  }

  setCurrentSong = (currentSong) => {
    this.startSong(currentSong)
  }

  setNextSong = () => {
    const { currentSong, shuffle } = this.state
    
    let updatedSongIndex
    if (shuffle) {
      // TODO: make sure shuffling doesn't repeat songs that already played
      updatedSongIndex = Math.floor(Math.random()*(0, playlist.length))
    }
    else {
      const nextSongIndex = currentSong.index + 1
      updatedSongIndex = nextSongIndex >= playlist.length ? 0 : nextSongIndex
    }

    const newSong = { ...playlist[updatedSongIndex], index: updatedSongIndex }
    this.setCurrentSong(newSong)
  }

  setPrevSong = () => {
    const { currentSong, shuffle } = this.state
    
    let updatedSongIndex
    if (shuffle) {
      // TODO: go to previous song based on random order
      updatedSongIndex = Math.floor(Math.random()*(0, playlist.length))
    }
    else {
      const prevSongIndex = currentSong.index - 1
      const lastSong = playlist.length - 1
      updatedSongIndex = prevSongIndex < 0 ? lastSong : prevSongIndex
    }

    const newSong = { ...playlist[updatedSongIndex], index: updatedSongIndex }
    this.setCurrentSong(newSong)
  }

  toggleShuffle = () => {
    this.setState((prevState) => ({ shuffle: !prevState.shuffle }));
  }

  render() {
    const { currentSong, isPlaying, shuffle } = this.state

    const actions = {
      playOrPauseSong: this.playOrPauseSong,
      setCurrentSong: this.setCurrentSong,
      setNextSong: this.setNextSong,
      setPrevSong: this.setPrevSong,
      toggleShuffle: this.toggleShuffle
    }

    return (
      <div className="container">
        <Player
          actions={actions}
          currentSong={currentSong}
          isPlaying={isPlaying}
        />
        <SongList
          actions={actions}
          currentSong={currentSong}
          shuffle={shuffle}
        />
      </div>
    )
  }
}
