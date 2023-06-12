import * as React from "react";
import styled from "styled-components";

interface FormProps {
  className?: string;
  children: React.ReactNode;
  onSubmit: () => void;
}

const Form = ({ className, children, onSubmit }: FormProps) => {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={submitHandler} className={className}>
      {children}
    </form>
  );
};

const StyledForm = styled(Form)`
  padding: 40px;
  width: 100%;
  height: 100%;
`;

export default StyledForm;
