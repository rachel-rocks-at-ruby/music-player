import React from 'react'
import playlist from '../playlist.js'

const SongList = (props) => {
  const { actions, currentSong, shuffle } = props
  const { setCurrentSong, toggleShuffle } = actions

  return (
    <div className="playlist">
      <div className="playlistHeader">
        <div className="playlistTitle">Playlist</div>
        <div>
          <input type="checkbox" checked={shuffle} onChange={toggleShuffle} />{' '}
          Shuffle
        </div>
      </div>
      {playlist.map((song, index) => {
        const { album, artist, id, track } = song
        const activeSong = id === currentSong.id
        return (
          <div
            className={`${activeSong && 'activeSong'} song`}
            key={id}
            onClick={() => setCurrentSong({...song, index})}
          >
            <div className="track">{track}</div>
            <div className="songInfo">
              {artist} - {album}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SongList
