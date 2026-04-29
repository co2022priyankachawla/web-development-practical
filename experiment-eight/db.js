const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/demo')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ Connection Error:', err);
    process.exit(1);
  });
// Schema
const itemSchema = new mongoose.Schema({
  title: String,
  description: String
});
// Model
const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
