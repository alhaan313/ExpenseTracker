import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  max-width: 100%;
  background: rgba(10, 10, 10, 0.9);
  border-radius: 12px;
  padding: 30px 25px;
  box-shadow: 0px 8px 20px rgba(0, 255, 0, 0.1);
  border: 1px solid rgba(0, 255, 0, 0.2);
  color: #d0f5c0;
  margin: 20px auto;
  backdrop-filter: blur(8px);
`;

export const TransactionDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
`;

export const THeading = styled.div`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #6af76a;
  text-shadow: 0px 0px 12px rgba(106, 247, 106, 0.6);
`;

export const ExpenseBox = styled.div<{ isExpense?: boolean }>`
  flex: 1;
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 8px;
  padding: 15px 20px;
  background: rgba(20, 20, 20, 0.8);
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  box-shadow: 0px 4px 15px rgba(0, 255, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 18px rgba(0, 255, 0, 0.2);
  }

  & span {
    font-weight: bold;
    font-size: 26px;
    display: block;
    margin-top: 5px;
    color: ${(props) => (props.isExpense ? "#ff6961" : "#3adb76")};
    text-shadow: 0px 0px 10px ${(props) =>
      props.isExpense ? "rgba(255, 105, 97, 0.6)" : "rgba(58, 219, 118, 0.6)"};
  }
`;

export const IncomeBox = styled(ExpenseBox)``;
