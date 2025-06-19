import React from 'react';
import styles from './AddIncome.module.css';

const AddIncome = () => {
  const incomeCategories = [
    { id: 1, name: 'Salary', icon: '💰' },
    { id: 2, name: 'Freelance', icon: '💼' },
    { id: 3, name: 'Donation', icon: '🎁' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Add Income</h2>
        <p>Track your earnings to grow your savings</p>
      </div>

      <div className={styles.formContainer}>
        {/* Amount Field */}
        <div className={styles.formGroup}>
          <label>Amount</label>
          <div className={styles.amountInput}>
            <span>$</span>
            <input
              type="number"
              placeholder="0.00"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Description</label>
          <input
            type="text"
            placeholder="Client project for XYZ Company website redesign"
            className={styles.input}
            id={styles.placeholder}
          />
        </div>

        {/* Category Selection */}
        <div className={styles.formGroup}>
          <label>Category</label>
          <div className={styles.categoryGrid}>
            {incomeCategories.map((category) => (
              <button
                key={category.id}
                className={styles.categoryButton}
              >
                <span className={styles.categoryIcon}>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Date Field */}
        <div className={styles.formGroup}>
          <label>Date</label>
          <input
            type="date"
            className={styles.input}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton}>Cancel</button>
          <button className={styles.submitButton}>Add Income</button>
        </div>
      </div>
    </div>
  );
};

export default AddIncome;