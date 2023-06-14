import React from "react";
import styled from "styled-components";

interface ConatinerProps {
  className?: string;
  direction?: string;
  justify?: string;
  align?: string;
  gap?: number;
  children: React.ReactNode;
}

const Conatiner = ({ className, children }: ConatinerProps) => {
  return <div className={className}>{children}</div>;
};

const StyledConatiner = styled(Conatiner)`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  gap: ${(props) => props.gap + "px"};
`;

export default StyledConatiner;
