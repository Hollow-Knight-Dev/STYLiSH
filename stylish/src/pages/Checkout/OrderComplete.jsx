import React from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import media from "../../utils/media";
import OrderReceived from "./order-received.png";

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

  ${media.mobile`
    width: 150px;
    height: 150px;
    margin-bottom: 50px;
  `}
`;

function OrderComplete() {
  return (
    <Main>
      <Title>訂單完成！</Title>
      <Gif src={OrderReceived} alt="Order received" />
      <Button href="/stylish.html" text="回首頁" />
    </Main>
  );
}

export default OrderComplete;
