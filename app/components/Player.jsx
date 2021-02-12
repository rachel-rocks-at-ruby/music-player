import React from 'react'

const Player = (props) => {
  const { actions, currentSong, isPlaying } = props
  const { playOrPauseSong, setNextSong, setPrevSong } = actions

  return (
    <div className="player">
      <div className="songName">{currentSong ? currentSong.track : ''}</div>
      <div className="controls">
        <button className="button directionButton" onClick={setPrevSong}>
          Prev
        </button>
        <button
          className="button playButton"
          onClick={() => playOrPauseSong(currentSong.url, true)}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button className="button directionButton" onClick={setNextSong}>
          Next
        </button>
      </div>
    </div>
  )
}

export default Player
