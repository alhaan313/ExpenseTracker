import React, { useState, useMemo } from "react";
import TransactionItem from "./TransactionItem";
import {
  Container,
  Heading,
  SearchInput,
  TransactionItems,
  NoTransactions,
} from "./TransactionsContainer.styles"; // Importing styles

// Define TypeScript types for props
interface Transaction {
  id: string;
  amount: number;
  details: string;
  transType: "expense" | "income";
}

interface Props {
  transactions: Transaction[];
  removeTransaction: (id: string) => void;
}

const TransactionsContainer: React.FC<Props> = ({ transactions, removeTransaction }) => {
  const [searchInput, setSearchInput] = useState<string>("");

  // Use `useMemo` to optimize filtering logic
  const filteredTransactions = useMemo(() => {
    if (!searchInput.trim()) return transactions;

    return transactions.filter((item) =>
      item.details.toLowerCase().includes(searchInput.toLowerCase().trim())
    );
  }, [transactions, searchInput]);

  return (
    <Container>
      <Heading>Transactions</Heading>

      <SearchInput
        type="text"
        placeholder="Search Transactions..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <TransactionItems>
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <TransactionItem
              transaction={transaction}
              key={transaction.id}
              removeTransaction={removeTransaction}
            />
          ))
        ) : (
          <NoTransactions>No Transactions Found</NoTransactions>
        )}
      </TransactionItems>
    </Container>
  );
};

export default TransactionsContainer;
