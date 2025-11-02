# 🚀 GitHub Setup Guide - Step by Step

## Step 1: Initialize Git (Already Done ✅)
I've initialized git for you. Now follow these steps:

## Step 2: Create a GitHub Repository

### Option A: Using GitHub Website (Easiest)
1. Go to [github.com](https://github.com) and sign in (or create an account)
2. Click the **"+"** icon in top right → **"New repository"**
3. Repository name: `StudyHub` (or any name you like)
4. Description: "A gamified study and productivity web application"
5. Choose **Public** (to make it accessible)
6. **DO NOT** initialize with README, .gitignore, or license (we already have them)
7. Click **"Create repository"**

### Option B: Using GitHub CLI (if installed)
```bash
gh repo create StudyHub --public --source=. --remote=origin --push
```

## Step 3: Add All Files
Run in your terminal:
```bash
git add .
```

## Step 4: Commit Your Code
```bash
git commit -m "Initial commit - StudyHub premium productivity app"
```

## Step 5: Connect to GitHub
After creating the repo on GitHub, you'll see commands. Run:
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/StudyHub.git
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

## Step 6: Deploy to Vercel
Once your code is on GitHub:
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click **"New Project"**
4. Import your **StudyHub** repository
5. Vercel will auto-detect settings
6. Click **"Deploy"**
7. Wait ~2 minutes
8. Your app is LIVE! 🎉

## Quick Commands Summary
```bash
# 1. Add files
git add .

# 2. Commit
git commit -m "Initial commit - StudyHub premium productivity app"

# 3. Rename branch to main
git branch -M main

# 4. Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/StudyHub.git

# 5. Push to GitHub
git push -u origin main
```

## Need Help?
- **GitHub Help**: [docs.github.com](https://docs.github.com)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)

---

**Tip**: After pushing to GitHub, you can use Vercel's auto-deploy feature - every time you push changes, your site will automatically update! 🔥

