const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Mongo Error:", err));

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  phone: String,
  website: String,
  company: {
    name: String,
    slogan: String,
  },
  profileImage: String,
});

const User = mongoose.model('User', UserSchema);

// ✅ Route to fetch users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
});

// ✅ Optional route to seed users
app.get('/api/users/seed', async (req, res) => {
  try {
    await User.deleteMany(); // Clear previous data

    const sampleUsers = [
      {
        name: "John Doe",
        email: "john@example.com",
        address: "123 Main St",
        phone: "123-456-7890",
        website: "johndoe.com",
        company: { name: "Doe Inc", slogan: "We Do It!" },
        profileImage: "https://randomuser.me/api/portraits/men/1.jpg"
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        address: "456 Side St",
        phone: "987-654-3210",
        website: "janesmith.com",
        company: { name: "Smith Co", slogan: "Smarter Solutions" },
        profileImage: "https://randomuser.me/api/portraits/women/2.jpg"
      }
    ];

    await User.insertMany(sampleUsers);
    res.json({ message: "Users seeded!" });
  } catch (error) {
    console.error("Seed error:", error);
    res.status(500).json({ error: "Error seeding users" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
