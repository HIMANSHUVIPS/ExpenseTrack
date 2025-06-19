import React, { useState } from 'react';
import styles from './AddExpense.module.css';
import axios from 'axios';
import { Toaster,toast } from 'react-hot-toast';
const AddExpense = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const categories = [
    { id: 1, name: 'Food', icon: '🍔' },
    { id: 2, name: 'Shopping', icon: '🛒' },
    { id: 3, name: 'Transportation', icon: '🚗' },
    { id: 4, name: 'Housing', icon: '🏠' },
    { id: 5, name: 'Utilities', icon: '💡' },
    { id: 6, name: 'Entertainment', icon: '🎉' },
    { id: 7, name: 'Healthcare', icon: '🏥' },
    { id: 8, name: 'Travel', icon: '✈️' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backendURL}/form/expenzo/add-expense`,
        { amount, description, category, date },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials:true
        }
      );
      toast.success(response.data.message||"Expense added successfully!");
      // Clear form
      setAmount("");
      setDescription("");
      setCategory("");
      setDate("");
    } catch (error) {
      console.error(error);
     toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className={styles.container}>
      <Toaster/>
      <div className={styles.header}>
        <h2>Add New Expense</h2>
        <p>Track your spending to stay on budget</p>
      </div>

      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="amount">Amount</label>
          <div className={styles.amountInput}>
            <span>₹</span>
            <input
              type="number"
              id="amount"
              placeholder="0.00"
              className={styles.input}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="What was this expense for?"
            className={styles.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Category</label>
          <div className={styles.categoryGrid}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`${styles.categoryButton} ${category === cat.name ? styles.selected : ''}`}
                onClick={() => setCategory(cat.name)}
              >
                <span className={styles.categoryIcon}>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            className={styles.input}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button type="button" className={styles.cancelButton} onClick={() => window.history.back()}>
            Cancel
          </button>
          <button type="submit" className={styles.submitButton}>
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;
