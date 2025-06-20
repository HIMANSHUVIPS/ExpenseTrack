import React, { useEffect } from 'react';
import styles from './HomePage.module.css';
import { PieChart } from 'react-minimal-pie-chart';
import axios from 'axios';

const HomePage = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const userName = 'Himanshu';

  const pieData = [
    { title: 'Shopping', value: 30, color: '#FF6384' },
    { title: 'Food', value: 25, color: '#36A2EB' },
    { title: 'Entertainment', value: 20, color: '#FFCE56' },
    { title: 'Utilities', value: 15, color: '#4BC0C0' },
    { title: 'Other', value: 10, color: '#9966FF' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Welcome, {userName} 👋</h2>
        <p>Here’s a snapshot of your spending.</p>
      </div>

      <div className={styles.summary}>
        <div className={styles.card}>
          <h4>Total Balance</h4>
          <p className={styles.balance}>$5,200.00</p>
        </div>
        <div className={styles.card}>
          <h4>Income</h4>
          <p className={styles.income}>$7,800.00</p>
        </div>
      </div>

      <div className={styles.lowerSection}>
        <div className={styles.transactions}>
          <h4>Recent Transactions</h4>
          <ul>
            <li><span>🍽️ Food & Dining</span><span className={styles.negative}>- $120.00</span></li>
            <li><span>💼 Salary</span><span className={styles.positive}>+ $3,000.00</span></li>
            <li><span>🛍️ Shopping</span><span className={styles.negative}>- $75.00</span></li>
            <li><span>💡 Utilities</span><span className={styles.negative}>- $200.00</span></li>
          </ul>
        </div>

        <div className={styles.chart}>
          <h4>Spending Overview</h4>
          <div className={styles.pieWrapper}>
            <PieChart
              data={pieData}
              animate
              lineWidth={40}
              label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
              labelStyle={{
                fontSize: '6px',
                fill: '#fff',
                fontWeight: 700,
              }}
              labelPosition={65}
              radius={42}
            />
          </div>

          <div className={styles.legend}>
            {pieData.map((item, idx) => (
              <div key={idx} className={styles.legendItem}>
                <span className={styles.colorDot} style={{ backgroundColor: item.color }}></span>
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;