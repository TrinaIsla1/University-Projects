# Backend - CharacterForge API

The Node.js/Express backend API for CharacterForge with MongoDB integration.

## 📂 Directory Structure

```
src/
├── models/
│   ├── index.js                # Database connection
│   ├── User.js                 # User schema
│   ├── Character.js            # Character schema
│   ├── Class.js                # Class definitions
│   ├── Item.js                 # Item schema
│   ├── Inventory.js            # Inventory schema
│   ├── Skill.js                # Skill schema
│   ├── Battle.js               # Battle schema
│   └── Achievement.js          # Achievement schema
│
├── routes/
│   ├── auth.js                 # Authentication endpoints
│   ├── characters.js           # Character CRUD
│   ├── inventory.js            # Inventory management
│   ├── shop.js                 # Shop system
│   ├── battles.js              # Battle system
│   └── leaderboard.js          # Rankings
│
├── controllers/
│   └── [Business logic layer]
│
├── middleware/
│   └── auth.js                 # JWT verification
│
└── server.js                    # Express server entry point
```

## 🛠️ Tech Stack

- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "mongoose": "^7.5.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.1.0",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1"
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB running locally or MongoDB Atlas connection string

### Installation

```bash
cd backend
npm install
```

### Environment Setup

Create `.env` file:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/characterforge
JWT_SECRET=your_super_secret_key_change_this
NODE_ENV=development
```

### Running the Server

Development with auto-reload:

```bash
npm run dev
```

Production:

```bash
npm start
```

Server runs on `http://localhost:5000`

## 📡 API Endpoints

### Authentication

#### Register User

```
POST /api/auth/register
Content-Type: application/json

{
  "username": "heroname",
  "email": "hero@example.com",
  "password": "securepassword"
}

Response:
{
  "token": "jwt_token_here",
  "userId": "user_id"
}
```

#### Login User

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "hero@example.com",
  "password": "securepassword"
}

Response:
{
  "token": "jwt_token_here",
  "userId": "user_id"
}
```

### Characters

#### Get All Characters

```
GET /api/characters
Authorization: Bearer <token>

Response: [{ character_objects }]
```

#### Get Single Character

```
GET /api/characters/:id
Authorization: Bearer <token>

Response: { character_object }
```

#### Create Character

```
POST /api/characters
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Luna",
  "class": "mage",
  "age": 25,
  "gender": "female",
  "stats": {
    "health": 5,
    "attack": 3,
    "defense": 2,
    "magic": 10,
    "speed": 5,
    "accuracy": 5,
    "criticalChance": 3
  },
  "appearance": {
    "hairStyle": "long",
    "hairColor": "black",
    "eyeColor": "blue",
    "outfit": "robes"
  }
}
```

#### Update Character

```
PUT /api/characters/:id
Authorization: Bearer <token>
Content-Type: application/json

{ updated_character_data }
```

#### Delete Character

```
DELETE /api/characters/:id
Authorization: Bearer <token>
```

### Battles

#### Start Battle

```
POST /api/battles/start
Authorization: Bearer <token>
Content-Type: application/json

{
  "characterId": "character_id"
}

Response:
{
  "battle": {
    "_id": "battle_id",
    "character": { "health": 100, "maxHealth": 100 },
    "enemy": { "name": "Goblin", "health": 50, "maxHealth": 50 }
  }
}
```

#### Attack in Battle

```
POST /api/battles/attack
Authorization: Bearer <token>
Content-Type: application/json

{
  "battleId": "battle_id"
}

Response:
{
  "battle": { battle_object },
  "log": "You dealt 25 damage. Enemy dealt 10 damage."
}
```

### Shop

#### Get Shop Items

```
GET /api/shop/items

Response: [{ item_objects }]
```

#### Purchase Item

```
POST /api/shop/purchase
Authorization: Bearer <token>
Content-Type: application/json

{
  "itemId": "item_id",
  "characterId": "character_id"
}

Response:
{
  "message": "Item purchased",
  "character": { updated_character }
}
```

### Inventory

#### Get Inventory

```
GET /api/inventory/:characterId
Authorization: Bearer <token>

Response: [{ inventory_items }]
```

#### Add Item

```
POST /api/inventory
Authorization: Bearer <token>
Content-Type: application/json

{
  "characterId": "character_id",
  "itemId": "item_id",
  "quantity": 1
}
```

#### Equip Item

```
PUT /api/inventory/:inventoryId/equip
Authorization: Bearer <token>

Response: { updated_inventory_item }
```

### Leaderboard

#### Get Top Characters

```
GET /api/leaderboard

Response: [{ top_50_characters }]
```

## 🔐 Authentication

Uses JWT (JSON Web Tokens) for stateless authentication:

1. User registers/logs in
2. Server returns JWT token
3. Client stores token in localStorage
4. Client includes token in Authorization header for protected routes
5. Server verifies token via auth middleware

Token format: `Authorization: Bearer <jwt_token>`

## 📊 Database Models

### User Schema

```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  achievements: [String]
}
```

### Character Schema

```javascript
{
  userId: ObjectId (ref: User),
  name: String,
  class: String,
  level: Number,
  experience: Number,
  gold: Number,
  stats: {
    health, attack, defense, magic, speed, accuracy, criticalChance
  },
  appearance: {
    hairStyle, hairColor, eyeColor, outfit, accessories
  },
  currentHealth: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Item Schema

```javascript
{
  name: String,
  type: String (weapon|armor|consumable),
  price: Number,
  bonus: {
    stat: String,
    value: Number
  }
}
```

### Battle Schema

```javascript
{
  characterId: ObjectId (ref: Character),
  enemyName: String,
  result: String (win|loss|draw),
  experienceEarned: Number,
  goldEarned: Number,
  status: String (in_progress|completed),
  createdAt: Date
}
```

## 🎮 Game Mechanics

### Damage Calculation

```
baseDamage = attacker.attack + random(-5, 5)
finalDamage = baseDamage - (defender.defense * 0.5)
```

### Critical Hit

```
critChance = criticalChance + (accuracy * 0.2)
isCritical = random(0, 100) < critChance
```

### Experience & Leveling

```
expNeeded = 100 * (1.1 ^ level)
nextLevel = currentLevel + 1 (if exp >= expNeeded)
```

### Battle Rewards

```
baseExp = 50 * (1.05 ^ enemyLevel)
baseGold = 20 * (1.05 ^ enemyLevel)
```

## 🚀 Performance Optimization

- Use MongoDB indexes on frequently queried fields
- Implement pagination for large data sets
- Cache leaderboard data (update every 5 minutes)
- Use connection pooling for database

## 🐛 Error Handling

All endpoints return structured error responses:

```json
{
  "message": "Error description",
  "status": 400
}
```

Common status codes:

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## 🔒 Security Best Practices

- Passwords hashed with bcryptjs (10 salt rounds)
- JWT with 7-day expiration
- Environment variables for sensitive data
- Input validation on all endpoints
- CORS configured for frontend origin
- No passwords in error messages

## 📝 Seed Data

Create initial game data:

```bash
npm run seed
```

This populates:

- Character classes with base stats
- Shop items (weapons, armor, consumables)
- Achievements
- Starting enemies

## 🧪 Testing Endpoints

Use Postman, curl, or insomnia:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"pass123"}'
```

## 🚧 Future Enhancements

- [ ] WebSocket support for real-time battles
- [ ] Admin endpoints for game management
- [ ] Seasonal events and limited-time items
- [ ] Trading between players
- [ ] Guild system
- [ ] Quest system
- [ ] Item rarity tiers
- [ ] Skill trees
- [ ] PvP ranking system

## 📊 Monitoring & Logging

Consider adding:

- Winston or Morgan for logging
- Sentry for error tracking
- NewRelic for performance monitoring
- MongoDB Atlas for cloud database

## 🤝 Deployment

### Heroku

```bash
heroku create characterforge-api
heroku config:set MONGODB_URI=<your_mongodb_url>
git push heroku main
```

### Docker

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

---

**Backend Repository** - Part of CharacterForge project
