import { useState } from "react";
import styled from "styled-components";

interface CheckboxProps {
  className?: string;
  title: string;
  subtitle: string;
  price: string;
  checked: boolean;
  onChange: (addOn: string) => void;
}

const Checkbox = ({
  className,
  title,
  subtitle,
  price,
  checked,
  onChange,
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChecked = () => {
    setIsChecked((_p) => !_p);
    onChange(title);
  };

  return (
    <div className={className}>
      <input type="checkbox" checked={isChecked} onChange={handleChecked} />
      <div>
        <h3>{title}</h3>
        <span>{subtitle}</span>
      </div>
      <small>{price}</small>
    </div>
  );
};

const StyledCheckbox = styled(Checkbox)`
  display: flex;
  padding: 16px 24px;
  gap: 24px;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.inputBorder};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 400;
  position: relative;
  div {
    text-align: left;
  }
  h3 {
    color: ${(props) => props.theme.colors.colorDenim};
    margin-bottom: 7px;
  }
  span {
    color: ${(props) => props.theme.colors.colorGray};
  }
  small {
    color: ${(props) => props.theme.colors.colorPurple};
    font-size: inherit;
    font-weight: inherit;
    justify-self: flex-end;
    margin-left: auto;
  }
  ${(props) =>
    props.checked &&
    `background-color: ${props.theme.colors.bgLightGray}; border-color: ${props.theme.colors.colorPurple};  `}
`;

export default StyledCheckbox;
