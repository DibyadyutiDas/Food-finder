# 🍽️ Pure-Veg Food Finder

<p align="center">
  <img src="https://github.com/DibyadyutiDas/project_img/blob/main/Food%20Finder.png?raw=true" alt="Food Finder" width="60%" />
</p>

## 📝 Project Overview
**Food Finder** is a web application designed to help users locate hotels and restaurants that offer **100% vegetarian food**, with specialized filters for **No Onion & Garlic (Satvik)**. It provides an intuitive way to discover pure vegetarian dining options near you.

---

## 🚀 Features
✔️ **Google Maps API Integration** for seamless location-based searches.  
✔️ **Search for Pure Veg Hotels & Restaurants** easily.  
✔️ **Advanced Filters:**  
   - 🥦 **Pure Veg** (Only vegetarian restaurants)
   - 🍲 **No Onion-Garlic (Satvik)**  
✔️ **User Reviews & Ratings** for informed choices.  
✔️ **MongoDB Database** to store locations and user inputs.  
✔️ **Express.js Backend & React.js Frontend** for a smooth user experience.  

---

## 📂 Project Structure
```yaml
FoodFinder/
│-- frontend/         # React.js (UI)
│-- backend/          # Node.js + Express.js (API)
│-- database/         # MongoDB for storing locations
│-- .env              # Configuration file (MongoDB URI)
│-- README.md         # Documentation
```

---

## 🛠 Installation & Setup

### 1️⃣ Clone the repository:
```sh
git clone https://github.com/yourusername/FoodFinder.git
cd FoodFinder
```

### 2️⃣ Install dependencies:
```sh
npm install
```

### 3️⃣ Set up environment variables:
Create a `.env` file in the root directory and add:
```sh
MONGO_URI=your_mongodb_connection_string
```

### 4️⃣ Run the backend server:
```sh
npm start
```

### 5️⃣ Test the API:
Open `http://localhost:5000/places` in your browser or use Postman.

---

## 💡 Contributing
We welcome contributions! If you'd like to add new features, fix bugs, or improve documentation:
1. **Fork the repository**
2. **Create a new branch**
3. **Make your changes**
4. **Submit a pull request** 🚀

---

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
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log(`❌ Connection Error: ${err}`));

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
  res.json({ message: '✅ Place Added!' });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
```

