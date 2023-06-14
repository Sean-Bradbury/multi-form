import styled from "styled-components";

interface ToggleTextProps {
  className?: string;
  active: boolean;
  text: string;
}

const ToggleText = ({ className, text }: ToggleTextProps) => {
  return <p className={className}>{text}</p>;
};

const StyledToggleText = styled(ToggleText)`
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.colorGray};
  ${(props) => props.active && `color: ${props.theme.colors.colorDenim};`}
`;

export default StyledToggleText;
