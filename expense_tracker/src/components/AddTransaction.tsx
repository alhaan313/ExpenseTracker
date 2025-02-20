import { useState } from "react";
import type { Transaction } from "./Tracker";
import { 
  Container, 
  Input, 
  ButtonContainer, 
  TypeButton, 
  SubmitBtn 
} from "./AddTransaction.styles";

interface AddTransactionProps {
  setToggle: (value: boolean) => void;
  AddTransactions: (payload: Omit<Transaction, "id">) => Promise<void>;
}

const AddTransaction: React.FC<AddTransactionProps> = ({ setToggle, AddTransactions }) => {
  const [amount, setAmount] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [transType, setTransType] = useState<"expense" | "income">("expense");

  const AddTransactionData = async () => {
    if (!amount || !details) return;

    try {
      await AddTransactions({
        amount: Number(amount),
        details,
        transType,
      });

      setToggle(false);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
      <Container>
      <Input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <Input
        type="text"
        placeholder="Enter Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />

      <ButtonContainer>
        <TypeButton active={transType === "expense"} onClick={() => setTransType("expense")}>
          Expense
        </TypeButton>
        <TypeButton active={transType === "income"} onClick={() => setTransType("income")}>
          Income
        </TypeButton>
      </ButtonContainer>

      <SubmitBtn onClick={AddTransactionData}>Add Transaction</SubmitBtn>

    </Container>
  );
};


export default AddTransaction;
