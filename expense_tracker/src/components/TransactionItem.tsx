import React from "react";
import axios from "axios";
import { Item, RemoveButton } from "./TransactionItem.styles";

// Define TypeScript types for props
interface Transaction {
  id: string;
  amount: number;
  details: string;
  transType: "expense" | "income";
}

interface Props {
  transaction: Transaction;
  removeTransaction: (id: string) => void;
}

const TransactionItem: React.FC<Props> = ({ transaction, removeTransaction }) => {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
      
      await axios.delete(`${apiUrl}/transactions/${transaction.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      removeTransaction(transaction.id);
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Failed to delete transaction. Please try again.");
    }
  };

  return (
    <Item isExpense={transaction.transType === "expense"}>
      <span>{transaction.details}</span>
      <span>₹{transaction.amount}</span>
      <RemoveButton onClick={handleDelete}>Remove</RemoveButton>
    </Item>
  );
};

export default TransactionItem;
