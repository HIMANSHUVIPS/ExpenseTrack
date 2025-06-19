import React, { useState } from 'react';
import styles from './AddIncome.module.css';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const AddIncome = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const incomeCategories = [
    { id: 1, name: 'Salary', icon: '💰' },
    { id: 2, name: 'Freelance', icon: '💼' },
    { id: 3, name: 'Donation', icon: '🎁' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${backendURL}/form/expenzo/add-income`,
        { amount, description, category, date },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          withCredentials: true
        }
      );
      toast.success(res.data.message || "Income added!");
      setAmount("");
      setDescription("");
      setCategory("");
      setDate("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add income");
    }
  };

  return (
    <div className={styles.container}>
      <Toaster />
      <div className={styles.header}>
        <h2>Add Income</h2>
        <p>Track your earnings to grow your savings</p>
      </div>

      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Amount</label>
          <div className={styles.amountInput}>
            <span>₹</span>
            <input
              type="number"
              placeholder="0.00"
              className={styles.input}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Description</label>
          <input
            type="text"
            placeholder="e.g. Freelance project"
            className={styles.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Category</label>
          <div className={styles.categoryGrid}>
            {incomeCategories.map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => setCategory(cat.name)}
                className={`${styles.categoryButton} ${category === cat.name ? styles.selected : ""}`}
              >
                <span className={styles.categoryIcon}>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Date</label>
          <input
            type="date"
            className={styles.input}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className={styles.buttonGroup}>
          <button type="button" className={styles.cancelButton} onClick={() => window.history.back()}>
            Cancel
          </button>
          <button type="submit" className={styles.submitButton}>
            Add Income
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddIncome;
