import * as React from "react";
import styled from "styled-components";

interface StepStatusProps {
  className?: string;
}

const StepStatus = ({ className }: StepStatusProps) => {
  return <div className={className}>stepping </div>;
};

const StyledStepStatus = styled(StepStatus)`
  width: 274px;
  height: 100%;
  background-color: ${(props) => props.theme.colors.colorPurple};
  border-radius: 10px;
  padding: 40px 32px;
`;

export default StyledStepStatus;
