const express = require('express');
const { app } = require('./src/app');



const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {// Initialize database connection
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
};

startServer();