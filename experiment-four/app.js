import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
function App() {

const [items, setItems] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
useEffect(() => {
fetch("https://jsonplaceholder.typicode.com/posts")
.then((response) => response.json())
.then((data) => {
setItems(data);
setLoading(false);
})
.catch((error) => {
setError("Error fetching data");
setLoading(false);
})
}, []);
return (
<div className="App">
<h1>Fetched Items</h1>
{loading ? <p>Loading....</p> : error ? <p>{error}</p> : <ul>{items.map((item, index)
=> {
return <li key={index}>
<h3>{item.title ? item.title : "Comments"}</h3>
<p>{item.body}</p>
</li>
})}</ul>}
</div>
);
}
export default App;