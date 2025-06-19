import React from 'react';
import styles from './Report.module.css';

const ReportPage = () => {
  const userName = 'Himanshu';
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Financial Insights</h1>
        <p className={styles.subtitle}>{currentMonth}'s Report for {userName}</p>
      </div>

      <div className={styles.summaryCards}>
        <div className={`${styles.card} ${styles.incomeCard}`}>
          <div className={styles.cardIcon}>💰</div>
          <div>
            <h4>Total Income</h4>
            <p className={styles.amount}>$11,200</p>
            <p className={styles.trend}>↑ 12% from last month</p>
          </div>
        </div>
        
        <div className={`${styles.card} ${styles.expenseCard}`}>
          <div className={styles.cardIcon}>💸</div>
          <div>
            <h4>Total Expense</h4>
            <p className={styles.amount}>$5,800</p>
            <p className={styles.trend}>↓ 5% from last month</p>
          </div>
        </div>
        
        <div className={`${styles.card} ${styles.savingsCard}`}>
          <div className={styles.cardIcon}>🏦</div>
          <div>
            <h4>Net Savings</h4>
            <p className={styles.amount}>$5,400</p>
            <p className={styles.trend}>↑ 18% from last month</p>
          </div>
        </div>
      </div>

      <div className={styles.exportSection}>
        <h3>Export Report</h3>
        <p>Download your financial data for further analysis</p>
        <div className={styles.exportButtons}>
          <button className={styles.exportBtn}>
            <span className={styles.btnIcon}>📄</span>
            <span>PDF Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;