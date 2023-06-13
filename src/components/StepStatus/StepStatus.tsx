import * as React from "react";
import styled from "styled-components";

interface StepStatusProps {
  className?: string;
  currentStep: number;
}

const StepStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StepStatusStepGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: white;
`;

interface StepStatusNumberProps {
  active?: boolean;
}

const StepStatusNumber = styled.div<StepStatusNumberProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33px;
  height: 33px;
  border-radius: 50%;
  background-color: transparent;
  border: 1px solid white;
  font-size: 14px;
  font-weight: 700;
  transition: all 0.3s linear;
  ${(props) =>
    props.active &&
    `background-color: ${props.theme.colors.colorSkyBlue};
    border-color: ${props.theme.colors.colorSkyBlue};
    color: ${props.theme.colors.colorDemin};`};
`;

const StepStatusInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  gap: 5px;
  letter-spacing: 1px;
  span {
    font-size: 12px;
    color: ${(props) => props.theme.colors.colorLightBlue};
  }
  p {
    font-size: 14px;
    font-weight: 700;
    margin: 0;
  }
`;

const StepStatus = ({ className, currentStep }: StepStatusProps) => {
  return (
    <div className={className}>
      <StepStatusContainer>
        <StepStatusStepGroup>
          <StepStatusNumber active={currentStep === 1}>1</StepStatusNumber>
          <StepStatusInfo>
            <span>Step 1</span>
            <p>Your Info</p>
          </StepStatusInfo>
        </StepStatusStepGroup>
        <StepStatusStepGroup>
          <StepStatusNumber active={currentStep === 2}>2</StepStatusNumber>
          <StepStatusInfo>
            <span>Step 2</span>
            <p>Select Plan</p>
          </StepStatusInfo>
        </StepStatusStepGroup>
        <StepStatusStepGroup>
          <StepStatusNumber active={currentStep === 3}>3</StepStatusNumber>
          <StepStatusInfo>
            <span>Step 3</span>
            <p>Add Ons</p>
          </StepStatusInfo>
        </StepStatusStepGroup>
        <StepStatusStepGroup>
          <StepStatusNumber active={currentStep === 4}>4</StepStatusNumber>
          <StepStatusInfo>
            <span>Step 4</span>
            <p>Summary</p>
          </StepStatusInfo>
        </StepStatusStepGroup>
      </StepStatusContainer>
    </div>
  );
};

const StyledStepStatus = styled(StepStatus)`
  width: 274px;
  height: 100%;
  background-color: ${(props) => props.theme.colors.colorPurple};
  border-radius: 10px;
  padding: 40px 32px;
`;

export default StyledStepStatus;
