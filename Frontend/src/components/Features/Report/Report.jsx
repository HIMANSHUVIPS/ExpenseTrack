import React, { useState } from 'react';
import styles from './Report.module.css';
import { FiDownload, FiTrendingUp, FiTrendingDown, FiDollarSign, FiPieChart, FiFilter, FiPlus } from 'react-icons/fi';

const Report = () => {
  const userName = 'Himanshu';
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const [activeTab, setActiveTab] = useState('expenses');
  const [timeFilter, setTimeFilter] = useState('month');

  // Sample data
  const expenses = [
    { id: 1, date: '2023-06-15', category: 'Food & Dining', description: 'Dinner with friends', amount: 85.50, type: 'expense' },
    { id: 2, date: '2023-06-14', category: 'Transportation', description: 'Monthly metro pass', amount: 120.00, type: 'expense' },
    { id: 3, date: '2023-06-12', category: 'Shopping', description: 'New headphones', amount: 199.99, type: 'expense' },
    { id: 4, date: '2023-06-10', category: 'Utilities', description: 'Electricity bill', amount: 75.30, type: 'expense' },
    { id: 5, date: '2023-06-05', category: 'Entertainment', description: 'Movie tickets', amount: 32.00, type: 'expense' }
  ];

  const income = [
    { id: 1, date: '2023-06-30', category: 'Salary', description: 'Monthly salary', amount: 4500.00, type: 'income' },
    { id: 2, date: '2023-06-25', category: 'Freelance', description: 'Website project', amount: 1200.00, type: 'income' },
    { id: 3, date: '2023-06-20', category: 'Investment', description: 'Dividends', amount: 350.50, type: 'income' },
    { id: 4, date: '2023-06-10', category: 'Bonus', description: 'Performance bonus', amount: 500.00, type: 'income' },
    { id: 5, date: '2023-06-05', category: 'Other', description: 'Gift from family', amount: 200.00, type: 'income' }
  ];

  const allTransactions = [...expenses, ...income].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Financial Insights</h1>
        <p className={styles.subtitle}>{currentMonth}'s Report for {userName}</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.timeFilters}>
          <button 
            className={`${styles.timeFilter} ${timeFilter === 'week' ? styles.active : ''}`}
            onClick={() => setTimeFilter('week')}
          >
            Week
          </button>
          <button 
            className={`${styles.timeFilter} ${timeFilter === 'month' ? styles.active : ''}`}
            onClick={() => setTimeFilter('month')}
          >
            Month
          </button>
          <button 
            className={`${styles.timeFilter} ${timeFilter === 'year' ? styles.active : ''}`}
            onClick={() => setTimeFilter('year')}
          >
            Year
          </button>
        </div>
        <button className={styles.exportBtn}>
          <FiDownload className={styles.exportIcon} />
          Export Report
        </button>
      </div>

      <div className={styles.summaryCards}>
        <div className={`${styles.card} ${styles.incomeCard}`}>
          <div className={styles.cardIcon}>💰</div>
          <div>
            <h4>Total Income</h4>
            <p className={styles.amount}>$11,200</p>
            <p className={styles.trend}><FiTrendingUp /> 12% from last month</p>
          </div>
        </div>
        
        <div className={`${styles.card} ${styles.expenseCard}`}>
          <div className={styles.cardIcon}>💸</div>
          <div>
            <h4>Total Expense</h4>
            <p className={styles.amount}>$5,800</p>
            <p className={styles.trend}><FiTrendingDown /> 5% from last month</p>
          </div>
        </div>
        
        <div className={`${styles.card} ${styles.savingsCard}`}>
          <div className={styles.cardIcon}>🏦</div>
          <div>
            <h4>Net Savings</h4>
            <p className={styles.amount}>$5,400</p>
            <p className={styles.trend}><FiTrendingUp /> 18% from last month</p>
          </div>
        </div>
      </div>

      <div className={styles.transactionSection}>
        <div className={styles.sectionHeader}>
          <h3>All Transactions</h3>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'all' ? styles.active : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'income' ? styles.active : ''}`}
              onClick={() => setActiveTab('income')}
            >
              Income
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'expenses' ? styles.active : ''}`}
              onClick={() => setActiveTab('expenses')}
            >
              Expenses
            </button>
          </div>
        </div>

        <div className={styles.transactionTable}>
          <div className={styles.tableHeader}>
            <span className={styles.headerCell}>Date</span>
            <span className={styles.headerCell}>Category</span>
            <span className={styles.headerCell}>Description</span>
            <span className={styles.headerCell}>Amount</span>
          </div>
          
          <div className={styles.tableBody}>
            {(activeTab === 'all' ? allTransactions : 
              activeTab === 'income' ? income : expenses).map((transaction) => (
              <div key={transaction.id} className={styles.tableRow}>
                <span className={styles.cell}>{transaction.date}</span>
                <span className={styles.cell}>
                  <span className={`${styles.categoryBadge} ${transaction.type === 'income' ? styles.incomeBadge : styles.expenseBadge}`}>
                    {transaction.category}
                  </span>
                </span>
                <span className={styles.cell}>{transaction.description}</span>
                <span className={`${styles.cell} ${styles.amountCell} ${transaction.type === 'income' ? styles.incomeAmount : styles.expenseAmount}`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;