import React from 'react';
import styles from './AddExpense.module.css';

const AddExpense = () => {
  const categories = [
    { id: 1, name: '🍔 Food', icon: '🍔' },
    { id: 2, name: '🛒 Shopping', icon: '🛒' },
    { id: 3, name: '🚗 Transportation', icon: '🚗' },
    { id: 4, name: '🏠 Housing', icon: '🏠' },
    { id: 5, name: '💡 Utilities', icon: '💡' },
    { id: 6, name: '🎉 Entertainment', icon: '🎉' },
    { id: 7, name: '🏥 Healthcare', icon: '🏥' },
    { id: 8, name: '✈️ Travel', icon: '✈️' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Add New Expense</h2>
        <p>Track your spending to stay on budget</p>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label htmlFor="amount">Amount</label>
          <div className={styles.amountInput}>
            <span>$</span>
            <input
              type="number"
              id="amount"
              placeholder="0.00"
              className={styles.input}
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
          />
        </div>

        <div className={styles.formGroup}>
          <label>Category</label>
          <div className={styles.categoryGrid}>
            {categories.map((category) => (
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

        <div className={styles.formGroup}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            className={styles.input}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton}>Cancel</button>
          <button className={styles.submitButton}>Add Expense</button>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;