import React from "react";
import styled from "styled-components";
import media from "../utils/media";
import ErrorGif from "/images/nonocat.gif";
import Button from "./Button";

const Main = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-top: 150px;
  margin-bottom: 50px;

  ${media.mobile`
    margin-top: 80px;
    margin-bottom: 25px;
    font-size: 20px;
  `}
`;

const Gif = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-bottom: 80px;
  border-radius: 50%;

  
  ${media.mobile`
    width: 150px;
    height: 150px;
    margin-bottom: 50px;
  `}
`;

function Error() {
  return (
  <Main>
    <Title>No related product found.</Title>
    <Gif src={ErrorGif} alt="Error" />
    <Button href="/stylish.html" text="回首頁" />
  </Main>
  );
}

export default Error;