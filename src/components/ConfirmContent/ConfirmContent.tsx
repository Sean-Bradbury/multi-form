import styled from "styled-components";

const ConfirmContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  background-color: ${(props) => props.theme.colors.bgLightGray};
  border-radius: 8px;
  padding: 16px 24px;
  h3 {
    font-weight: 500;
  }
`;

export default ConfirmContent;
