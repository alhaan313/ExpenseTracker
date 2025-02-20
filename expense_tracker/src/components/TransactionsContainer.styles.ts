// TransactionsContainer.styles.ts
import styled from "styled-components";

export const Container = styled.div`
  background: rgba(20, 20, 20, 0.85);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 255, 0, 0.1);
  margin-top: 20px;
  color: #ffffff;
`;

export const Heading = styled.h2`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 15px;
  color: #b2f5ea;
  text-shadow: 0px 0px 8px rgba(178, 245, 234, 0.5);
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 18px;
  outline: none;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 16px;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    border-color: #44e610;
    box-shadow: 0px 0px 10px rgba(68, 230, 16, 0.5);
  }
`;

export const TransactionItems = styled.div`
  margin-top: 15px;
  max-height: 300px;
  overflow-y: auto;
`;

export const NoTransactions = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
  margin-top: 20px;
`;
