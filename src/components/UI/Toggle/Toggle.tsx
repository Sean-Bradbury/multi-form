import { useState } from "react";
import styled from "styled-components";

import ToggleText from "./ToggleText";

interface ToggleProps {
  className?: string;
  leftText: string;
  rightText: string;
  option: string;
  callback: (type: string) => void;
}

const Toggle = ({
  className,
  leftText,
  rightText,
  option,
  callback,
}: ToggleProps) => {
  const [checked, setChecked] = useState(leftText === option ? false : true);
  const handleChange = () => {
    setChecked((_p) => !_p);
    callback(leftText === option ? rightText : leftText);
  };

  return (
    <div className={className}>
      <ToggleText active={leftText === option} text={leftText} />
      <label>
        <input type="checkbox" checked={checked} onChange={handleChange} />
        <span></span>
      </label>
      <ToggleText active={rightText === option} text={rightText} />
    </div>
  );
};

const StyledToggle = styled(Toggle)`
  background-color: ${(props) => props.theme.colors.bgLightGray};
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 8px;
  label {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    /* The slider */
    span {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: ${(props) => props.theme.colors.colorDenim};
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border-radius: 34px;

      &:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 50%;
      }
    }

    input:checked + span {
      background-color: ${(props) => props.theme.colors.colorDenim};
      &:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
      }
    }

    input:focus + span {
      box-shadow: 0 0 1px #2196f3;
    }
  }
`;

export default StyledToggle;
