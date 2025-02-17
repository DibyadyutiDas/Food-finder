# Pure-veg Food Finder

## 📝 Project Overview
**Food Finder** is a web app designed to help users locate hotels and restaurants that offer **100% vegetarian food**, with specialized filters for **No Onion & Garlic (Satvik)**.

## 🚀 Features
- 🌍 **Google Maps API Integration** for location-based searches.
- 🏨 **Search for Pure Veg Hotels & Restaurants**.
- 🍛 **Filter Options:**
  - ✅ Pure Veg
  - 🚫 No Onion-Garlic (Satvik)
- ⭐ **User Reviews & Ratings**.
- 📌 **MongoDB Database** for storing places.
- 🔥 **Express.js Backend & React.js Frontend**.

## 📂 Project Structure
```
FoodFinder/
│-- frontend/         # React.js (UI)
│-- backend/          # Node.js + Express.js (API)
│-- database/         # MongoDB for storing locations
│-- .env              # Configuration file (MongoDB URI)
│-- README.md         # Documentation
```

## 🛠 Installation & Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/FoodFinder.git
   cd FoodFinder
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env` file in the root directory and add:
   ```env
   MONGO_URI=your_mongodb_connection_string
   ```
4. **Run the backend server:**
   ```sh
   npm start
   ```
5. **Test the API:**
   Open `http://localhost:5000/places` in your browser or use Postman.

## 💡 Contributing
We welcome contributions! Feel free to **fork this repo**, submit issues, or add new features.

## 📜 License
This project is **open-source** and available under the **MIT License**.

---

## 🔧 Backend Code (server.js)
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const placeSchema = new mongoose.Schema({
  name: String,
  location: String,
  type: String, // "Pure Veg", "No Onion-Garlic"
  rating: Number,
  reviews: [String]
});

const Place = mongoose.model('Place', placeSchema);

app.get('/places', async (req, res) => {
  const places = await Place.find();
  res.json(places);
});

app.post('/add-place', async (req, res) => {
  const newPlace = new Place(req.body);
  await newPlace.save();
  res.json({ message: 'Place Added!' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```
