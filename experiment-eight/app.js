const Item = require('./db');
// Insert Data
const newItem = new Item({
  title: 'Laptop',
  description: 'This is a laptop item'
});
async function runApp() {
  try {
    // Save item
    await newItem.save();
    console.log('✅ Item saved successfully');
    // Fetch items
    const items = await Item.find();
    console.log('📦 Items in DB:');
    console.log(items);
  } catch (err) {
    console.error('❌ Error:', err);
  }
}
runApp();
