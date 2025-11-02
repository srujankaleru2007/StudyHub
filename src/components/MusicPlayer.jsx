import React, { useState, useEffect, useRef } from 'react'
import './MusicPlayer.css'

const MusicPlayer = ({ autoPlay, onPlay, onPause, isBreak }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const [loop, setLoop] = useState(true)
  const [shuffle, setShuffle] = useState(false)
  const [mood, setMood] = useState('focused')
  const [frequency, setFrequency] = useState('40')
  const [player, setPlayer] = useState(null)
  const playerRef = useRef(null)
  const [playerReady, setPlayerReady] = useState(false)

  // Binaural beats frequency mapping to YouTube search queries
  const binauralFrequencies = [
    { value: '6', label: '6 Hz - Deep Meditation', query: '6hz binaural beats deep meditation' },
    { value: '8', label: '8 Hz - Theta Waves (Relaxation)', query: '8hz binaural beats theta waves' },
    { value: '12', label: '12 Hz - Alpha Waves (Light Meditation)', query: '12hz binaural beats alpha waves' },
    { value: '20', label: '20 Hz - Beta Waves (Focus)', query: '20hz binaural beats focus study' },
    { value: '40', label: '40 Hz - Gamma Waves (Deep Focus)', query: '40hz binaural beats gamma waves focus' }
  ]

  // Popular binaural beats video IDs
  // Replace these with actual YouTube video IDs for binaural beats
  // You can find them by searching on YouTube and copying the video ID from the URL
  const frequencyVideoMap = {
    '6': 'jgpJVI3tDbY', // 6Hz - Replace with actual video ID
    '8': 'jgpJVI3tDbY', // 8Hz - Replace with actual video ID  
    '12': 'jgpJVI3tDbY', // 12Hz - Replace with actual video ID
    '20': 'jgpJVI3tDbY', // 20Hz - Replace with actual video ID
    '40': 'jgpJVI3tDbY' // 40Hz - Replace with actual video ID
  }

  // Mood-based frequency selection
  const moodFrequencies = {
    focused: ['40', '20', '12'],
    relaxed: ['8', '6'],
    energetic: ['20', '40'],
    calm: ['6', '8', '12']
  }

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

      window.onYouTubeIframeAPIReady = () => {
        if (playerRef.current) {
          initializePlayer()
        }
      }
    } else if (window.YT && window.YT.Player) {
      // API already loaded
      if (playerRef.current) {
        initializePlayer()
      }
    }

    return () => {
      if (player) {
        try {
          player.destroy()
        } catch (e) {
          // Ignore errors during cleanup
        }
      }
    }
  }, [])

  const initializePlayer = () => {
    if (playerRef.current && !player && window.YT && window.YT.Player) {
      const ytPlayer = new window.YT.Player(playerRef.current, {
        height: '0',
        width: '0',
        videoId: frequencyVideoMap[frequency] || frequencyVideoMap['40'],
        playerVars: {
          autoplay: 0,
          loop: loop ? 1 : 0,
          playlist: loop ? (frequencyVideoMap[frequency] || frequencyVideoMap['40']) : undefined,
          controls: 0,
          modestbranding: 1,
          rel: 0
        },
        events: {
          onReady: (event) => {
            setPlayer(event.target)
            setPlayerReady(true)
            event.target.setVolume(volume)
            if (autoPlay) {
              event.target.playVideo()
              setIsPlaying(true)
              onPlay?.()
            }
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true)
              onPlay?.()
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false)
              onPause?.()
            }
          }
        }
      })
    }
  }

  useEffect(() => {
    if (player && playerReady) {
      const videoId = frequencyVideoMap[frequency] || frequencyVideoMap['40']
      player.loadVideoById({
        videoId: videoId,
        startSeconds: 0
      })
      player.setLoop(loop)
    }
  }, [frequency])

  useEffect(() => {
    if (player && playerReady) {
      player.setLoop(loop)
    }
  }, [loop])

  useEffect(() => {
    if (player && playerReady) {
      player.setVolume(volume)
    }
  }, [volume])

  useEffect(() => {
    if (autoPlay && player && playerReady && !isPlaying) {
      player.playVideo()
      setIsPlaying(true)
      onPlay?.()
    }
    if (!autoPlay && player && playerReady && isPlaying) {
      player.pauseVideo()
      setIsPlaying(false)
      onPause?.()
    }
  }, [autoPlay])

  useEffect(() => {
    // When break starts, switch to relaxing frequencies
    if (isBreak && !moodFrequencies.relaxed.includes(frequency)) {
      setFrequency('8')
      setMood('relaxed')
    }
  }, [isBreak])

  // Update frequency based on mood
  useEffect(() => {
    if (!isBreak) {
      const frequencies = moodFrequencies[mood] || moodFrequencies.focused
      if (!frequencies.includes(frequency)) {
        setFrequency(frequencies[0])
      }
    }
  }, [mood])

  const handlePlayPause = () => {
    if (!player || !playerReady) return

    if (isPlaying) {
      player.pauseVideo()
      setIsPlaying(false)
      onPause?.()
    } else {
      player.playVideo()
      setIsPlaying(true)
      onPlay?.()
    }
  }

  const handleFrequencyChange = (newFreq) => {
    setFrequency(newFreq)
    if (player && playerReady && isPlaying) {
      const videoId = frequencyVideoMap[newFreq] || frequencyVideoMap['40']
      player.loadVideoById({
        videoId: videoId,
        startSeconds: 0
      })
    }
  }

  const openYouTubeSearch = (query) => {
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, '_blank')
  }

  return (
    <div className="music-player">
      <div className="music-header">
        <h3>🎵 Binaural Beats Player</h3>
        <div className="mood-selector">
          <label>Mood:</label>
          <select
            value={mood}
            onChange={(e) => {
              if (!isBreak) {
                setMood(e.target.value)
              }
            }}
            disabled={isBreak}
          >
            <option value="focused">🎯 Focused</option>
            <option value="relaxed">🌊 Relaxed</option>
            <option value="energetic">⚡ Energetic</option>
            <option value="calm">🧘 Calm</option>
          </select>
        </div>
      </div>

      {/* Hidden YouTube player */}
      <div ref={playerRef} style={{ display: 'none' }}></div>

      <div className="frequency-selector">
        <label>Binaural Beat Frequency:</label>
        <div className="frequency-grid">
          {binauralFrequencies.map(freq => (
            <button
              key={freq.value}
              className={`frequency-btn ${frequency === freq.value ? 'active' : ''}`}
              onClick={() => handleFrequencyChange(freq.value)}
              title={freq.label}
            >
              <span className="freq-value">{freq.value} Hz</span>
              <span className="freq-description">{freq.label.split(' - ')[1]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="current-track">
        <div className="track-info">
          <span className="track-name">
            {binauralFrequencies.find(f => f.value === frequency)?.label || '40 Hz - Gamma Waves'}
          </span>
          <button
            className="youtube-search-btn"
            onClick={() => openYouTubeSearch(binauralFrequencies.find(f => f.value === frequency)?.query || 'binaural beats')}
            title="Search on YouTube"
          >
            🔍 Search on YouTube
          </button>
        </div>
      </div>

      <div className="music-controls">
        <button onClick={handlePlayPause} className="control-btn play-btn" disabled={!playerReady}>
          {isPlaying ? '⏸' : '▶'}
        </button>
      </div>

      <div className="music-settings">
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={loop}
              onChange={(e) => setLoop(e.target.checked)}
            />
            <span>Loop</span>
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={shuffle}
              onChange={(e) => setShuffle(e.target.checked)}
              disabled
              title="Coming soon"
            />
            <span>Shuffle</span>
          </label>
        </div>
      </div>

      <div className="volume-control">
        <label>Volume</label>
        <div className="volume-slider">
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="slider"
          />
          <span className="volume-value">{volume}%</span>
        </div>
      </div>

      <div className="player-status">
        {!playerReady && (
          <div className="status-message">
            ⏳ Loading YouTube player...
          </div>
        )}
        {playerReady && (
          <div className="status-message success">
            ✅ Player ready
          </div>
        )}
      </div>

      <div className="youtube-note">
        <p>💡 <strong>Note:</strong> To use custom binaural beats videos, update the video IDs in the code. 
        Use the "Search on YouTube" button to find videos and copy their IDs from the URL.</p>
      </div>
    </div>
  )
}

export default MusicPlayer
