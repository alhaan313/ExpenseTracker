import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import AddTransaction from "./AddTransaction";
import OverviewComponent from "./OverviewComponent";
import TransactionsContainer from "./TransactionsContainer";
import { Container, TransactionDetails, THeading, ExpenseBox, IncomeBox } from "./Tracker.styles";

// Define TypeScript types for transaction objects
export interface Transaction {
  id: string;
  amount: number;
  details: string;
  transType: "expense" | "income";
}

const Tracker: React.FC = () => {
  const { logout } = useAuth();
  const [toggle, setToggle] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [expense, setExpense] = useState<number>(0);
  const [income, setIncome] = useState<number>(0);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Stored Token:", token);  // ✅ Check if token is available

      if (!token) {
        console.error("No token found! Authorization might fail.");
        return;
      }

      const response = await axios.get("http://localhost:5000/transactions/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Fetched Transactions:", response.data); // ✅ Debug response

      if (Array.isArray(response.data)) {
          setTransactions(response.data);
      } else {
          console.error("Unexpected API Response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
};



const AddTransactions = async (payload: Omit<Transaction, "id">) => {
    try {
      const token = localStorage.getItem("token");
  
      const response = await axios.post("http://localhost:5000/transactions/add", payload, { 
        headers: { Authorization: `Bearer ${token}` },
      });
  
      await fetchTransactions(); // Refresh state after adding
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
};


  

const removeTransaction = async (id: string) => {
    try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/transactions/${id}`, { 
            headers: { Authorization: `Bearer ${token}` },
        });

        setTransactions((prev) => prev.filter((transaction) => transaction.id !== id));
    } catch (error) {
        console.error("Error deleting transaction");
    }
};


  const calculateTransactions = () => {
    let exp = 0;
    let inc = 0;
    transactions.forEach((item) => {
      item.transType === "expense" ? (exp += item.amount) : (inc += item.amount);
    });
    setExpense(exp);
    setIncome(inc);
  };

  useEffect(() => {
    let exp = 0;
    let inc = 0;
  
    transactions.forEach((item) => {
      item.transType === "expense" ? (exp += item.amount) : (inc += item.amount);
    });
  
    setExpense(exp);
    setIncome(inc);
  }, [transactions]);  // Dependency added
  
  return (
    <Container>
      <THeading>Expense Tracker</THeading>

      <OverviewComponent toggle={toggle} setToggle={setToggle} expense={expense} income={income} />

      {toggle && <AddTransaction setToggle={setToggle} AddTransactions={AddTransactions} />}

      <TransactionDetails>
        <ExpenseBox isExpense>
          Expense <span>₹{expense}</span>
        </ExpenseBox>

        <IncomeBox>
          Budget <span>₹{income}</span>
        </IncomeBox>
      </TransactionDetails>

      <TransactionsContainer transactions={transactions} removeTransaction={removeTransaction} />
      <button onClick={logout} style={{ padding: "10px", marginTop: "20px", cursor: "pointer" }}>
        Logout
      </button>
    </Container>
  );
};

export default Tracker;
