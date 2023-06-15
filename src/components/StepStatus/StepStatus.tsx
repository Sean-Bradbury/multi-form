import * as React from "react";
import styled from "styled-components";
import StepStatusNumber from "./StepStatusNumber";
import BackgroundDesktop from "../../assets/images/bg-sidebar-desktop.svg";

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
          <StepStatusNumber active={currentStep === 1} number={1} />
          <StepStatusInfo>
            <span>Step 1</span>
            <p>Your Info</p>
          </StepStatusInfo>
        </StepStatusStepGroup>
        <StepStatusStepGroup>
          <StepStatusNumber active={currentStep === 2} number={2} />
          <StepStatusInfo>
            <span>Step 2</span>
            <p>Select Plan</p>
          </StepStatusInfo>
        </StepStatusStepGroup>
        <StepStatusStepGroup>
          <StepStatusNumber active={currentStep === 3} number={3} />
          <StepStatusInfo>
            <span>Step 3</span>
            <p>Add Ons</p>
          </StepStatusInfo>
        </StepStatusStepGroup>
        <StepStatusStepGroup>
          <StepStatusNumber active={currentStep === 4} number={4} />
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
  background-image: url(${BackgroundDesktop});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  padding: 40px 32px;
`;

export default StyledStepStatus;
