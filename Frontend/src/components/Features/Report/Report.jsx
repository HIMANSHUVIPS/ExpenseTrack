import React, { useContext, useRef, useState } from "react";
import styles from "./Report.module.css";
import { UserStore } from "../../../Store/Store";
import { FiDownload, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Report = () => {
  const { expenses = [], income = [] } = useContext(UserStore);
  const [activeTab, setActiveTab] = useState("all");

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
  const netSavings = totalIncome - totalExpense;

  const reportRef = useRef();
  const handleDownloadPDF = async () => {
    const element = reportRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true, 
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Expenzo_Report.pdf");
  };
  const transactions = [
    ...income.map((item) => ({ ...item, type: "income" })),
    ...expenses.map((item) => ({ ...item, type: "expense" })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const filtered =
    activeTab === "all"
      ? transactions
      : activeTab === "income"
      ? transactions.filter((t) => t.type === "income")
      : transactions.filter((t) => t.type === "expense");

  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  return (
    <div className={styles.container} ref={reportRef}>
      <div className={styles.header}>
        <h1 className={styles.title}>Financial Insights</h1>
        <p className={styles.subtitle}>{currentMonth}'s Report</p>
      </div>

      <div className={styles.controls}>
        <button className={styles.exportBtn} onClick={handleDownloadPDF}>
          <FiDownload className={styles.exportIcon} />
          Export Report
        </button>
      </div>

      <div className={styles.summaryCards}>
        <SummaryCard
          icon="💰"
          label="Total Income"
          value={totalIncome}
          trend="+12%"
          type="up"
        />
        <SummaryCard
          icon="💸"
          label="Total Expense"
          value={totalExpense}
          trend="-5%"
          type="down"
        />
        <SummaryCard
          icon="🏦"
          label="Net Savings"
          value={netSavings}
          trend="+18%"
          type="up"
        />
      </div>

      <div className={styles.transactionSection}>
        <div className={styles.sectionHeader}>
          <h3>Transactions</h3>
          <div className={styles.tabs}>
            {["all", "income", "expense"].map((tab) => (
              <button
                key={tab}
                className={`${styles.tab} ${
                  activeTab === tab ? styles.active : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.transactionTable}>
          <div className={styles.tableHeader}>
            <span>Date</span>
            <span>Category</span>
            <span>Description</span>
            <span>Amount</span>
          </div>

          <div className={styles.tableBody}>
            {filtered.map((item) => (
              <div key={item._id} className={styles.tableRow}>
                <span>{new Date(item.date).toLocaleDateString()}</span>
                <span>
                  <span
                    className={`${styles.categoryBadge} ${
                      item.type === "income"
                        ? styles.incomeBadge
                        : styles.expenseBadge
                    }`}
                  >
                    {item.category}
                  </span>
                </span>
                <span>{item.description}</span>
                <span
                  className={`${styles.amountCell} ${
                    item.type === "income"
                      ? styles.incomeAmount
                      : styles.expenseAmount
                  }`}
                >
                  {item.type === "income" ? "+" : "-"}₹{item.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ icon, label, value, trend, type }) => (
  <div
    className={`${styles.card} ${
      type === "up" ? styles.incomeCard : styles.expenseCard
    }`}
  >
    <div className={styles.cardIcon}>{icon}</div>
    <div>
      <h4>{label}</h4>
      <p className={styles.amount}>₹{value.toFixed(2)}</p>
      <p className={styles.trend}>
        {type === "up" ? <FiTrendingUp /> : <FiTrendingDown />} {trend}
      </p>
    </div>
  </div>
);

export default Report;
