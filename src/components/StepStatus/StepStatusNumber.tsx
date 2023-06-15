import styled from "styled-components";

interface StepStatusNumberProps {
  active: boolean;
  className?: string;
  number: number;
}

const StepStatusNumber = ({ className, number }: StepStatusNumberProps) => {
  return <div className={className}>{number}</div>;
};

const StyledStepStatusNumber = styled(StepStatusNumber)`
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
    color: ${props.theme.colors.colorDenim};`};
`;

export default StyledStepStatusNumber;
