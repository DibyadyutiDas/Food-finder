/*
Food Finder - Advanced Version
Features:
1. Google Maps API Integration
2. Filter: Pure Veg, No Onion-Garlic, Jain-Friendly
3. User Reviews & Ratings
4. MongoDB Database for storing places
5. Express.js Backend for API calls
6. React.js Frontend for UI
*/

// Project Structure:
// - frontend (React.js)
// - backend (Node.js + Express.js)
// - database (MongoDB)

// Backend (server.js - Node.js + Express.js)
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
  type: String, // "Pure Veg", "No Onion-Garlic", "Jain"
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

/* README.md */

/*
# Food Finder

A web app that helps users find hotels and restaurants offering 100% vegetarian food with options for No Onion & Garlic (Satvik) and Jain food.

## Features
- 🌍 Google Maps API Integration
- 🏨 Search for Pure Veg Hotels & Restaurants
- 🍛 Filter: Pure Veg, No Onion-Garlic, Jain-Friendly
- ⭐ User Reviews & Ratings
- 📌 MongoDB Database to store places
- 🔥 Express.js Backend & React.js Frontend

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/FoodFinder.git
   cd FoodFinder
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up a `.env` file:
   ```env
   MONGO_URI=your_mongodb_connection_string
   ```
4. Run the backend server:
   ```sh
   npm start
   ```
5. Open `http://localhost:5000/places` to test the API.

## Contributing
Feel free to fork this repo and add more features! 😊

*/
