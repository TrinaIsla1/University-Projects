# CharacterForge Installation & Setup Guide

## 🎯 Quick Start (5 minutes)

### Step 1: Prerequisites Check

- [ ] Node.js 14+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] MongoDB installed locally OR MongoDB Atlas account
- [ ] Git installed

### Step 2: Clone & Navigate

```bash
git clone <repository-url>
cd CharacterForge
```

### Step 3: Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend runs on: http://localhost:3000

### Step 4: Backend Setup (in new terminal)

```bash
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/characterforge
JWT_SECRET=dev_secret_key_change_in_production
NODE_ENV=development
```

Start backend:

```bash
npm run dev
```

✅ Backend runs on: http://localhost:5000

---

## 📋 Detailed Setup Guide

### Option 1: Local MongoDB

#### Windows

1. Download MongoDB Community Edition
2. Run installer
3. MongoDB runs on `mongodb://localhost:27017`

#### macOS

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux

```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### Option 2: MongoDB Atlas (Cloud)

1. Visit https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/characterforge`
5. Add to `.env` as `MONGODB_URI`

---

## 🏃 Running the Project

### Development Mode

**Terminal 1 - Frontend:**

```bash
cd CharacterForge/frontend
npm run dev
```

**Terminal 2 - Backend:**

```bash
cd CharacterForge/backend
npm run dev
```

### Production Mode

**Build Frontend:**

```bash
cd frontend
npm run build
# Creates optimized build in dist/
```

**Run Backend:**

```bash
cd backend
npm start
```

---

## ✅ Verification Checklist

After starting both servers:

- [ ] Frontend loads at http://localhost:3000
- [ ] Backend API responds at http://localhost:5000/api
- [ ] MongoDB connection successful (check console)
- [ ] Can register new account
- [ ] Can login with credentials
- [ ] Can create character
- [ ] Can view dashboard

---

## 🔧 Troubleshooting

### Frontend Issues

**Port 3000 already in use:**

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

**API requests failing (404):**

- Ensure backend is running on port 5000
- Check proxy setting in `vite.config.js`
- Verify API URLs in `src/utils/api.js`

**Blank page:**

- Check browser console for errors
- Clear browser cache and localStorage
- Hard refresh (Ctrl+Shift+R)

### Backend Issues

**Port 5000 already in use:**

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

**MongoDB connection failed:**

- Verify MongoDB is running
- Check connection string in `.env`
- Ensure firewall allows MongoDB port (27017)
- For Atlas: check IP whitelist and credentials

**Dependencies not installing:**

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📦 Project Scripts

### Frontend

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend

```bash
npm run dev      # Start with auto-reload
npm start        # Start production
npm run seed     # Populate seed data
```

---

## 🌍 Environment Variables

### Frontend (.env or .env.local)

```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/characterforge
JWT_SECRET=your_secret_key_minimum_32_chars
NODE_ENV=development
```

---

## 🚀 First Time Usage

1. **Register Account**
   - Go to http://localhost:3000/register
   - Fill in username, email, password
   - Click Register

2. **Create Character**
   - Follow 4-step character creator
   - Allocate stat points
   - Click "Create Character"

3. **Explore Features**
   - Dashboard - view characters
   - Shop - purchase items
   - Battle - fight enemies
   - Inventory - manage items
   - Leaderboard - see rankings

---

## 📁 File Structure Quick Reference

```
CharacterForge/
├── frontend/           # React app
│   ├── src/pages/     # Page components
│   ├── src/utils/     # Helpers & API
│   ├── src/styles/    # CSS
│   └── package.json
├── backend/            # Express API
│   ├── src/models/    # Database schemas
│   ├── src/routes/    # API endpoints
│   ├── .env           # Config (create this)
│   └── package.json
└── README.md          # Main documentation
```

---

## 🔐 Security Notes

- Change `JWT_SECRET` in production
- Use strong database password
- Enable MongoDB Atlas IP whitelist
- Use HTTPS in production
- Keep dependencies updated

---

## 📞 Need Help?

1. Check `frontend/README.md` for frontend-specific info
2. Check `backend/README.md` for backend-specific info
3. Review error messages in browser console
4. Check terminal output for server errors
5. Verify all services are running

---

## 🎮 You're All Set!

The application is ready to use. Start creating characters and exploring the world of CharacterForge!

Need to scale? Check deployment guides in backend README.
