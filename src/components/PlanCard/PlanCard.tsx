import React, { useMemo } from "react";
import styled from "styled-components";

import AdvancedIcon from "../../assets/images/icon-advanced.svg";
import ArcadeIcon from "../../assets/images/icon-arcade.svg";
import ProIcon from "../../assets/images/icon-pro.svg";

export interface PlanCardProps {
  icon: string;
  title: string;
  price: string;
  selected?: boolean;
  className?: string;
}

const PlanCard = ({ icon, title, price, className }: PlanCardProps) => {
  const returnedIcon = useMemo(() => {
    switch (icon) {
      case "arcade":
        return ArcadeIcon;
      case "pro":
        return ProIcon;
      case "advanced":
        return AdvancedIcon;
      default:
        return ArcadeIcon;
    }
  }, [icon]);

  return (
    <div className={className}>
      <img src={returnedIcon} alt={title} />
      <h3>{title}</h3>
      <span>{price}</span>
    </div>
  );
};

const StyledPlanCard = styled(PlanCard)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.inputBorder};
  padding: 20px 16px;
  width: 100%;
  ${(props) =>
    props.selected &&
    `background-color: ${props.theme.colors.bgLightGray}; border: 1px solid ${props.theme.colors.colorPurple};`}

  h3 {
    font-size: 16px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.colorDenim};
    margin: 0;
    margin-top: 40px;
  }

  span {
    font-size: 14px;
    font-weight: 400;
    color: ${(props) => props.theme.colors.colorGray};
    margin-top: 8px;
  }
`;

export default StyledPlanCard;
