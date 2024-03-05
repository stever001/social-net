require('dotenv').config();
const mongoose = require('mongoose');
const { User, Thought } = require('./models');

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost/socialNetworkDB';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const users = [
  {
    username: 'lernantino',
    email: 'lernantino@gmail.com',
    thoughts: [],
    friends: [],
  },
  {
    username: 'janedoe',
    email: 'janedoe@example.com',
    thoughts: [],
    friends: [],
  },
];

const thoughts = [
  {
    thoughtText: 'Here is a cool thought...',
    username: 'lernantino',
    reactions: [],
  },
  {
    thoughtText: 'Another thought!',
    username: 'janedoe',
    reactions: [],
  },
];

const seedDB = async () => {
  await User.deleteMany({});
  await Thought.deleteMany({});

  await User.insertMany(users);
  await Thought.insertMany(thoughts);

  console.log('Database seeded!');
  process.exit(0);
};

seedDB().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
