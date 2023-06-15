import { useState } from "react";
import styled from "styled-components";

interface InputProps {
  label: string;
  placeHolder: string;
  id: string;
  type?: "text" | "email" | "phonenumber";
  value?: string;
  error?: string;
  callback: (id: string, value: string) => void;
  className?: string;
}

const Input = ({
  label,
  placeHolder,
  id,
  type,
  value,
  error,
  callback,
  className,
}: InputProps) => {
  const [inputValue, setInputValue] = useState(value);

  return (
    <div className={className}>
      {error}
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        placeholder={placeHolder}
        typeof={type}
        value={inputValue}
        onChange={(e) => {
          callback(id, e.target.value);
          setInputValue(e.target.value);
        }}
      />
    </div>
  );
};

const StyledInput = styled(Input)`
  display: inline-flex;
  flex-direction: column;
  label {
    font-size: 14px;
    margin-bottom: 8px;
  }
  input {
    padding: 8px 12px;
    font-size: 16px;
    color: ${(props) => props.theme.colors.colorDenim};
    border: 1px solid ${(props) => props.theme.colors.inputBorder};
    border-radius: 8px;
    min-height: 48px;
    width: 100%;
    display: flex;
    &:placeholder {
      color: ${(props) => props.theme.colors.colorGray};
    }
    &:focus {
      outline: none !important;
      border: 1px solid ${(props) => props.theme.colors.colorPurple};
    }
  }

  &.error {
    input {
      border: 1px solid ${(props) => props.theme.colors.colorRed};
    }
  }
`;

export default StyledInput;
