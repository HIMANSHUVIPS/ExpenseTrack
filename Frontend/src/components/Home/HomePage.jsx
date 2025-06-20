import React, { useContext, useEffect } from "react";
import styles from "./HomePage.module.css";
import { PieChart } from "react-minimal-pie-chart";
import axios from "axios";
import { UserStore } from "../../Store/Store";

const HomePage = () => {
  const {
    handleGetUserData,
    userData,
    handleFetchExpense,
    expenses,
    handleFetchIncome,
    income,
  } = useContext(UserStore);

  useEffect(() => {
    handleGetUserData();
    handleFetchExpense();
    handleFetchIncome();
  }, []);

  const totalIncome = income.reduce((acc, income) => acc + income.amount, 0);
  const totalExpense = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const balance = totalIncome - totalExpense;
  // incomes is comming from usecontext and amount is stored in database

  const grouped = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const pieData = Object.entries(grouped).map(([category, value], i) => ({
    title: category,
    value,
    color: [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
      '#9966FF', '#FF9F40', '#00C49F', '#FF6F91'
    ][i % 8]
  }));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Welcome, {userData?.name} 👋</h2>
        <p>Here’s a snapshot of your spending.</p>
      </div>

      <div className={styles.summary}>
        <div className={styles.card}>
          <h4>Total Balance</h4>
          <p className={styles.balance}>₹{balance.toFixed(2)}</p>
        </div>
        <div className={styles.card}>
          <h4>Income</h4>
          <p className={styles.income}>₹{totalIncome.toFixed(2)}</p>
        </div>
      </div>

      <div className={styles.lowerSection}>
        <div className={styles.transactions}>
          <h4>Recent Transactions</h4>
          <ul>
            {expenses.slice(0,5).map((item)=>(
              <li key={item._id}>
                <span>{item.category}</span>
                <span className={styles.negative}>- ₹{item.amount}</span>
              </li>
            ))}
            {income.slice(0,5).map((item)=>(
              <li key={item._id}>
                <span>{item.category}</span>
                <span className={styles.positive}>+ ₹{item.amount}</span>
              </li>
            ))}
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
                fontSize: "7px",
                fill: "#36454F",
                fontWeight: 700,
                fontFamily:'cursive'
              }}
              labelPosition={80}
              radius={50}
            />
          </div>

          <div className={styles.legend}>
            {pieData.map((item, idx) => (
              <div key={idx} className={styles.legendItem}>
                <span
                  className={styles.colorDot}
                  style={{ backgroundColor: item.color }}
                ></span>
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
