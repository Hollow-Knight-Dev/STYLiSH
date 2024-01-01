import React from "react";
import styled from "styled-components";
import media from "../utils/media";

const FooterBar = styled.footer`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 115px;
  background-color: #313538;
  text-align: center;

  ${media.mobile`
    flex-wrap: wrap;
    align-items: flex-start;
    height: 146px;
    padding-top: 20px;
    bottom: 60px;
`}
`;

const FooterMenu = styled.ul`
  display: flex;
  align-items: flex-end;
  margin-right: 101px;
  margin-bottom: 1px;

  ${media.mobile`
    flex-flow: column wrap;
    align-items: flex-start;
    height: 76px;
    margin-right: 0;
    gap: 8px;
  `}
`;

const FooterLi = styled.li`
  display: flex;
  width: 133px;
  line-height: 22px;

  ${media.mobile`
    text-align: center;
    width: auto;
    height: 20px;
    display: block;
  `}
`;

const FooterText = styled.a`
  width: 134px;
  text-decoration: none;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #f5f5f5;

  ${media.mobile`
    color: #D3D3D3;
    font-size: 14px;
    line-height: 20px;
    margin-right: 28px;
  `}
`;

const FooterLine = styled.li`
  background-color: #828282;
  width: 1px;
  height: 16px;
  margin-bottom: 2px;
  list-style-type: none;

  ${media.mobile`
    display: none;
  `}
`;

const FooterIcons = styled.div`
  display: flex;
  gap: 30px;

  ${media.mobile`
    gap: 14px;
    padding-left: 12px;
    padding-top: 21px;
  `}
`;

const Icon = styled.img`
  width: 50px;

  ${media.mobile`
    width: 20px;
  `}
`;

const CopyRight = styled.div`
  display: flex;
  align-items: center;

  ${media.mobile`
    padding: 13px 0 20px;
    margin: 0;
    width: 100%;
    justify-content: center;
  `}
`;

const CopyRightText = styled.p`
  margin-left: 30px;
  margin-top: 2px;
  color: #828282;
  font-size: 12px;

  ${media.mobile`
    margin-left: 0;
    font-size:12px;
    transform: scale(0.833);
    line-height: 14px;
  `}
`;

function Footer() {
  return (
    <FooterBar>
      <FooterMenu>
        <FooterLi>
          <FooterText href="#">關於 STYLiSH</FooterText>
        </FooterLi>
        <FooterLine></FooterLine>
        <FooterLi>
          <FooterText href="#">服務條款</FooterText>
        </FooterLi>
        <FooterLine></FooterLine>
        <FooterLi>
          <FooterText href="#">隱私政策</FooterText>
        </FooterLi>
        <FooterLine></FooterLine>
        <FooterLi>
          <FooterText href="#">聯絡我們</FooterText>
        </FooterLi>
        <FooterLine></FooterLine>
        <FooterLi>
          <FooterText href="#">FAQ</FooterText>
        </FooterLi>
      </FooterMenu>

      <FooterIcons>
        <Icon src="/images/line.png" alt="Line Icon" />
        <Icon src="/images/twitter.png" alt="Twitter Icon" />
        <Icon src="/images/facebook.png" alt="Facebook Icon" />
      </FooterIcons>

      <CopyRight>
        <CopyRightText>&copy; 2018. All rights reserved.</CopyRightText>
      </CopyRight>
    </FooterBar>
  );
}

export default Footer;
