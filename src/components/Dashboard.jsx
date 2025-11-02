import React from 'react'
import './Dashboard.css'

const Dashboard = ({ user, focusStreak, completedSessions, completedTasksToday }) => {
  const xpPercentage = (user.xp / user.xpToNext) * 100
  const hpPercentage = (user.hp / user.maxHp) * 100

  const achievements = []
  
  // Level achievements
  achievements.push({
    id: 'level-1',
    icon: '🏆',
    name: `Level ${user.level} Warrior`,
    unlocked: true
  })
  
  if (user.level >= 5) {
    achievements.push({
      id: 'veteran',
      icon: '⭐',
      name: 'Veteran',
      unlocked: true
    })
  }
  
  if (user.level >= 10) {
    achievements.push({
      id: 'master',
      icon: '👑',
      name: 'Master',
      unlocked: true
    })
  }

  // Streak achievements
  if (focusStreak >= 3) {
    achievements.push({
      id: 'streak-3',
      icon: '🔥',
      name: '3 Sessions in a Row',
      unlocked: true
    })
  }

  if (focusStreak >= 7) {
    achievements.push({
      id: 'streak-7',
      icon: '💪',
      name: 'Week Warrior',
      unlocked: true
    })
  }

  // Task achievements
  if (completedTasksToday >= 10) {
    achievements.push({
      id: 'tasks-10',
      icon: '🚀',
      name: '10 Tasks in One Day',
      unlocked: true
    })
  }

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <h3>Character Stats</h3>
        
        <div className="stat-item">
          <div className="stat-header">
            <span className="stat-label">Level</span>
            <span className="stat-value">{user.level}</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-header">
            <span className="stat-label">Experience</span>
            <span className="stat-value">{user.xp} / {user.xpToNext}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill xp-progress" 
              style={{ width: `${xpPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-header">
            <span className="stat-label">Health</span>
            <span className="stat-value">{user.hp} / {user.maxHp}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill hp-progress" 
              style={{ width: `${hpPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-header">
            <span className="stat-label">💰 Gold</span>
            <span className="stat-value">{user.gold}</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-header">
            <span className="stat-label">🔥 Focus Streak</span>
            <span className="stat-value">{focusStreak} days</span>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <h3>Achievements</h3>
        <div className="achievements">
          {achievements.length === 0 ? (
            <p className="no-achievements">Complete tasks to unlock achievements!</p>
          ) : (
            achievements.map(achievement => (
              <div key={achievement.id} className="achievement unlocked">
                <span className="achievement-icon">{achievement.icon}</span>
                <span>{achievement.name}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

