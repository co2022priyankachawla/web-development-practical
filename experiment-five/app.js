import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
const [expense, setExpense] = useState({
title: "",
amount: ""
});
const [expenses, setExpenses] = useState([]);
const handleChange = (e) => {

const { name, value } = e.target;
setExpense((prev) => ({ ...prev, [name]: value }));
};

const handleSubmit = (e) => {
e.preventDefault();
if (!expense.title || !expense.amount) return;

setExpenses([...expenses, {
...expense,
amount: parseFloat(expense.amount)
}]);
setExpense({ title: "", amount: "" });
};
const handleDelete = (indexToDelete) => {
const updatedExpenses = expenses.filter(
(_, index) => index !== indexToDelete
);
setExpenses(updatedExpenses);
};
const totalAmount = expenses.reduce(
(total, item) => total + item.amount,
0
);
return (

<div className="container d-flex justify-content-center align-items-
center min-vh-100 bg-light">

<div className="card shadow-lg p-4" style={{ width: "100%",
maxWidth: "500px" }}>
<h3 className="text-center mb-4 text-success">
Expense Tracker
</h3>
{/* Form */}
<form onSubmit={handleSubmit} className="mb-4">
<div className="mb-3">
<input
type="text"
name="title"
className="form-control"
placeholder="Expense Title (e.g., Groceries)"
value={expense.title}
onChange={handleChange}
/>
</div>

<div className="mb-3">
<input
type="number"
name="amount"
className="form-control"
placeholder="Amount"
value={expense.amount}
onChange={handleChange}

/>
</div>
<button type="submit" className="btn btn-success w-100">
Add Expense
</button>
</form>
{/* Total */}
<div className="alert alert-info text-center">
<strong>Total: </strong> ₹ {totalAmount.toFixed(2)}
</div>

{/* Expense List */}
{expenses.length === 0 ? (
<p className="text-muted text-center">No expenses added yet.</p>
) : (
<ul className="list-group">
{expenses.map((item, index) => (
<li
key={index}

className="list-group-item d-flex justify-content-between align-
items-center"

>
<div>
<strong>{item.title}</strong> <br />
<small>₹ {item.amount}</small>
</div>
<button

className="btn btn-sm btn-danger"
onClick={() => handleDelete(index)}
>
Delete
</button>
</li>
))}
</ul>
)}
</div>
</div>
)};
export default App;
