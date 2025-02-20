import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 25px;
  backdrop-filter: blur(8px);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px;
  font-size: 16px;
  border-radius: 8px;
  margin: 10px 0;
  border: none;
  background: #111;
  color: #fff;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: inset 0px 0px 5px rgba(255, 255, 255, 0.1);

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  &:focus {
    background: #000;
    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.3);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px 0;
  gap: 10px;
`;

export const TypeButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: 0.3s ease;
  background: ${(props) => (props.active ? "#4CAF50" : "#222")};
  color: ${(props) => (props.active ? "#fff" : "#aaa")};
  box-shadow: ${(props) => (props.active ? "0px 0px 12px rgba(76, 175, 80, 0.7)" : "none")};

  &:hover {
    background: ${(props) => (props.active ? "#388E3C" : "#444")};
  }
`;

export const SubmitBtn = styled.button`
  background: linear-gradient(135deg, #4CAF50, #2E7D32);
  color: white;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: 0.3s ease;
  box-shadow: 0px 4px 10px rgba(0, 255, 0, 0.4);

  &:hover {
    background: linear-gradient(135deg, #2E7D32, #1B5E20);
    transform: scale(1.05);
    box-shadow: 0px 6px 15px rgba(0, 255, 0, 0.6);
  }
`;
