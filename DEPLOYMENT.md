# 🚀 Deployment Guide

This guide will help you deploy the 3D Tic-Tac-Toe application to various hosting platforms.

## Table of Contents

- [Vercel (Recommended)](#vercel-recommended)
- [Netlify](#netlify)
- [GitHub Pages](#github-pages)
- [Other Platforms](#other-platforms)

---

## Vercel (Recommended)

Vercel provides the best experience for deploying Vite applications with zero configuration.

### Method 1: Deploy via Vercel Dashboard

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to [Vercel](https://vercel.com)**
   - Sign up or log in with your GitHub account

3. **Import your project**
   - Click "Add New..." → "Project"
   - Select your repository from the list
   - Click "Import"

4. **Configure the project**
   - **Framework Preset**: Vite (Auto-detected)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 1-2 minutes)
   - Your app will be live at `https://your-project-name.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - What's your project's name? **3d-tic-tac-toe**
   - In which directory is your code located? **.**

4. **Deploy to production**
   ```bash
   vercel --prod
   ```

### Automatic Deployments

Once set up, Vercel will automatically deploy:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

---

## Netlify

### Method 1: Drag & Drop

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Go to [Netlify Drop](https://app.netlify.com/drop)
   - Drag and drop the `dist` folder
   - Your site will be live instantly

### Method 2: Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Initialize and Deploy**
   ```bash
   netlify init
   ```
   
   Follow the prompts:
   - Create & configure a new site
   - Build command: `npm run build`
   - Directory to deploy: `dist`

4. **Deploy to production**
   ```bash
   netlify deploy --prod
   ```

### Method 3: GitHub Integration

1. **Push code to GitHub**
2. **Go to [Netlify](https://app.netlify.com)**
3. **Click "Add new site" → "Import an existing project"**
4. **Select GitHub and choose your repository**
5. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
6. **Click "Deploy site"**

---

## GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add base path to vite.config.ts**
   ```typescript
   export default defineConfig(() => ({
     base: '/3d-tic-tac-toe/', // Replace with your repo name
     // ... other config
   }));
   ```

3. **Add deploy scripts to package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages"
   - Select "gh-pages" branch
   - Your site will be live at `https://username.github.io/3d-tic-tac-toe/`

---

## Other Platforms

### Cloudflare Pages

1. **Push to GitHub**
2. **Go to [Cloudflare Pages](https://pages.cloudflare.com)**
3. **Connect your repository**
4. **Build settings:**
   - Build command: `npm run build`
   - Build output directory: `dist`

### Render

1. **Create a new Static Site on [Render](https://render.com)**
2. **Connect your repository**
3. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`

### Railway

1. **Go to [Railway](https://railway.app)**
2. **Click "New Project" → "Deploy from GitHub repo"**
3. **Select your repository**
4. **Add build configuration:**
   - Build command: `npm run build`
   - Start command: `npm run preview`

---

## Custom Domain

### Vercel

1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update your DNS records as instructed

### Netlify

1. Go to "Domain settings"
2. Click "Add custom domain"
3. Follow the DNS configuration instructions

---

## Environment Variables

Currently, this project doesn't require environment variables. If you add any:

1. **Vercel**: Add in Project Settings → Environment Variables
2. **Netlify**: Add in Site Settings → Build & Deploy → Environment
3. **Local**: Create `.env.local` file (already in .gitignore)

---

## Post-Deployment

After deployment, verify:

- ✅ Site loads correctly
- ✅ 3D graphics render properly
- ✅ Game interactions work
- ✅ Responsive design on mobile
- ✅ No console errors

---

## Troubleshooting

### Build Fails

- Check Node.js version (use v18 or higher)
- Clear cache: `npm clean-cache --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

### 404 on Refresh

- Ensure proper routing configuration (vercel.json handles this)
- For other platforms, add a redirect rule to index.html

### 3D Graphics Don't Load

- Check browser compatibility (need WebGL support)
- Verify all assets are properly bundled
- Check console for errors

---

## Performance Optimization

For better performance:

1. **Enable compression** (automatically done on Vercel/Netlify)
2. **Use CDN** (provided by most hosting platforms)
3. **Enable caching** (configured in vercel.json)
4. **Monitor Core Web Vitals** using Vercel Analytics or Google Lighthouse

---

## Support

If you encounter issues:

1. Check the [Issues](https://github.com/yourusername/3d-tic-tac-toe/issues) page
2. Review platform-specific documentation
3. Open a new issue with detailed information

---

**Happy Deploying! 🎉**
