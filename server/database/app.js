const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3030;

app.use(cors());
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(express.json());

// Load JSON files from the /data folder
const reviewsPath = path.join(__dirname, 'data', 'reviews.json');
const dealershipsPath = path.join(__dirname, 'data', 'dealerships.json');

const reviews_data = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
const dealerships_data = JSON.parse(fs.readFileSync(dealershipsPath, 'utf8'));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/", { dbName: 'dealershipsDB' });

// Import models
const Reviews = require('./review');
const Dealerships = require('./dealership');

// Populate Mongo only after successful connection
mongoose.connection.once('open', async () => {
  console.log("✅ Connected to MongoDB");

  try {
    const reviewCount = await Reviews.countDocuments();
    const dealerCount = await Dealerships.countDocuments();

    if (reviewCount === 0) {
      console.log("🟡 No reviews found. Inserting...");
      await Reviews.insertMany(reviews_data['reviews']);
      console.log("✅ Reviews inserted.");
    } else {
      console.log(`🟢 ${reviewCount} reviews already exist.`);
    }

    if (dealerCount === 0) {
      console.log("🟡 No dealers found. Inserting...");
      await Dealerships.insertMany(dealerships_data['dealerships']);
      console.log("✅ Dealers inserted.");
    } else {
      console.log(`🟢 ${dealerCount} dealers already exist.`);
    }
  } catch (err) {
    console.error("❌ Error initializing DB:", err.message);
  }
});

// Routes

app.get('/', (req, res) => {
  res.send("Welcome to the Mongoose API");
});

app.get('/fetchReviews', async (req, res) => {
  try {
    const documents = await Reviews.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

app.get('/fetchReviews/dealer/:id', async (req, res) => {
  try {
    const documents = await Reviews.find({ dealership: parseInt(req.params.id) });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reviews' });
  }
});

app.get('/fetchDealers', async (req, res) => {
  try {
    const dealers = await Dealerships.find();
    res.json(dealers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealerships' });
  }
});

app.get('/fetchDealers/:state', async (req, res) => {
  try {
    const dealers = await Dealerships.find({ state: req.params.state });
    res.json(dealers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealers by state' });
  }
});

app.get('/fetchDealer/:id', async (req, res) => {
  try {
    const dealer = await Dealerships.findOne({ id: parseInt(req.params.id) });
    res.json(dealer);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealer by id' });
  }
});

app.post('/insert_review', express.raw({ type: '*/*' }), async (req, res) => {
  const data = JSON.parse(req.body);
  const documents = await Reviews.find().sort({ id: -1 });
  const new_id = documents.length > 0 ? documents[0]['id'] + 1 : 1;

  const review = new Reviews({
    id: new_id,
    name: data['name'],
    dealership: data['dealership'],
    review: data['review'],
    purchase: data['purchase'],
    purchase_date: data['purchase_date'],
    car_make: data['car_make'],
    car_model: data['car_model'],
    car_year: data['car_year'],
  });

  try {
    const savedReview = await review.save();
    res.json(savedReview);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error inserting review' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});