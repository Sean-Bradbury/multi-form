import * as React from "react";
import styled from "styled-components";

interface TitleAreaProps {
  title: string;
  subtitle: string;
  className?: string;
}

const TitleArea = ({ title, subtitle, className }: TitleAreaProps) => {
  return (
    <div className={className}>
      <h1>{title}</h1>
      <h3>{subtitle}</h3>
    </div>
  );
};

const StyledTitleArea = styled(TitleArea)`
  text-align: left;
  h3 {
    color: ${(props) => props.theme.colors.colorGray};
    font-weight: 400;
    margin-top: 0;
  }
`;

export default StyledTitleArea;
