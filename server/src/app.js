import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import fs from 'fs';
import userRouter from './routes/users.routes.js'
import teamRouter from './routes/team.routes.js'

const app = express();

app.use(bodyParser.json());
app.use(cors());

const usersData = JSON.parse(fs.readFileSync('./heliverse_mock_data.json', 'utf-8'));

// Connect to MongoDB
mongoose.connect("mongodb+srv://huleshj:hulesh4201432@cluster0.lpkvsbc.mongodb.net/internship?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

// API endpoints

// Retrieve all users from MongoDB
// const userSchema = new mongoose.Schema({
//   id: Number,
//   first_name: String,
//   last_name: String,
//   email: String,
//   gender: String,
//   avatar: String,
//   domain: String,
//   available: Boolean
// });

// // Define user model
// const User = mongoose.model('Users', userSchema);

// // Retrieve paginated users from JSON data
// app.get('/api/users', (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;

//   const results = {};

//   if (endIndex < usersData.length) {
//     results.next = {
//       page: page + 1,
//       limit: limit
//     };
//   }

//   if (startIndex > 0) {
//     results.previous = {
//       page: page - 1,
//       limit: limit
//     };
//   }

//   results.results = usersData.slice(startIndex, endIndex);

//   res.json(results);
// });

app.use("/api",userRouter)
app.use("/api",teamRouter)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
