import React, { useState, useEffect, useRef } from 'react'
import './PomodoroTimer.css'

const PomodoroTimer = ({ onTimerStart, onTimerEnd, onBreakStart, autoStartMusic }) => {
  const [workDuration, setWorkDuration] = useState(25) // minutes
  const [breakDuration, setBreakDuration] = useState(5) // minutes
  const [timeLeft, setTimeLeft] = useState(workDuration * 60) // seconds
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [sessionCompleted, setSessionCompleted] = useState(false)
  const [completedSessions, setCompletedSessions] = useState(0)
  
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimerComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isRunning, timeLeft])

  const handleTimerComplete = () => {
    setIsRunning(false)
    setSessionCompleted(true)
    
    if (isBreak) {
      setCompletedSessions(prev => prev + 1)
      setIsBreak(false)
      setTimeLeft(workDuration * 60)
      if (onBreakStart) onBreakStart(false)
    } else {
      setIsBreak(true)
      setTimeLeft(breakDuration * 60)
      if (onTimerEnd) onTimerEnd()
      if (onBreakStart) onBreakStart(true)
    }
  }

  const startTimer = () => {
    setIsRunning(true)
    if (autoStartMusic && !isBreak) {
      onTimerStart?.()
    }
  }

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(isBreak ? breakDuration * 60 : workDuration * 60)
    setSessionCompleted(false)
  }

  const updateDuration = (type, value) => {
    const minutes = parseInt(value) || 1
    if (type === 'work') {
      setWorkDuration(minutes)
      if (!isBreak && !isRunning) {
        setTimeLeft(minutes * 60)
      }
    } else {
      setBreakDuration(minutes)
      if (isBreak && !isRunning) {
        setTimeLeft(minutes * 60)
      }
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = ((isBreak ? breakDuration : workDuration) * 60 - timeLeft) / ((isBreak ? breakDuration : workDuration) * 60) * 100

  return (
    <div className="pomodoro-timer">
      <div className="timer-header">
        <h3>🍅 Pomodoro Timer</h3>
        <div className="timer-type">
          {isBreak ? '☕ Break Time' : '⏱️ Focus Time'}
        </div>
      </div>

      <div className="timer-settings">
        <div className="duration-setting">
          <label>Work (min)</label>
          <input
            type="number"
            min="1"
            max="60"
            value={workDuration}
            onChange={(e) => updateDuration('work', e.target.value)}
            disabled={isRunning}
          />
        </div>
        <div className="duration-setting">
          <label>Break (min)</label>
          <input
            type="number"
            min="1"
            max="30"
            value={breakDuration}
            onChange={(e) => updateDuration('break', e.target.value)}
            disabled={isRunning}
          />
        </div>
      </div>

      <div className="timer-display">
        <div className="timer-circle">
          <svg className="timer-svg" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <circle
              className="timer-bg"
              cx="50"
              cy="50"
              r="45"
            />
            <circle
              className="timer-progress"
              cx="50"
              cy="50"
              r="45"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            />
          </svg>
          <div className="timer-time">{formatTime(timeLeft)}</div>
        </div>
      </div>

      <div className="timer-controls">
        {!isRunning ? (
          <button onClick={startTimer} className="timer-btn start-btn">
            ▶ Start
          </button>
        ) : (
          <button onClick={pauseTimer} className="timer-btn pause-btn">
            ⏸ Pause
          </button>
        )}
        <button onClick={resetTimer} className="timer-btn reset-btn">
          ⟲ Reset
        </button>
      </div>

      {sessionCompleted && !isBreak && (
        <div className="session-complete">
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <p>✅ Session Complete! Take a break.</p>
        </div>
      )}

      <div className="sessions-counter">
        <span>Completed Sessions: {completedSessions}</span>
      </div>
    </div>
  )
}

export default PomodoroTimer

