# ⚔️ CharacterForge: Advanced RPG Character Creator & Battle System

A full-stack web application built with **React**, **Vite**, **Node.js**, **Express**, and **MongoDB** that allows users to create, customize, and battle with unique RPG characters.

## 🎮 Features

### Core Systems

- ✅ **User Authentication** - Register, login, and account management
- ✅ **Character Creation** - Multi-step character creator with customization
- ✅ **Character Classes** - 6 unique classes with different stats and abilities
- ✅ **Stats System** - Health, Attack, Defense, Magic, Speed, Accuracy, Critical Chance
- ✅ **Equipment System** - Weapons, armor, and consumable items
- ✅ **Inventory Management** - Track and manage character items
- ✅ **Shop System** - Purchase equipment with in-game currency
- ✅ **Battle System** - Real-time combat with damage calculations
- ✅ **Leveling & Experience** - Gain EXP, level up, unlock abilities
- ✅ **Achievement System** - Earn achievements and unlock rewards
- ✅ **Leaderboard** - Compete with other players
- ✅ **Virtual Economy** - Earn and spend gold

## 🏗️ Project Structure

```
CharacterForge/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── components/      # Reusable components
│   │   ├── styles/          # CSS stylesheets
│   │   ├── utils/           # Helper functions
│   │   ├── assets/          # Images and media
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── backend/                  # Node.js + Express API
    ├── src/
    │   ├── models/          # MongoDB schemas
    │   ├── routes/          # API endpoints
    │   ├── controllers/     # Business logic
    │   ├── middleware/      # Auth and error handling
    │   └── server.js        # Express server
    ├── package.json
    └── .env.example
```

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling with gradient themes

### Backend

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

## 📋 Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB (local or Atlas)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd CharacterForge
```

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

### 3. Setup Backend

```bash
cd ../backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/characterforge
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

Start the server:

```bash
npm run dev
```

Backend runs on `http://localhost:5000`

## 📊 Database Schema

### Users

- `username` - Unique username
- `email` - Unique email address
- `password` - Hashed password
- `createdAt` - Account creation date
- `achievements` - Array of earned achievements

### Characters

- `userId` - Reference to User
- `name` - Character name
- `class` - Character class (warrior, mage, etc.)
- `level` - Current level (1-100)
- `experience` - Total experience points
- `gold` - Currency amount
- `stats` - Character statistics
- `appearance` - Physical customization
- `currentHealth` - HP

### Items

- `name` - Item name
- `type` - weapon, armor, consumable
- `price` - Shop price
- `bonus` - Stat bonuses (stat, value)

### Inventory

- `characterId` - Reference to Character
- `itemId` - Reference to Item
- `quantity` - Number owned
- `equipped` - Is item equipped?

### Battles

- `characterId` - Player's character
- `enemyName` - Enemy name
- `result` - Battle outcome (win/loss/draw)
- `experienceEarned` - EXP reward
- `goldEarned` - Gold reward

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login user

### Characters

- `GET /api/characters` - Get user's characters
- `GET /api/characters/:id` - Get single character
- `POST /api/characters` - Create character
- `PUT /api/characters/:id` - Update character
- `DELETE /api/characters/:id` - Delete character

### Battles

- `POST /api/battles/start` - Start new battle
- `POST /api/battles/attack` - Execute attack action

### Shop

- `GET /api/shop/items` - Get available items
- `POST /api/shop/purchase` - Purchase item

### Inventory

- `GET /api/inventory/:characterId` - Get inventory
- `POST /api/inventory` - Add item
- `PUT /api/inventory/:id/equip` - Equip item

### Leaderboard

- `GET /api/leaderboard` - Get top characters

## 🎨 Character Classes

| Class       | Strength          | Weakness | Ability       |
| ----------- | ----------------- | -------- | ------------- |
| ⚔️ Warrior  | HP & Defense      | Magic    | Shield Bash   |
| 🔮 Mage     | Magic             | Defense  | Fireball      |
| 🏹 Archer   | Accuracy & Speed  | HP       | Multi Shot    |
| 🗡️ Assassin | Critical Damage   | Defense  | Shadow Strike |
| 🛡️ Paladin  | Defense & Healing | Speed    | Divine Shield |
| 💚 Healer   | Healing & Support | Attack   | Heal          |

## 🎯 Gameplay Flow

1. **Register/Login** - Create or access your account
2. **Create Character** - Design your character with customization options
3. **Allocate Stats** - Distribute 20+ skill points
4. **Explore Dashboard** - View your characters
5. **Shop** - Purchase equipment and items with gold
6. **Battle** - Fight enemies and earn experience
7. **Level Up** - Gain stats and unlock new abilities
8. **Compete** - Climb the leaderboard

## 🏆 Achievements

- **First Blood** - Win your first battle
- **Collector** - Own 10 items
- **Warrior** - Reach Level 10
- **Millionaire** - Collect 10,000 gold
- **Boss Slayer** - Defeat a boss
- **Legendary** - Reach Level 50

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## 📝 Example Requests

### Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"hero","email":"hero@example.com","password":"pass123"}'
```

### Create Character

```bash
curl -X POST http://localhost:5000/api/characters \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name":"Luna",
    "class":"mage",
    "age":25,
    "gender":"female",
    "stats":{"health":5,"attack":3,"defense":2,"magic":10,"speed":5,"accuracy":5,"criticalChance":3}
  }'
```

## 🚧 Future Features

- [ ] Guilds and group battles
- [ ] Trading system between players
- [ ] Quest system
- [ ] Skill tree customization
- [ ] Real-time multiplayer battles
- [ ] Social features (friends, chat)
- [ ] Mobile app (React Native)
- [ ] Cosmetic skins
- [ ] Seasonal content
- [ ] PvP ranked matches

## 🐛 Known Issues

- Websocket support needed for real-time battles
- Mobile responsiveness needs improvement
- Admin panel not yet implemented

## 👨‍💻 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 📞 Support

For issues and feature requests, please open an issue on the repository.

---

**Happy adventuring!** ⚔️🎮

Made with ❤️ by the CharacterForge Team
