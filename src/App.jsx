import React, { useState, useEffect } from 'react'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import TaskManager from './components/TaskManager'
import Avatar from './components/Avatar'
import PomodoroTimer from './components/PomodoroTimer'
import MusicPlayer from './components/MusicPlayer'
import AnalyticsDashboard from './components/AnalyticsDashboard'
import FocusMode from './components/FocusMode'
import OnlineCompiler from './components/OnlineCompiler'
import ChatBot from './components/ChatBot'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isGuest, setIsGuest] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [focusMode, setFocusMode] = useState(false)
  const [focusTime, setFocusTime] = useState(0)
  const [focusStreak, setFocusStreak] = useState(0)
  const [completedSessions, setCompletedSessions] = useState(0)
  const [musicAutoPlay, setMusicAutoPlay] = useState(false)
  const [isBreak, setIsBreak] = useState(false)

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : {
      level: 1,
      xp: 0,
      xpToNext: 100,
      hp: 50,
      maxHp: 50,
      gold: 0,
      avatar: {
        name: 'Adventurer',
        class: 'warrior',
        color: '#4a90e2'
      }
    }
  })

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : {
      habits: [],
      dailies: [],
      todos: []
    }
  })

  // Track focus time
  useEffect(() => {
    let interval = null
    if (focusMode) {
      interval = setInterval(() => {
        setFocusTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [focusMode])

  // Update streak
  useEffect(() => {
    const lastSessionDate = localStorage.getItem('lastSessionDate')
    const today = new Date().toDateString()
    
    if (lastSessionDate === today) {
      // Already counted today
      const streak = parseInt(localStorage.getItem('focusStreak') || '0')
      setFocusStreak(streak)
    } else {
      // Check if streak continues
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toDateString()
      
      if (lastSessionDate === yesterdayStr) {
        const streak = parseInt(localStorage.getItem('focusStreak') || '0') + 1
        setFocusStreak(streak)
        localStorage.setItem('focusStreak', streak.toString())
      } else {
        setFocusStreak(1)
        localStorage.setItem('focusStreak', '1')
      }
      localStorage.setItem('lastSessionDate', today)
    }
  }, [completedSessions])

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const handleLogin = (userData) => {
    setCurrentUser(userData)
    setIsAuthenticated(true)
    setIsGuest(false)
  }

  const handleGuestMode = () => {
    setCurrentUser({ name: 'Guest', email: '', isGuest: true })
    setIsAuthenticated(true)
    setIsGuest(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setIsGuest(false)
    setCurrentUser(null)
  }

  const addXP = (amount) => {
    setUser(prev => {
      let newXP = prev.xp + amount
      let newLevel = prev.level
      let newXPToNext = prev.xpToNext

      // Level up logic
      while (newXP >= newXPToNext) {
        newXP -= newXPToNext
        newLevel += 1
        newXPToNext = Math.floor(100 * Math.pow(1.15, newLevel - 1))
      }

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        xpToNext: newXPToNext,
        maxHp: 50 + (newLevel - 1) * 10,
        hp: Math.min(prev.hp + 5, 50 + (newLevel - 1) * 10)
      }
    })
  }

  const addGold = (amount) => {
    setUser(prev => ({
      ...prev,
      gold: prev.gold + amount
    }))
  }

  const takeDamage = (amount) => {
    setUser(prev => ({
      ...prev,
      hp: Math.max(0, prev.hp - amount)
    }))
  }

  const updateAvatar = (avatarData) => {
    setUser(prev => ({
      ...prev,
      avatar: { ...prev.avatar, ...avatarData }
    }))
  }

  const handleTimerStart = () => {
    setMusicAutoPlay(true)
    setFocusMode(true)
  }

  const handleTimerEnd = () => {
    setMusicAutoPlay(false)
    setCompletedSessions(prev => prev + 1)
  }

  const handleBreakStart = (isBreakTime) => {
    setIsBreak(isBreakTime)
    if (isBreakTime) {
      // Switch to relaxing music during break
      setMusicAutoPlay(true)
    }
  }

  const handleMusicPlay = () => {
    setMusicAutoPlay(true)
  }

  const handleMusicPause = () => {
    setMusicAutoPlay(false)
  }

  const getTodayTasks = () => {
    const today = new Date().toDateString()
    return [
      ...tasks.dailies.filter(t => !t.completed),
      ...tasks.todos.filter(t => {
        if (t.completed) return false
        if (!t.deadline) return true
        const deadline = new Date(t.deadline).toDateString()
        return deadline === today || new Date(t.deadline) > new Date()
      })
    ]
  }

  const completedTasksToday = tasks.todos.filter(t => {
    if (!t.completedAt) return false
    const completed = new Date(t.completedAt)
    return completed.toDateString() === new Date().toDateString()
  }).length

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} onGuestMode={handleGuestMode} />
  }

  if (focusMode) {
    return (
      <FocusMode
        timer={
          <PomodoroTimer
            onTimerStart={handleTimerStart}
            onTimerEnd={handleTimerEnd}
            onBreakStart={handleBreakStart}
            autoStartMusic={false}
          />
        }
        musicPlayer={
          <MusicPlayer
            autoPlay={musicAutoPlay}
            onPlay={handleMusicPlay}
            onPause={handleMusicPause}
            isBreak={isBreak}
          />
        }
        todayTasks={getTodayTasks()}
        onExit={() => setFocusMode(false)}
      />
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>🎮 StudyHub</h1>
          <p className="tagline">Gamify Your Life</p>
        </div>
        <div className="header-actions">
          <span className="user-name">{currentUser?.name || 'User'}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
          <button onClick={() => setFocusMode(true)} className="focus-mode-btn">
            🎯 Focus Mode
          </button>
        </div>
      </header>
      
      <div className="app-content">
        <div className="left-panel">
          <Avatar user={user} updateAvatar={updateAvatar} />
          <Dashboard 
            user={user} 
            focusStreak={focusStreak}
            completedSessions={completedSessions}
            completedTasksToday={completedTasksToday}
          />
        </div>
        
        <div className="center-panel">
          <PomodoroTimer
            onTimerStart={handleTimerStart}
            onTimerEnd={handleTimerEnd}
            onBreakStart={handleBreakStart}
            autoStartMusic={true}
          />
          <MusicPlayer
            autoPlay={musicAutoPlay}
            onPlay={handleMusicPlay}
            onPause={handleMusicPause}
            isBreak={isBreak}
          />
          <AnalyticsDashboard
            focusTime={focusTime}
            completedSessions={completedSessions}
            tasks={tasks}
            user={user}
          />
          <OnlineCompiler />
        </div>
        
        <div className="right-panel">
          <TaskManager 
            tasks={tasks}
            setTasks={setTasks}
            user={user}
            addXP={addXP}
            addGold={addGold}
            takeDamage={takeDamage}
          />
        </div>
      </div>
      
      <ChatBot />
    </div>
  )
}

export default App
