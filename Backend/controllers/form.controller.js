import Expense from "../models/expense.model.js";
import Income from "../models/income.model.js";

export const ADD_EXPENSE = async (req, res) => {
  const { amount, description, category, date } = req.body;
  const { id } = req.user; 

  try {
    const newExpense = new Expense({
      user: id,
      amount,
      description,
      category,
      date,
    });

    await newExpense.save();

    res.status(201).json({
      success: true,
      message: "Expense added successfully!",
      expense: newExpense,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const ADD_INCOME = async (req, res) => {
  const { amount, description, category, date } = req.body;
  const { id } = req.user; 

  try {
    const newIncome = new Income({
      user: id,
      amount,
      description,
      category,
      date
    });

    await newIncome.save();

    res.status(201).json({
      success: true,
      message: "Income added successfully!",
      income: newIncome
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while adding income",
      error: error.message
    });
  }
};