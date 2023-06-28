import styled from "styled-components";
import Container from "../Container";

interface AddOnItemProps {
  className?: string;
  addon: string;
  price: string;
}

const AddOnItem = ({ className, addon, price }: AddOnItemProps) => {
  //   const { name, cost } = addon;

  return (
    <Container className={className} justify="space-between" align="center">
      <span>{addon}</span>
      <p>{price}</p>
    </Container>
  );
};

const StyledAddOnItem = styled(AddOnItem)`
  font-weight: normal;
  span {
    color: ${(props) => props.theme.colors.colorGray};
    font-weight: inherit;
  }
  p {
    color: ${(props) => props.theme.colors.colorDenim};
    font-weight: inherit;
  }
`;

export default StyledAddOnItem;
