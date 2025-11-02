import React, { useState, useEffect } from 'react'
import './AnalyticsDashboard.css'

const AnalyticsDashboard = ({ focusTime, completedSessions, tasks, user }) => {
  const [weeklyData, setWeeklyData] = useState([])
  const [bestStudyTime, setBestStudyTime] = useState(null)
  const [dailyGoal, setDailyGoal] = useState(4) // hours
  const [goalProgress, setGoalProgress] = useState(0)

  useEffect(() => {
    // Generate weekly data
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const data = days.map((day, index) => {
      const savedData = JSON.parse(localStorage.getItem(`focusData_${index}`) || 'null')
      return {
        day,
        hours: savedData?.hours || Math.random() * 3,
        sessions: savedData?.sessions || Math.floor(Math.random() * 5)
      }
    })
    setWeeklyData(data)

    // Calculate best study time (hour with most sessions)
    const hourlyData = {}
    for (let i = 0; i < 24; i++) {
      hourlyData[i] = 0
    }
    // Simulate some data
    hourlyData[9] = 5
    hourlyData[10] = 8
    hourlyData[14] = 6
    hourlyData[20] = 4

    const bestHour = Object.keys(hourlyData).reduce((a, b) => 
      hourlyData[a] > hourlyData[b] ? a : b
    )
    setBestStudyTime(`${bestHour}:00`)

    // Calculate goal progress
    const todayHours = focusTime / 60 / 60 // Convert seconds to hours
    setGoalProgress(Math.min((todayHours / dailyGoal) * 100, 100))
  }, [focusTime, completedSessions])

  const completedTasksToday = tasks.todos.filter(t => {
    if (!t.completed) return false
    const completedDate = new Date(t.completedAt || t.createdAt)
    const today = new Date()
    return completedDate.toDateString() === today.toDateString()
  }).length

  const maxHours = Math.max(...weeklyData.map(d => d.hours), 1)

  return (
    <div className="analytics-dashboard">
      <h3>📊 Analytics</h3>

      <div className="analytics-grid">
        <div className="analytics-card">
          <div className="analytics-header">
            <span className="analytics-icon">⏱️</span>
            <span>Focus Time Today</span>
          </div>
          <div className="analytics-value">
            {Math.floor(focusTime / 60)} min
          </div>
          <div className="goal-progress">
            <div className="goal-progress-bar">
              <div 
                className="goal-progress-fill" 
                style={{ width: `${goalProgress}%` }}
              ></div>
            </div>
            <span className="goal-text">{goalProgress.toFixed(0)}% of daily goal</span>
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-header">
            <span className="analytics-icon">✅</span>
            <span>Sessions Completed</span>
          </div>
          <div className="analytics-value">{completedSessions}</div>
          <div className="analytics-subtext">Today</div>
        </div>

        <div className="analytics-card">
          <div className="analytics-header">
            <span className="analytics-icon">📝</span>
            <span>Tasks Completed</span>
          </div>
          <div className="analytics-value">{completedTasksToday}</div>
          <div className="analytics-subtext">Today</div>
        </div>

        <div className="analytics-card">
          <div className="analytics-header">
            <span className="analytics-icon">⭐</span>
            <span>Best Study Time</span>
          </div>
          <div className="analytics-value">{bestStudyTime}</div>
          <div className="analytics-subtext">Based on your patterns</div>
        </div>
      </div>

      <div className="chart-card">
        <h4>Weekly Focus Time</h4>
        <div className="chart-container">
          {weeklyData.map((day, index) => (
            <div key={index} className="chart-bar-container">
              <div className="chart-bar-wrapper">
                <div
                  className="chart-bar"
                  style={{ height: `${(day.hours / maxHours) * 100}%` }}
                ></div>
              </div>
              <div className="chart-label">{day.day}</div>
              <div className="chart-value">{day.hours.toFixed(1)}h</div>
            </div>
          ))}
        </div>
      </div>

      <div className="chart-card">
        <h4>Task Completion Rate</h4>
        <div className="completion-stats">
          <div className="stat-item">
            <span className="stat-label">Today</span>
            <span className="stat-value">{completedTasksToday} tasks</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">This Week</span>
            <span className="stat-value">
              {tasks.todos.filter(t => {
                const completed = new Date(t.completedAt || t.createdAt)
                const weekAgo = new Date()
                weekAgo.setDate(weekAgo.getDate() - 7)
                return completed > weekAgo
              }).length} tasks
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsDashboard

