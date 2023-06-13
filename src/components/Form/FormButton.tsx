import React from "react";
import styled from "styled-components";

type FormButtonProps = {
  text: string;
  onClick: () => void;
  secondary?: boolean;
  className?: string;
};

const FormButton = ({ className, text, onClick }: FormButtonProps) => {
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
};

const StyledFormButton = styled(FormButton)`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background-color: ${(props) => props.theme.colors.colorDenim};
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  padding: 16px 32px;
  ${(props) =>
    props.secondary &&
    `background-color: transparent; color: ${props.theme.colors.colorGray};padding: 16px 0;`}
`;

export default StyledFormButton;
