import React from 'react'
import './FocusMode.css'

const FocusMode = ({ 
  timer, 
  musicPlayer, 
  todayTasks, 
  onExit 
}) => {
  return (
    <div className="focus-mode">
      <div className="focus-backdrop"></div>
      <div className="focus-content">
        <button className="exit-focus-btn" onClick={onExit}>
          ✕ Exit Focus
        </button>
        
        <div className="focus-main">
          <div className="focus-timer-section">
            {timer}
          </div>
          
          <div className="focus-music-section">
            {musicPlayer}
          </div>
        </div>
        
        <div className="focus-tasks-section">
          <h4>Today's Tasks</h4>
          <div className="focus-tasks-list">
            {todayTasks.length === 0 ? (
              <p className="no-tasks">No tasks for today</p>
            ) : (
              todayTasks.map((task, index) => (
                <div key={index} className="focus-task-item">
                  <span className="focus-task-checkbox">
                    {task.completed ? '✓' : '○'}
                  </span>
                  <span className={task.completed ? 'completed' : ''}>
                    {task.text}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FocusMode

