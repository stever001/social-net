const express = require('express');
const router = express.Router();

// Import the API routes aggregator
const apiRoutes = require('./api');

// Setup the '/api' prefix and use the API routes
router.use('/api', apiRoutes);

// Catch-all route for when a request is made to an undefined route
router.use((req, res) => {
  res.status(404).send('Route Not Found!');
});

module.exports = router;



// const express = require('express');
// const router = express.Router();

// // Import API routes
// const apiRoutes = require('./api');

// // Set up API routes
// router.use('/.api', apiRoutes);

// // If you're also serving pages, you might have additional routes here
// // router.use('/views', viewRoutes);

// // Catch-all route for when a request is made to an undefined route
// router.use((req, res) => {
//   res.status(404).send('Wrong Route!');
// });

// module.exports = router;
