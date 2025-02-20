import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 12px;
  backdrop-filter: blur(8px);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  margin-bottom: 20px; /* Add space between Overview and Add Transaction box */
`;

interface BalanceProps {
  balance: number;
}

export const Balance = styled.h2<BalanceProps>`
  font-weight: 600;
  font-size: 22px;
  color: #ddd;
  text-shadow: 0px 0px 8px rgba(255, 255, 255, 0.2);
  margin-right: 15px; /* Adds space between balance and button */

  & span {
    font-weight: bold;
    font-size: 26px;
    color: ${(props) => (props.balance >= 0 ? "#4CAF50" : "#FF5252")}; /* Green if positive, Red if negative */
    text-shadow: 0px 0px 10px ${(props) => (props.balance >= 0 ? "rgba(76, 175, 80, 0.7)" : "rgba(255, 82, 82, 0.7)")};
  }
`;

export const AddBtn = styled.button`
  cursor: pointer;
  background: linear-gradient(135deg, #4CAF50, #2E7D32);
  color: white;
  padding: 12px 25px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 255, 0, 0.4);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #2E7D32, #1B5E20);
    transform: scale(1.05);
    box-shadow: 0px 6px 15px rgba(0, 255, 0, 0.6);
  }
`;
