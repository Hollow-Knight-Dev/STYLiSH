import React from "react";
import styled from "styled-components";
import media from "../utils/media";

const StyledButton = styled.a`
  background-color: #3f3a3a;
  height: 50px;
  color: #fff;
  padding: 10px 30px;
  border-radius: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: #8b572a;
    transform: translateY(2px);
  }

  ${media.mobile`
    font-size: 16px;
    height: 40px;
    padding: 8px 24px;
  `}
`;

function Button({ href, text, onClick }) {
  if (href) {
    return <StyledButton href={href}>{text}</StyledButton>;
  } else {
    return <StyledButton onClick={onClick}>{text}</StyledButton>;
  }
}

export default Button;
