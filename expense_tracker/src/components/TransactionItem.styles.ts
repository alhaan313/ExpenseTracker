import styled from "styled-components";

export const Item = styled.div<{ isExpense: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(0, 255, 0, 0.2);
  background-color: rgba(20, 20, 20, 0.9);
  border-radius: 8px;
  padding: 12px 18px;
  border-right: 6px solid ${(props) => (props.isExpense ? "#ff5252" : "#44e610")};
  margin-bottom: 12px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0px 4px 10px rgba(0, 255, 0, 0.1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    transform: scale(0.98);
    box-shadow: 0px 6px 14px rgba(0, 255, 0, 0.15);
  }
`;

export const RemoveButton = styled.button`
  background-color: #44e610;
  color: black;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #3adb76;
    box-shadow: 0px 0px 10px rgba(68, 230, 16, 0.6);
    transform: scale(1.05);
  }
`;
