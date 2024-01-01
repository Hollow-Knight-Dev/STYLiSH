import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import media from "../utils/media";

const HeaderBar = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
`;

const WhiteHeader = styled.div`
  height: 100px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;

  ${media.mobile`
    display: block;
    position: relative;
    height: 52px;
  `}
`;

const HeaderPart1 = styled.div`
  display: flex;
  gap: 57px;
  padding: 26px 0px 26px 60px;

  ${media.mobile`
    position: relative;
    padding: 14px 0 14px 0;
    justify-content: center;
    align-items: center;
  `}
`;

const LogoLink = styled.a`
  width: fit-content;

  ${(props) =>
    props.$zIndex &&
    `
    z-index: ${props.$zIndex};
  `}

  ${media.mobile`
    z-index: 2;
  `}
`;

const LogoHover = styled.img`
  height: 48px;
  cursor: pointer;

  ${media.mobile`
    height: 24px;
  `}
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: flex-end;
  padding-bottom: 1px;

  ${media.mobile`
    position: absolute;
    top: 48px;
    width: 100%;
    height: 100%;
    justify-content: space-evenly;
    align-items: center;
  `}
`;

const NavLi = styled.li`
  display: flex;
  width: 150px;
  line-height: 28px;

  ${media.mobile`
    text-align: center;
    font-size: 16px;
    line-height: 50px;
    width: auto;
    flex-grow: 1;
    justify-content: center;
  `}
`;

const NavLink = styled.a`
  width: 150px;
  color: #3f3a3a;
  letter-spacing: 30px;
  text-align: center;
  padding-left: 30px;

  &:hover {
    color: #8b572a;
  }

  ${media.mobile`
    font-size: 16px;
    width: 100%;
    height: 100%;
    color: #828282;
    letter-spacing: 0;
    text-align: center;
    padding-left: 0;

    &:hover {
      color: #FFF;
    }
  `}
`;

const NavLine = styled.li`
  background-color: #3f3a3a;
  width: 1px;
  height: 20px;
  margin-bottom: 4px;
  display: flex;

  ${media.mobile`
    background-color: #828282;
    height: 16px;
    margin-bottom: 0;
    line-height: 50px;
  `}
`;

const HeaderPart2 = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  padding-top: 27px;
  padding-right: 54px;

  ${media.mobile`
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
    padding: 0;
  `}
`;

const SearchContainer = styled.div`
  position: relative;
  width: 216px;
  height: 46px;
  margin-right: 41px;
  align-self: flex-start;
  border: 1px solid #979797;
  border-radius: 21px;
  background-color: #fff;

  ${(props) =>
    props.$border &&
    `
    border: ${props.$border};
  `}

  ${(props) =>
    props.$zIndex &&
    `
    z-index: ${props.$zIndex};
  `}

  ${media.mobile`
    width: 100%; 
    height: 40px;
    margin: 6px 10px;
    border: 0;
  `}
`;

const SearchInput = styled.input`
  position: absolute;
  left: 20px;
  width: 80%;
  height: 100%;
  border: 0;
  outline: none;

  ${(props) =>
    props.$display &&
    `
    display: ${props.$display};
  `}

  &::placeholder {
    color: #8b572a;
  }

  ${media.mobile`
    display: none;
    width: 90%;
  `}
`;

const SearchIcon = styled.img`
  position: absolute;
  right: 11px;
  top: 1px;
  width: 44px;
  cursor: pointer;

  ${media.mobile`
    width: 40px;
    top: 0;
    right: 7px;
  `}
`;

const Cart = styled.div`
  position: relative;
  margin-right: 42px;
  padding-top: 1px;
  background-image: url("/images/cart.png");
  height: 44px;
  width: 44px;

  ${media.mobile`
    background-image: url('/images/cart-mobile.png');
    margin-right: 0;
  `}
`;

const CartDot = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 24px;
`;

const CartCount = styled.a`
  font-size: 16px;
  line-height: 24px;
  color: #fff;
  position: absolute;
  right: 7.5px;
  bottom: 0;
`;

const Member = styled.div`
  background-image: url("/images/member.png");
  width: 44px;

  ${media.mobile`
    background-image: url('/images/member-mobile.png');
    height: 44px;
  `}
`;

const FunctionNav = styled.ul`
  display: flex;
  justify-content: space-evenly;

  ${media.mobile`
    display: flex;
    height: 60px;
    background-color: #313538;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 1;
    align-items: center;
  `}
`;

const FunctionNavItem = styled.li`
  display: flex;
  cursor: pointer;

  ${media.mobile`
    display: flex;
    width: 50%;
    height: 44px;
    justify-content: center;
    align-items: center;
    text-decoration: none;
  `}
`;

const FunctionNavLink = styled.a`
  display: none;

  ${media.mobile`
    display: block;
    text-decoration: none;
    color: #FFF;
    font-size: 16px;
    line-height: 16px;
  `}
`;

const WhiteTextLink = styled(Link)`
  color: #fff;
  font-size: 16px;
  display: none;

  ${media.mobile`
    display: block;
  `}
`;

const VerticalLine = styled.div`
  display: none;

  ${media.mobile`
    display: block;
    background-color: #828282;
    width: 1px;
    height: 24px;
  `}
`;

const BlackHeader = styled.div`
  height: 40px;
  background-color: #313538;

  ${media.mobile`
    height: 50px;
  `}
`;

function Header({ totalQuantity }) {
  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth > 1280) {
        setHasSearchBar(true);
      } else {
        setHasSearchBar(false);
      }
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const [inputValue, setInputValue] = useState("");
  const [hasSearchBar, setHasSearchBar] = useState(() => {
    if (window.innerWidth < 1280) {
      return false;
    } else {
      return true;
    }
  });
  const [hasLogo, setHasLogo] = useState(true);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const toggleSearchBar = () => {
    if (window.innerWidth < 1280) {
      if (!hasSearchBar) {
        setHasSearchBar(true);
        setHasLogo(false);
      } else {
        setHasSearchBar(false);
        setHasLogo(true);
      }
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter" && inputValue) {
      window.location.href = `/stylish.html?keyword=${inputValue}`;
    }
  };

  return (
    <HeaderBar>
      <WhiteHeader>
        <HeaderPart1>
          <LogoLink href="/stylish.html" $zIndex={hasLogo ? 2 : 0}>
            <LogoHover src="/images/logo.png" alt="Logo" />
          </LogoLink>

          <NavMenu>
            <NavLi>
              <NavLink href="/stylish.html?category=women">女裝</NavLink>
            </NavLi>
            <NavLine></NavLine>
            <NavLi>
              <NavLink href="/stylish.html?category=men">男裝</NavLink>
            </NavLi>
            <NavLine></NavLine>
            <NavLi>
              <NavLink href="/stylish.html?category=accessories">配件</NavLink>
            </NavLi>
          </NavMenu>
        </HeaderPart1>

        <HeaderPart2>
          <SearchContainer
            $border={hasSearchBar ? "1px solid #979797" : "0"}
            $zIndex={hasSearchBar ? 3 : 1}
          >
            <SearchInput
              type="text"
              placeholder={inputValue ? "" : "搜尋商品"}
              onChange={handleInputChange}
              onKeyPress={handleEnterKeyPress}
              value={inputValue}
              $display={hasSearchBar ? "block" : "none"}
            />
            {inputValue ? (
              <a href={`/stylish.html?keyword=${inputValue}`}>
                <SearchIcon src="/images/search.png" alt="Search Icon" />
              </a>
            ) : (
              <SearchIcon
                src="/images/search.png"
                alt="Search Icon"
                onClick={toggleSearchBar}
              />
            )}
          </SearchContainer>
          <FunctionNav>
            <FunctionNavItem
              onClick={() => (window.location.href = "/checkout")}
            >
              <Cart>
                <CartDot src="/images/circle.png" alt="Cart Circle" />
                <CartCount>{totalQuantity}</CartCount>
              </Cart>

              <WhiteTextLink to="/checkout">購物車</WhiteTextLink>
            </FunctionNavItem>
            <VerticalLine />
            <FunctionNavItem>
              <Member />
              <FunctionNavLink href="#">會員</FunctionNavLink>
            </FunctionNavItem>
          </FunctionNav>
        </HeaderPart2>
      </WhiteHeader>

      <BlackHeader />
    </HeaderBar>
  );
}

export default Header;
