const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/LeaderBoard', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connected!');
});

const leaderboardSchema = new mongoose.Schema({
  team: String,
  gamesPlayed: Number,
  rank: Number,
  score: Number,
  avatar: String
}, { collection: 'team' });

const Leaderboard = mongoose.model('team', leaderboardSchema);
// API route to fetch leaderboard data
app.get('/api/leaderboards', async (req, res) => {
  try {
    const leaderboards = await Leaderboard.find();
    res.json(leaderboards);
  } catch (error) {
    console.error('Error fetching leaderboards:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
