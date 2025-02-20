import { Container, Balance, AddBtn } from "./OverviewComponent.styles";

interface OverviewComponentProps {
  toggle: boolean;
  setToggle: (value: boolean) => void;
  income: number;
  expense: number;
}

const OverviewComponent: React.FC<OverviewComponentProps> = ({ toggle, setToggle, income, expense }) => {
  const bal = income - expense;

  return (
    <Container>
      <Balance balance={bal}>
        Balance: <span>₹{bal}</span>
      </Balance>
      <AddBtn onClick={() => setToggle(!toggle)}>
        {toggle ? "Cancel" : "Add"}
      </AddBtn>
    </Container>
  );
};

export default OverviewComponent;
