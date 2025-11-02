# 🚀 Deployment Guide - StudyHub

Make your StudyHub application public! Here are the easiest ways to deploy:

## 📦 Option 1: Deploy to Vercel (Recommended - Easiest)

Vercel is perfect for React/Vite apps and offers free hosting with automatic deployments.

### Steps:

1. **Install Vercel CLI** (optional, you can also use GitHub):
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Website** (Recommended):
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your GitHub repository (or drag & drop the project folder)
   - Vercel will auto-detect Vite settings
   - Click "Deploy"
   - Your site will be live in ~2 minutes! ✨

3. **Deploy via CLI**:
   ```bash
   vercel
   ```
   Follow the prompts and your app will be deployed!

### Features:
- ✅ Free hosting
- ✅ Custom domain support
- ✅ Automatic SSL
- ✅ Auto-deploy on git push
- ✅ Preview deployments for PRs

---

## 🌐 Option 2: Deploy to Netlify

### Steps:

1. **Via Netlify Website**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub or drag & drop your project folder
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

2. **Via Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   netlify deploy
   ```

### Features:
- ✅ Free hosting
- ✅ Custom domain
- ✅ Continuous deployment
- ✅ Form handling

---

## 📱 Option 3: Deploy to GitHub Pages

### Steps:

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   Add these scripts:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist",
     "homepage": "https://YOUR_USERNAME.github.io/Study-Hub"
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages**:
   - Go to your repo → Settings → Pages
   - Select "gh-pages" branch
   - Your site will be at: `https://YOUR_USERNAME.github.io/Study-Hub`

---

## 🔥 Option 4: Deploy to Firebase Hosting

### Steps:

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Login and Initialize**:
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configure**:
   - Public directory: `dist`
   - Single-page app: Yes
   - Auto-build: Yes

4. **Deploy**:
   ```bash
   npm run build
   firebase deploy
   ```

---

## 🎯 Quick Deploy Commands

### Build for Production:
```bash
npm run build
```

### Preview Production Build:
```bash
npm run preview
```

### Test Locally:
```bash
npm run dev
```

---

## ✅ Pre-Deployment Checklist

- [ ] Test all features locally
- [ ] Check that all API calls work
- [ ] Ensure environment variables are set (if any)
- [ ] Test on mobile devices
- [ ] Verify all images/assets load
- [ ] Check console for errors

---

## 🔧 Environment Variables (if needed)

If you need to add API keys later:
- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Build & Deploy → Environment Variables
- **Firebase**: Use `.env` files (add to `.gitignore`)

---

## 📝 Important Notes

1. **YouTube Video IDs**: Remember to update the binaural beats video IDs in `MusicPlayer.jsx` before deploying if you want custom videos.

2. **Compiler API**: For the online compiler, users will need to configure JDoodle API credentials themselves (it's client-side for now).

3. **LocalStorage**: All data is stored locally in the browser, so it won't sync across devices unless you add backend later.

---

## 🎉 After Deployment

Once deployed, share your amazing StudyHub app:
- Share the URL with friends
- Add it to your portfolio
- Post on social media
- Get feedback and iterate!

**Recommended: Use Vercel for the easiest and fastest deployment!** 🚀

