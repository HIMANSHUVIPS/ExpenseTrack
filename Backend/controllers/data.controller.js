import Expense from "../models/expense.model.js";
import Income from "../models/income.model.js";
import user from "../models/user.model.js";

export const USER_DATA = async (req, res) => {
  try {
    const { id } = req.user;
    const USER = await user.findById(id).select("-password"); //exclude password
    if (!USER) {
      return res.status(400).json({
        success: false,
        message: "User not exists",
      });
    }
    res.status(200).json(USER);
  } catch (error) {
    console.error("USER_DATA error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const USER_EXPENSES = async (req, res) => {
  try {
    const { id } = req.user;
    const EXPENSE = await Expense.find({ user:id }).sort({ date: -1 });
    res.status(200).json({ success: true, expenses:EXPENSE });
  } catch (error) {
    console.error("USER_EXPENSES error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const USER_INCOMES = async (req, res) => {
  try {
    const { id } = req.user;
    const INCOME = await Income.find({ user : id }).sort({ date: -1 });
    res.status(200).json({ success: true, incomes:INCOME });
  } catch (error) {
    console.error("USER_INCOMES error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
