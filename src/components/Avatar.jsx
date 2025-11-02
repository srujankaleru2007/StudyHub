import React, { useState } from 'react'
import './Avatar.css'

const Avatar = ({ user, updateAvatar }) => {
  const [showCustomize, setShowCustomize] = useState(false)
  const classes = ['warrior', 'mage', 'rogue', 'healer']
  const colors = ['#4a90e2', '#9b59b6', '#e74c3c', '#2ecc71', '#f39c12', '#e67e22']

  return (
    <div className="avatar-container">
      <div className="avatar-card">
        <div className="avatar-display">
          <div 
            className="avatar-circle"
            style={{ 
              background: `linear-gradient(135deg, ${user.avatar.color}, ${user.avatar.color}dd)`,
              borderColor: user.avatar.color
            }}
          >
            <div className="avatar-level-badge">{user.level}</div>
            <div className="avatar-class-icon">
              {user.avatar.class === 'warrior' && '⚔️'}
              {user.avatar.class === 'mage' && '🔮'}
              {user.avatar.class === 'rogue' && '🗡️'}
              {user.avatar.class === 'healer' && '✨'}
            </div>
          </div>
          <div className="avatar-info">
            <h3>{user.avatar.name}</h3>
            <p className="avatar-class">{user.avatar.class}</p>
          </div>
        </div>
        
        <button 
          className="customize-btn"
          onClick={() => setShowCustomize(!showCustomize)}
        >
          {showCustomize ? 'Done' : 'Customize'}
        </button>

        {showCustomize && (
          <div className="customize-panel">
            <div className="customize-section">
              <label>Name</label>
              <input
                type="text"
                value={user.avatar.name}
                onChange={(e) => updateAvatar({ name: e.target.value })}
                maxLength={20}
              />
            </div>

            <div className="customize-section">
              <label>Class</label>
              <div className="class-selector">
                {classes.map(cls => (
                  <button
                    key={cls}
                    className={`class-btn ${user.avatar.class === cls ? 'active' : ''}`}
                    onClick={() => updateAvatar({ class: cls })}
                  >
                    {cls === 'warrior' && '⚔️'}
                    {cls === 'mage' && '🔮'}
                    {cls === 'rogue' && '🗡️'}
                    {cls === 'healer' && '✨'}
                    <span>{cls}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="customize-section">
              <label>Color</label>
              <div className="color-selector">
                {colors.map(color => (
                  <button
                    key={color}
                    className="color-btn"
                    style={{ 
                      background: color,
                      border: user.avatar.color === color ? '3px solid white' : 'none'
                    }}
                    onClick={() => updateAvatar({ color })}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Avatar

