# social-net
Module 18 NoSQL Challenge: Social Network API

social-network-api/
│
├── config/
│   └── mongoose.js
│
├── controllers/
│   ├── thoughtsController.js
│   └── usersController.js
│
├── models/
│   ├── Thought.js
│   ├── User.js
│   └── Reaction.js (this will be a subdocument in Thought.js)
│
├── routes/
│   ├── api/
│   │   ├── index.js
│   │   ├── thoughtRoutes.js
│   │   └── userRoutes.js
│   └── index.js
│
├── utils/
│   └── dateUtils.js
│
├── .env (for storing environment variables like DB connection string)
├── package.json
└── server.js
