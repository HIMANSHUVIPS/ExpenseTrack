import React from 'react';
import styles from './AllExpense.module.css';

const AllExpense = () => {
  const expenses = [
    { id: 1, date: '2025-06-01', category: 'Food', description: 'Lunch at Cafe', amount: 12.5 },
    { id: 2, date: '2025-06-02', category: 'Transportation', description: 'Bus ticket', amount: 3.75 },
    { id: 3, date: '2025-06-03', category: 'Shopping', description: 'Groceries', amount: 45.0 },
    { id: 4, date: '2025-06-04', category: 'Entertainment', description: 'Movie night', amount: 15.0 },
    { id: 5, date: '2025-06-05', category: 'Utilities', description: 'Electricity bill', amount: 60.0 },
    { id: 6, date: '2025-06-06', category: 'Healthcare', description: 'Pharmacy', amount: 20.0 },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>All Expenses</h2>
        <p>Review your complete expense history</p>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount ($)</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.date}</td>
                <td>{expense.category}</td>
                <td>{expense.description}</td>
                <td className={styles.amount}>${expense.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllExpense;
