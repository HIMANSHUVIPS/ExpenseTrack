import OpenAI from "openai";
import Expense from "../models/expense.model.js";
import Income from "../models/income.model.js";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const getRefinedDiscription = async (description) => {
  try {
    const prompt = `
You are a smart financial assistant helping users clean up and refine their transaction descriptions.

Rewrite the following text in a clear, professional, and concise way. Do not change the meaning. It can be either an income or expense — just improve the wording.

Input: "salary jan"
Output: "January Salary"

Input: "dad gave money"
Output: "Received money from father"

Input: "Bought some stuff from Amazon lol"
Output: "Purchased items from Amazon"

Now refine this:
"${description}"
`;
    const aiResponse = await openai.chat.completions.create({
      model: "openai/gpt-3.5-turbo", // Use a reliable model
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });
    const content = aiResponse.choices[0].message.content;
    return content;

  } catch (error) {
    console.log(error);
  }
};

export const ADD_EXPENSE = async (req, res) => {
  const { amount, description, category, date } = req.body;
  const { id } = req.user;

  try {
   const refinedDescription = await getRefinedDiscription(description);
    const newExpense = new Expense({
      user: id,
      amount,
      description: refinedDescription,
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
  const refinedDescription = await getRefinedDiscription(description);
  const { id } = req.user;

  try {
    const newIncome = new Income({
      user: id,
      amount,
      description:refinedDescription,
      category,
      date,
    });

    await newIncome.save();

    res.status(201).json({
      success: true,
      message: "Income added successfully!",
      income: newIncome,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while adding income",
      error: error.message,
    });
  }
};
