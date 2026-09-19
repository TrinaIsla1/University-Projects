# CharacterForge - Quick Reference Guide

## 🚀 Start Development (30 seconds)

```bash
# Terminal 1 - Frontend
cd CharacterForge/frontend
npm install  # First time only
npm run dev

# Terminal 2 - Backend
cd CharacterForge/backend
npm install  # First time only
npm run dev
```

Then open: http://localhost:3000

---

## 📂 Key Files to Modify

### Frontend

- **Pages**: `frontend/src/pages/*.jsx`
- **Styles**: `frontend/src/styles/*.css`
- **API Calls**: `frontend/src/utils/api.js`
- **Game Constants**: `frontend/src/utils/constants.js`

### Backend

- **Database Models**: `backend/src/models/*.js`
- **API Routes**: `backend/src/routes/*.js`
- **Game Logic**: `backend/src/routes/battles.js`
- **Configuration**: `backend/.env`

---

## 🎮 Game Balance Tweaks

### Character Stats (in `constants.js`)

```javascript
CLASSES.WARRIOR.baseStats.attack = 18 // Increase warrior attack
STAT_LIMITS.MAX = 10 // Max points per stat
```

### Battle Rewards (in `battles.js`)

```javascript
const experienceEarned = Math.floor(Math.random() * 100) + 50 // 50-150 XP
const goldEarned = Math.floor(Math.random() * 50) + 20 // 20-70 gold
```

### Level Curve (in `calculations.js`)

```javascript
export const calculateExperienceForLevel = (level) => {
  return Math.floor(100 * Math.pow(1.1, level - 1)) // Change 1.1 for difficulty
}
```

---

## 🔧 Common Tasks

### Add New Item Type

1. Update `constants.js` with item data
2. Add to MongoDB via seed script
3. Update shop page if needed

### Add New Class

1. Add to `CLASSES` in `constants.js`
2. Create new MongoDB document
3. Add unique ability in character creator

### Modify Battle System

1. Edit `backend/src/routes/battles.js`
2. Change damage formula, rewards, logic
3. Frontend battle display in `BattleArena.jsx`

### Add Authentication Check

```javascript
import { storage } from './utils/storage.js'

const token = storage.getToken()
if (!token) navigate('/login')
```

---

## 📊 Database Queries (MongoDB)

```javascript
// Get all characters for a user
db.characters.find({ userId: ObjectId('...') })

// Get top 10 players
db.characters.find().sort({ level: -1, experience: -1 }).limit(10)

// Count total battles won
db.battles.countDocuments({ result: 'win' })

// Find character by name
db.characters.findOne({ name: 'Luna' })
```

---

## 🌐 API Testing

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"pass123"}'

# Create Character
curl -X POST http://localhost:5000/api/characters \
  -H "Authorization: Bearer TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"name":"Hero","class":"warrior"}'
```

---

## 🎨 Styling Tips

### Colors

- Primary Orange: `#ff6b35`
- Dark BG: `#0f0f1e`
- Text: `#ffffff`
- Gold: `#ffd700`

### Common CSS Classes

```css
.btn-primary {
} /* Orange button */
.btn-secondary {
} /* Gray button */
.card {
} /* Content card */
.stat-bar {
} /* Stat display */
```

---

## 🐛 Debug Tips

### Frontend

1. Open DevTools (F12)
2. Check Console for errors
3. Check Network tab for API calls
4. Check Application > Local Storage for token

### Backend

1. Check terminal output for server logs
2. Use MongoDB Compass to view database
3. Test endpoints with Postman/curl
4. Check `.env` for correct connection string

---

## 📝 Add New Feature Checklist

- [ ] Design database schema
- [ ] Create MongoDB model
- [ ] Add API endpoint (route + controller)
- [ ] Add auth middleware if needed
- [ ] Create React component/page
- [ ] Add styling (CSS)
- [ ] Connect to API
- [ ] Test in browser
- [ ] Test error handling
- [ ] Update README

---

## 🚀 Deployment Checklist

- [ ] Update `.env` with production values
- [ ] Set strong `JWT_SECRET`
- [ ] Use MongoDB Atlas (cloud)
- [ ] Build frontend: `npm run build`
- [ ] Deploy backend (Heroku, AWS, DigitalOcean)
- [ ] Deploy frontend (Vercel, Netlify)
- [ ] Update API URL in frontend config
- [ ] Test all features in production
- [ ] Setup monitoring/logging
- [ ] Configure CDN if needed

---

## 📦 Dependencies Reference

### Frontend

- `react-router-dom` - Page routing
- `axios` - HTTP client (optional, using fetch)

### Backend

- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT auth
- `cors` - Cross-origin requests

---

## 💡 Pro Tips

1. **Use Git branches**: `git checkout -b feature/your-feature`
2. **Commit often**: Small, descriptive commits
3. **Test locally first**: Before pushing/deploying
4. **Use postman**: For API testing
5. **Monitor console**: Always check errors
6. **Read docs**: Official docs for libraries
7. **Version your API**: `/api/v1/characters`
8. **Add logging**: For production debugging

---

## 🎓 Learning Resources

- React: https://react.dev
- Express: https://expressjs.com
- MongoDB: https://docs.mongodb.com
- JWT: https://jwt.io
- Vite: https://vitejs.dev

---

## 🤝 Team Collaboration

```bash
# Pull latest changes
git pull origin main

# Create feature branch
git checkout -b feature/new-feature

# Push and create PR
git push origin feature/new-feature
```

---

**Made with ❤️ - CharacterForge Team**
