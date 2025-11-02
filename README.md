# 🎮 StudyHub - Comprehensive Gamified Study & Productivity Platform

A feature-rich, gamified web application for managing tasks, tracking focus time, and boosting productivity - inspired by Habitica but with advanced study-focused features.

## ✨ Features

### 🔐 Authentication System
- **Login/Sign-up**: Secure user authentication
- **Guest Mode**: Try the app without creating an account
- User profile management

### 📋 Enhanced Task Management
- **Three Task Types**:
  - **Habits**: Repeatable tasks you can do multiple times
  - **Dailies**: Daily tasks that reset each day
  - **To-Dos**: One-time tasks with deadlines
- **Priority System**: High, Medium, Low priorities
- **Deadlines**: Set due dates and times for tasks
- **Reminders**: Get notified when tasks are due
- **Edit & Delete**: Full CRUD operations for tasks
- **Sorting**: Tasks automatically sorted by priority and deadline

### ⏱️ Pomodoro Timer
- **Customizable Durations**: Set custom work and break times
- **Visual Progress**: Circular progress indicator
- **Session Tracking**: Count completed focus sessions
- **Auto-sync with Music**: Timer automatically starts music

### 🎵 Binaural Beats Music Player (YouTube)
- **Frequency Selection**: Choose from scientifically-backed binaural beats frequencies
  - **6 Hz**: Deep Meditation (Theta waves)
  - **8 Hz**: Theta Waves - Relaxation
  - **12 Hz**: Alpha Waves - Light Meditation
  - **20 Hz**: Beta Waves - Focus & Study
  - **40 Hz**: Gamma Waves - Deep Focus (recommended for coding/studying)
- **YouTube Integration**: Plays binaural beats directly from YouTube
- **Mood-Based Selection**: Automatically suggests frequencies based on your mood
- **Auto-switch**: Automatically switches to relaxing frequencies during breaks
- **Loop Control**: Continuous playback for extended focus sessions
- **Volume Control**: Adjustable volume slider
- **YouTube Search**: Quick search for binaural beats videos on YouTube

### 🎯 Focus Mode
- **Distraction-free**: Hides all UI except essentials
- **Blurred Background**: Minimizes distractions
- **Essential Controls**: 
  - Timer visible
  - Music controls accessible
  - Today's tasks displayed
- **Easy Exit**: One-click to return to main view

### 📊 Analytics Dashboard
- **Focus Time Tracking**: Track time spent in focus mode
- **Weekly Patterns**: Visualize your focus time over the week
- **Best Study Time**: AI-suggested optimal study times based on patterns
- **Session Counter**: Track completed Pomodoro sessions
- **Task Completion Graph**: Visualize task completion rates
- **Daily Goal Progress**: Track progress toward daily focus goals

### 🎮 Gamification System
- **Level Progression**: Gain XP and level up
- **Health Points (HP)**: Lose HP when missing tasks
- **Gold Currency**: Earn gold by completing tasks
- **Focus Streaks**: Track consecutive days of focus
- **Achievements**:
  - 🏆 Level-based achievements
  - 🔥 3 Sessions in a Row
  - 🚀 10 Tasks in One Day
  - ⭐ Veteran (Level 5+)
  - 👑 Master (Level 10+)

### 👤 Avatar Customization
- **Character Classes**: Warrior, Mage, Rogue, Healer
- **Custom Colors**: Personalize your avatar
- **Name Customization**: Set your character name
- **Level Badges**: Display your current level

## 🚀 Getting Started

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Start the development server**:
```bash
npm run dev
```

3. **Open your browser**:
The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 💡 How It Works

### Auto-Sync Features

- **Timer → Music**: When you start the Pomodoro timer, music automatically starts
- **Break Mode**: During breaks, music switches to relaxing tracks
- **Timer End**: Music pauses when timer ends (if configured)

### Task Rewards

- **Habits**: Earn XP and Gold each time completed
- **Dailies**: Higher rewards, but can only be completed once per day
- **To-Dos**: Highest rewards, removed upon completion

### Focus Streaks

- Track consecutive days with completed focus sessions
- Streaks reset if you miss a day
- Unlock achievements for maintaining streaks

## 🛠️ Technologies

- **React 18**: Modern UI framework
- **Vite**: Fast build tool and dev server
- **CSS3**: Modern styling with custom properties
- **LocalStorage**: Client-side data persistence
- **No Backend Required**: Fully functional as a single-page application

## 📱 Responsive Design

The app is fully responsive and works on:
- 🖥️ Desktop
- 📱 Tablets
- 📱 Mobile devices

### 💻 Online Compiler
- **Multi-Language Support**: JavaScript, Python, Java, C++, C, HTML, CSS
- **Code Editor**: Monaco Editor with syntax highlighting and autocomplete
- **Real-time Execution**: Run code directly in the browser (JavaScript) or via API
- **Theme Support**: Dark, Light, and High Contrast themes
- **Output Display**: See results and errors in real-time
- **Perfect for Coders**: Practice coding while in focus mode

## 🔮 Future Enhancements

- [ ] Spotify API integration
- [ ] Social features (parties/groups)
- [ ] Cloud sync across devices
- [ ] Advanced analytics with ML predictions
- [ ] Mobile app versions
- [ ] Custom YouTube video ID configuration UI

## 📝 Notes

- All data is stored locally in your browser (LocalStorage)
- Guest mode allows trying the app without account creation
- Focus mode provides a distraction-free study environment
- Auto-sync features enhance the seamless study experience
- **YouTube Video IDs**: The binaural beats player uses YouTube video IDs. You can replace the default IDs in `MusicPlayer.jsx` with your preferred binaural beats videos.
- **Online Compiler**: JavaScript runs directly in your browser. For Python, C++, Java, and C, you'll need to configure JDoodle API credentials (free tier available at jdoodle.com).

## 🚀 Deploy Your App

Ready to make your StudyHub public? Check out [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions!

**Quick Deploy Options:**
- **Vercel** (Recommended): Just connect your GitHub repo and deploy in 2 minutes
- **Netlify**: Drag & drop your project folder
- **GitHub Pages**: Free hosting for your GitHub repos
- **Firebase**: Google's hosting platform

All deployment configurations are included! 🎉

## 🎉 Enjoy!

Start gamifying your productivity and making study sessions more engaging and effective!

---

*Inspired by [Habitica](https://habitica.com/) - Gamify Your Life*
