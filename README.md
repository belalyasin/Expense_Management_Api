# Expense Management API

## Overview

The **Expense Management API** provides a comprehensive solution for managing expenses, user income, and categories. It supports user authentication, expense tracking, and statistical analysis for better financial management.

---

## Features
- **User Authentication**: Register, log in, and log out securely.
- **Expense Management**: Create, update, and retrieve expenses.
- **Monthly Statistics**: Get total expenses, remaining income, and average daily expenses for the current or specified month.
- **Category Management**: Organize expenses by categories.
- **Detailed Insights**: Retrieve expense type statistics for a specified period.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/belalyasin/Expense_Management_Api.git
   cd Expense_Management_Api
2. Install dependencies:
      ```bash
      npm install
3. Set up the environment variables:
   - Create a .env file in the root directory.
   - Add the following variables:
      ```bash
         - PORT=3000
         - MONGO_URI=your_mongodb_connection_string
         - JWT_KEY=your_jwt_secret_key
4. Start the server:
      ```bash
       npm start
