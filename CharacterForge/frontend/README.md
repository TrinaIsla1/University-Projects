# Frontend - CharacterForge React App

The React frontend for CharacterForge built with Vite and React Router.

## 📂 Directory Structure

```
src/
├── pages/
│   ├── LandingPage.jsx         # Home page
│   ├── LoginPage.jsx           # User login
│   ├── RegisterPage.jsx        # User registration
│   ├── Dashboard.jsx           # Characters list
│   ├── CharacterCreator.jsx    # Character creation flow
│   ├── CharacterProfile.jsx    # Character details
│   ├── Inventory.jsx           # Item management
│   ├── Shop.jsx                # Item store
│   ├── BattleArena.jsx         # Combat system
│   └── Leaderboard.jsx         # Rankings
│
├── components/
│   └── [Reusable UI components]
│
├── styles/
│   ├── index.css               # Global styles
│   ├── App.css                 # App-wide styles
│   ├── LandingPage.css
│   ├── AuthPages.css
│   ├── Dashboard.css
│   ├── CharacterCreator.css
│   ├── CharacterProfile.css
│   ├── Inventory.css
│   ├── Shop.css
│   ├── BattleArena.css
│   └── Leaderboard.css
│
├── utils/
│   ├── constants.js            # Game constants and data
│   ├── calculations.js         # Game math functions
│   ├── api.js                  # API client
│   └── storage.js              # Local storage helpers
│
├── assets/
│   └── [Images, icons, etc.]
│
├── App.jsx                      # Main app component
├── main.jsx                     # React entry point
└── App.css
```

## 🎨 Design System

### Colors

- Primary: `#ff6b35` (Orange)
- Dark BG: `#0f0f1e`, `#1a1a2e`
- Text: `#ffffff`, `#b0b0b0`
- Accent: `#ffd700` (Gold)

### Typography

- Font: Segoe UI, Tahoma, Geneva, Verdana

## 🔧 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.16.0",
  "axios": "^1.5.0"
}
```

## 🚀 Getting Started

```bash
cd frontend
npm install
npm run dev
```

Open browser to `http://localhost:3000`

## 📝 Pages Overview

### LandingPage

- Hero section with call-to-action
- Feature cards
- Navigation to login/register

### Authentication (Login/Register)

- Email validation
- Password hashing (backend)
- JWT token storage
- Error handling

### Dashboard

- Displays user's characters
- Quick stats overview
- Create new character button
- Character selection

### CharacterCreator (4-step process)

1. **Basic Info** - Name, age, gender, personality
2. **Class Selection** - Choose from 6 classes
3. **Appearance** - Hair, eyes, outfit customization
4. **Stats Allocation** - Distribute stat points

### CharacterProfile

- Character details display
- Stats breakdown
- Equipment preview
- Navigation to inventory/shop/battle

### Inventory

- List owned items
- Equipment management
- Item details
- Quantity tracking

### Shop

- Available items for purchase
- Price display
- Item bonuses
- Purchase button

### BattleArena

- Enemy display
- Character vs Enemy stats
- HP bars with animations
- Battle log
- Action buttons (Attack, Special, Items, Run)

### Leaderboard

- Top characters ranked by level/experience
- Display character details
- Achievements

## 🔌 API Integration

All API calls use the `api.js` utility:

```javascript
import { api } from './utils/api.js'

// Example usage
const user = await api.login(email, password)
const characters = await api.getCharacters(token)
const battle = await api.startBattle(characterId, token)
```

## 💾 Local Storage

Uses `storage.js` utility for data persistence:

```javascript
import { storage } from './utils/storage.js'

storage.setToken(token)
storage.getCharacter()
storage.clear()
```

## 🎮 Game Calculations

Imported from `calculations.js`:

```javascript
calculateDamage(attacker, defender)
calculateCriticalHit(accuracy, critChance)
calculateExperienceForLevel(level)
calculateLevelUp(experience, level)
```

## 🎨 Styling Notes

- Uses CSS Grid for layouts
- Flexbox for component alignment
- Gradient backgrounds for depth
- Smooth transitions and animations
- Responsive design considerations

## 🔐 Security

- JWT tokens stored securely
- Protected routes require authentication
- Password never sent in plain text
- CORS enabled for backend communication

## 🚀 Performance

- Code splitting via React Router
- Lazy loading of components
- Optimized re-renders with React
- Vite's fast build and HMR

## 📱 Responsive Design

- Mobile-first approach
- Grid and flexbox layouts
- Media queries for breakpoints
- Touch-friendly buttons

## 🐛 Common Issues

- **API 404 errors** - Ensure backend is running on port 5000
- **Token expired** - Login again to get new token
- **CORS errors** - Check backend CORS configuration

## 🛠️ Development Tips

1. Use React DevTools browser extension
2. Check browser console for errors
3. Network tab to debug API calls
4. Local Storage to verify token storage
5. Vite hot reload for fast iteration

---

**Frontend Repository** - Part of CharacterForge project
