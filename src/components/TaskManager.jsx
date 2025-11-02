import React, { useState, useEffect } from 'react'
import './TaskManager.css'

const TaskManager = ({ tasks, setTasks, user, addXP, addGold, takeDamage }) => {
  const [activeTab, setActiveTab] = useState('habits')
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [newTask, setNewTask] = useState({
    text: '',
    type: 'habits',
    priority: 'medium',
    deadline: '',
    reminder: '',
    difficulty: 1
  })

  // Check for reminders
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date()
      tasks.todos.forEach(task => {
        if (task.reminder && !task.completed && !task.reminderShown) {
          const reminderTime = new Date(task.reminder)
          if (reminderTime <= now) {
            alert(`⏰ Reminder: ${task.text}`)
            setTasks(prev => ({
              ...prev,
              todos: prev.todos.map(t => 
                t.id === task.id ? { ...t, reminderShown: true } : t
              )
            }))
          }
        }
      })
    }

    const interval = setInterval(checkReminders, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [tasks])

  const completeTask = (type, index) => {
    const task = tasks[type][index]
    
    if (type === 'habits') {
      addXP(task.difficulty * 10)
      addGold(task.difficulty * 5)
    } else if (type === 'dailies') {
      if (!task.completed) {
        addXP(task.difficulty * 15)
        addGold(task.difficulty * 8)
        
        setTasks(prev => ({
          ...prev,
          [type]: prev[type].map((t, i) => 
            i === index ? { ...t, completed: true } : t
          )
        }))
      }
    } else if (type === 'todos') {
      addXP(task.difficulty * 20)
      addGold(task.difficulty * 10)
      
      // Mark as completed before removing for analytics
      const completedTask = { ...task, completed: true, completedAt: new Date().toISOString() }
      localStorage.setItem('lastCompletedTask', JSON.stringify(completedTask))
      
      setTasks(prev => ({
        ...prev,
        [type]: prev[type].filter((_, i) => i !== index)
      }))
    }
  }

  const failDaily = (index) => {
    takeDamage(5)
    setTasks(prev => ({
      ...prev,
      dailies: prev.dailies.map((t, i) => 
        i === index ? { ...t, completed: false } : t
      )
    }))
  }

  const addTask = () => {
    if (!newTask.text.trim()) return

    const task = {
      id: Date.now(),
      text: newTask.text,
      priority: newTask.priority,
      deadline: newTask.deadline || null,
      reminder: newTask.reminder || null,
      difficulty: newTask.difficulty,
      completed: false,
      createdAt: new Date().toISOString()
    }

    setTasks(prev => ({
      ...prev,
      [newTask.type]: [...prev[newTask.type], task]
    }))

    resetForm()
  }

  const updateTask = () => {
    if (!newTask.text.trim()) return

    setTasks(prev => ({
      ...prev,
      [newTask.type]: prev[newTask.type].map(t => 
        t.id === editingTask.id ? {
          ...t,
          text: newTask.text,
          priority: newTask.priority,
          deadline: newTask.deadline || null,
          reminder: newTask.reminder || null,
          difficulty: newTask.difficulty
        } : t
      )
    }))

    resetForm()
  }

  const editTask = (task, type) => {
    setEditingTask(task)
    setNewTask({
      text: task.text,
      type: type,
      priority: task.priority || 'medium',
      deadline: task.deadline || '',
      reminder: task.reminder || '',
      difficulty: task.difficulty || 1
    })
    setShowTaskForm(true)
  }

  const resetForm = () => {
    setNewTask({
      text: '',
      type: activeTab,
      priority: 'medium',
      deadline: '',
      reminder: '',
      difficulty: 1
    })
    setEditingTask(null)
    setShowTaskForm(false)
  }

  const deleteTask = (type, index) => {
    setTasks(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }))
  }

  const resetDailies = () => {
    setTasks(prev => ({
      ...prev,
      dailies: prev.dailies.map(t => ({ ...t, completed: false }))
    }))
  }

  // Sort tasks by priority
  const getSortedTasks = (taskList) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    return [...taskList].sort((a, b) => {
      const priorityDiff = (priorityOrder[b.priority] || 2) - (priorityOrder[a.priority] || 2)
      if (priorityDiff !== 0) return priorityDiff
      
      // If same priority, sort by deadline
      if (a.deadline && b.deadline) {
        return new Date(a.deadline) - new Date(b.deadline)
      }
      if (a.deadline) return -1
      if (b.deadline) return 1
      return 0
    })
  }

  return (
    <div className="task-manager">
      <div className="task-header">
        <div className="task-tabs">
          <button
            className={activeTab === 'habits' ? 'active' : ''}
            onClick={() => {
              setActiveTab('habits')
              setNewTask(prev => ({ ...prev, type: 'habits' }))
            }}
          >
            🔄 Habits ({tasks.habits.length})
          </button>
          <button
            className={activeTab === 'dailies' ? 'active' : ''}
            onClick={() => {
              setActiveTab('dailies')
              setNewTask(prev => ({ ...prev, type: 'dailies' }))
            }}
          >
            📅 Dailies ({tasks.dailies.length})
          </button>
          <button
            className={activeTab === 'todos' ? 'active' : ''}
            onClick={() => {
              setActiveTab('todos')
              setNewTask(prev => ({ ...prev, type: 'todos' }))
            }}
          >
            ✅ To-Dos ({tasks.todos.length})
          </button>
        </div>
        <div className="task-header-actions">
          {activeTab === 'dailies' && (
            <button className="reset-btn" onClick={resetDailies}>
              Reset All
            </button>
          )}
          <button 
            className="add-task-btn" 
            onClick={() => {
              setShowTaskForm(!showTaskForm)
              if (showTaskForm) resetForm()
            }}
          >
            {showTaskForm ? '✕' : '+'}
          </button>
        </div>
      </div>

      {showTaskForm && (
        <div className="task-form-card">
          <h4>{editingTask ? 'Edit Task' : 'Add New Task'}</h4>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Task Name</label>
              <input
                type="text"
                placeholder="Enter task name..."
                value={newTask.text}
                onChange={(e) => setNewTask({ ...newTask, text: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Type</label>
              <select
                value={newTask.type}
                onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
              >
                <option value="habits">Habit</option>
                <option value="dailies">Daily</option>
                <option value="todos">To-Do</option>
              </select>
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label>Difficulty</label>
              <select
                value={newTask.difficulty}
                onChange={(e) => setNewTask({ ...newTask, difficulty: parseInt(e.target.value) })}
              >
                <option value={1}>Easy</option>
                <option value={2}>Medium</option>
                <option value={3}>Hard</option>
              </select>
            </div>

            <div className="form-group">
              <label>Deadline</label>
              <input
                type="datetime-local"
                value={newTask.deadline}
                onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Reminder</label>
              <input
                type="datetime-local"
                value={newTask.reminder}
                onChange={(e) => setNewTask({ ...newTask, reminder: e.target.value })}
              />
            </div>
          </div>

          <div className="form-actions">
            <button onClick={resetForm} className="cancel-btn">Cancel</button>
            <button onClick={editingTask ? updateTask : addTask} className="save-btn">
              {editingTask ? 'Update' : 'Add'} Task
            </button>
          </div>
        </div>
      )}

      <div className="task-list">
        {tasks[activeTab].length === 0 ? (
          <div className="empty-state">
            <p>No {activeTab} yet. Add one above!</p>
          </div>
        ) : (
          getSortedTasks(tasks[activeTab]).map((task, index) => {
            const originalIndex = tasks[activeTab].findIndex(t => t.id === task.id)
            return (
              <TaskItem
                key={task.id || index}
                task={task}
                type={activeTab}
                index={originalIndex}
                completeTask={completeTask}
                failDaily={failDaily}
                deleteTask={deleteTask}
                editTask={editTask}
                takeDamage={takeDamage}
              />
            )
          })
        )}
      </div>
    </div>
  )
}

const TaskItem = ({ task, type, index, completeTask, failDaily, deleteTask, editTask, takeDamage }) => {
  const priorityColors = {
    high: '#d9534f',
    medium: '#f0ad4e',
    low: '#5cb85c'
  }

  const isOverdue = task.deadline && new Date(task.deadline) < new Date() && !task.completed
  const deadlineDate = task.deadline ? new Date(task.deadline) : null
  const reminderDate = task.reminder ? new Date(task.reminder) : null

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-content">
        <div className="task-header-row">
          <div className="task-text">{task.text}</div>
          <div className="priority-badge" style={{ background: priorityColors[task.priority] }}>
            {task.priority}
          </div>
        </div>
        
        <div className="task-meta">
          {deadlineDate && (
            <span className={`deadline-badge ${isOverdue ? 'overdue' : ''}`}>
              📅 {deadlineDate.toLocaleDateString()} {deadlineDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          {reminderDate && (
            <span className="reminder-badge">
              ⏰ {reminderDate.toLocaleDateString()} {reminderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
      </div>
      
      <div className="task-actions">
        {type === 'habits' && (
          <>
            <button
              className="action-btn plus-btn"
              onClick={() => completeTask(type, index)}
              title="Complete"
            >
              +
            </button>
            <button
              className="action-btn minus-btn"
              onClick={() => takeDamage(2)}
              title="Miss"
            >
              −
            </button>
          </>
        )}
        
        {type === 'dailies' && (
          <>
            <button
              className={`action-btn complete-btn ${task.completed ? 'checked' : ''}`}
              onClick={() => !task.completed && completeTask(type, index)}
              disabled={task.completed}
              title="Complete"
            >
              {task.completed ? '✓' : '○'}
            </button>
            <button
              className="action-btn fail-btn"
              onClick={() => failDaily(index)}
              disabled={task.completed}
              title="Miss"
            >
              ✗
            </button>
          </>
        )}
        
        {type === 'todos' && (
          <button
            className="action-btn complete-btn"
            onClick={() => completeTask(type, index)}
            title="Complete"
          >
            ✓
          </button>
        )}
        
        <button
          className="action-btn edit-btn"
          onClick={() => editTask(task, type)}
          title="Edit"
        >
          ✏️
        </button>
        
        <button
          className="action-btn delete-btn"
          onClick={() => deleteTask(type, index)}
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}

export default TaskManager
