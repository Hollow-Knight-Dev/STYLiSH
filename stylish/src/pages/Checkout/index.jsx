import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import media from "../../utils/media";
import OrderComplete from "./OrderComplete";
import CartRemoveHover from "./cart-remove-hover.png";
import DropDownSymbol from "./dropdownsymbol.png";
import TrashIcon from "./trash.png";

function CartInfo({ setTotalQuantity, setCartNumber, setBalance }) {
  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    return savedCart;
  });

  const updateTotalQty = () => {
    const newTotalQuantity = cart.reduce((total, item) => total + item.qty, 0);
    setTotalQuantity(newTotalQuantity);
    setCartNumber(newTotalQuantity);
  };

  function calculateBalance() {
    const total = cart.reduce(
      (total, item) => total + item.qty * item.price,
      0
    );
    setBalance(total);
  }

  useEffect(() => {
    updateTotalQty();
    calculateBalance();
  }, [cart]);

  function generateArray(n) {
    const result = [];
    for (let i = 1; i <= n; i++) {
      result.push(i);
    }
    return result;
  }

  const handleQtyChange = (id, color, size, newQty) => {
    const updatedCart = cart.map((product) => {
      if (
        product.id === id &&
        product.color.name === color &&
        product.size === size
      ) {
        return { ...product, qty: newQty };
      }
      return product;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (id, color, size) => {
    const updatedCart = cart.filter(
      (item) =>
        item.id !== id || item.color.name !== color || item.size !== size
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <CartInfoContainer>
      <TitleRow>
        <Title>購物車</Title>
        <SubtitleDiv>
          <Subtitle>數量</Subtitle>
          <Subtitle>單價</Subtitle>
          <Subtitle>小計</Subtitle>
        </SubtitleDiv>
      </TitleRow>
      <CartItemWrapper>
        {cart === null || cart.length === 0 ? (
          <EmptyCart>
            <NoItemReminder>
              Yee~ 購物車空空如也，
              <br />
              快來選購吧！
            </NoItemReminder>
            <CartButton href="/stylish.html" text="回首頁" />
          </EmptyCart>
        ) : (
          cart.map((product, index) => (
            <div key={index}>
              <CartHorizontalLine />
              <ItemContainer>
                <Item>
                  <ItemDetail>
                    <Link to={`/product/${product.id}`}>
                      <MainImage src={product.main_image} alt="Main Image" />
                    </Link>
                    <ItemTitle>{product.name}</ItemTitle>
                    <ItemId>{product.id}</ItemId>
                    <ItemText>顏色｜{product.color.name}</ItemText>
                    <ItemText>尺寸｜{product.size}</ItemText>
                  </ItemDetail>
                  <ItemCount>
                    <Param>
                      <ParamTitle>數量</ParamTitle>
                      <ParamTitle>單價</ParamTitle>
                      <ParamTitle>小計</ParamTitle>
                    </Param>
                    <ParamValue>
                      <DropdownContainer>
                        <DropdownButton
                          value={product.qty}
                          onChange={(event) => {
                            const newQty = parseInt(event.target.value, 10);
                            handleQtyChange(
                              product.id,
                              product.color.name,
                              product.size,
                              newQty
                            );
                          }}
                        >
                          {generateArray(product.max_stock).map((quantity) => (
                            <option key={quantity} value={quantity}>
                              {quantity}
                            </option>
                          ))}
                        </DropdownButton>
                      </DropdownContainer>
                      <PriceText>TWD.{product.price}</PriceText>
                      <PriceSubtotal>
                        TWD.{product.price * product.qty}
                      </PriceSubtotal>
                    </ParamValue>
                  </ItemCount>
                </Item>
                <Icon
                  src={TrashIcon}
                  alt="Trash Icon"
                  onClick={() =>
                    handleRemoveItem(
                      product.id,
                      product.color.name,
                      product.size
                    )
                  }
                />
              </ItemContainer>
            </div>
          ))
        )}
      </CartItemWrapper>
    </CartInfoContainer>
  );
}

const FormInfo = ({ balance, setTotalQuantity, cartNumber, setIsFinished }) => {
  let freight;
  let accountsPayable;

  if (balance === 0) {
    freight = 0;
    accountsPayable = 0;
  } else {
    freight = 30;
    accountsPayable = balance + freight;
  }

  const [hasError, setHasError] = useState(true);

  const [name, setName] = useState("");
  const hasName = name.trim().length >= 2;
  const [hasTouchName, setHasTouchName] = useState(false);
  const handleNameOnBlur = () => {
    setHasTouchName(true);
  };

  const [phone, setPhone] = useState("");
  const hasPhone = phone.length === 10 && phone.startsWith("09");
  const [hasTouchPhone, setHasTouchPhone] = useState(false);
  const handlePhoneOnBlur = () => {
    setHasTouchPhone(true);
  };

  const [address, setAddress] = useState("");
  const hasAddress = address.length >= 10;
  const [hasTouchAddress, setHasTouchAddress] = useState(false);
  const handleAddressOnBlur = () => {
    setHasTouchAddress(true);
  };

  const re = new RegExp(
    '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
  );
  const [email, setEmail] = useState("");
  const hasEmail = re.test(email.toString().toLowerCase());
  const [hasTouchEmail, setHasTouchEmail] = useState(false);
  const handleEmailOnBlur = () => {
    setHasTouchEmail(true);
  };

  const [selectedTime, setSelectedTime] = useState("time3");
  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };
  const hasSelectedTime = selectedTime !== "";

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (cartNumber === 0) {
      alert("購物車空空滴，先去選購吧");
    } else {
      if (hasError) {
        alert("還沒填完~");
      } else {
        alert("訂單已送出");
        localStorage.removeItem("cart");
        setIsFinished(true);
        setTotalQuantity(0);
      }
    }
  };

  function validation() {
    if (hasName && hasPhone && hasAddress && hasEmail && hasSelectedTime) {
      setHasError(false);
    }
  }

  useEffect(() => {
    validation();
  }, [name, phone, address, email, selectedTime]);

  return (
    <WholeForm onSubmit={handleFormSubmit}>
      <CustomerInfoContainer>
        <Title>訂購資料</Title>
        <LongHorizontalLine />
        <InputContainer>
          <FormRow>
            <LabelText>收件人姓名</LabelText>
            <InputBox
              type="text"
              name="name"
              value={name.trim()}
              onChange={(e) => {
                setName(e.target.value);
              }}
              $warning={!hasName && hasTouchName}
              onBlur={handleNameOnBlur}
            />
          </FormRow>
          {!hasName && hasTouchName && (
            <ErrorMessage>請填2個字以上</ErrorMessage>
          )}
        </InputContainer>
        <NameReminder>
          務必填寫完整收件人姓名，避免包裹無法順利簽收
        </NameReminder>
        <InputContainer>
          <FormRow>
            <LabelText>手機</LabelText>
            <InputBox
              type="number"
              name="phone"
              value={phone.trim()}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              onBlur={handlePhoneOnBlur}
              $warning={!hasPhone && hasTouchPhone}
            />
          </FormRow>
          {!hasPhone && hasTouchPhone && (
            <ErrorMessage>手機格式為09開頭的十位數字</ErrorMessage>
          )}
          <FormRow>
            <LabelText>地址</LabelText>
            <InputBox
              type="text"
              value={address.trim()}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              onBlur={handleAddressOnBlur}
              $warning={!hasAddress && hasTouchAddress}
            />
          </FormRow>
          {!hasAddress && hasTouchAddress && (
            <ErrorMessage>地址至少十個字以上</ErrorMessage>
          )}
          <FormRow>
            <LabelText>Email</LabelText>
            <InputBox
              type="email"
              value={email.trim()}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onBlur={handleEmailOnBlur}
              $warning={!hasEmail && hasTouchEmail}
            />
          </FormRow>
          {!hasEmail && hasTouchEmail && (
            <ErrorMessage>請輸入有效的Email信箱</ErrorMessage>
          )}
          <FormRow>
            <LabelText>配送時間</LabelText>
            <CheckboxOption>
              <CheckboxInput
                id="time1"
                type="radio"
                name="time"
                value="time1"
                checked={selectedTime === "time1"}
                onChange={handleTimeChange}
              ></CheckboxInput>
              <CheckboxText>08:00-12:00</CheckboxText>
              <CheckboxInput
                id="time2"
                type="radio"
                name="time"
                value="time2"
                checked={selectedTime === "time2"}
                onChange={handleTimeChange}
              ></CheckboxInput>
              <CheckboxText>14:00-18:00</CheckboxText>
              <CheckboxInput
                id="time3"
                type="radio"
                name="time"
                value="time3"
                checked={selectedTime === "time3"}
                onChange={handleTimeChange}
              ></CheckboxInput>
              <CheckboxTextNoMargin>不指定</CheckboxTextNoMargin>
            </CheckboxOption>
          </FormRow>
        </InputContainer>
      </CustomerInfoContainer>
      <PaymentInfoContainer>
        <Title>付款資料</Title>
        <LongHorizontalLine />
        <InputContainer>
          <FormRow>
            <LabelText>信用卡號碼</LabelText>
            <InputBox
              type="number"
              placeholder="**** **** **** ****"
              required
            />
          </FormRow>
          <FormRow>
            <LabelText>有效期限</LabelText>
            <InputBox type="number" placeholder="MM / YY" required />
          </FormRow>
          <FormRow>
            <LabelText>安全碼</LabelText>
            <InputBox type="number" placeholder="後三碼" required />
          </FormRow>
        </InputContainer>
      </PaymentInfoContainer>
      <BalanceInfoContainer>
        <BalanceDetail>
          <BalanceBar>
            <BalanceText>總金額</BalanceText>
            <AmountDetail>
              <NTSymbol>NT.</NTSymbol>
              <BalanceNumber>{balance}</BalanceNumber>
            </AmountDetail>
          </BalanceBar>
          <BalanceBar>
            <BalanceText>運費</BalanceText>
            <AmountDetail>
              <NTSymbol>NT.</NTSymbol>
              <BalanceNumber>{freight}</BalanceNumber>
            </AmountDetail>
          </BalanceBar>
          <HorizontalLine />
          <BalanceBar>
            <BalanceText>應付金額</BalanceText>
            <AmountDetail>
              <NTSymbol>NT.</NTSymbol>
              <BalanceNumber>{accountsPayable}</BalanceNumber>
            </AmountDetail>
          </BalanceBar>
        </BalanceDetail>
        <BalanceButton type="submit" $warning={hasError}>
          確認付款
        </BalanceButton>
      </BalanceInfoContainer>
    </WholeForm>
  );
};

function Checkout({ setTotalQuantity }) {
  const [balance, setBalance] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [cartNumber, setCartNumber] = useState(0);

  return (
    <MainContainer>
      {isFinished ? (
        <OrderComplete />
      ) : (
        <Wrapper>
          <CartInfo
            setTotalQuantity={setTotalQuantity}
            setCartNumber={setCartNumber}
            setBalance={setBalance}
          />
          <FormInfo
            cartNumber={cartNumber}
            setTotalQuantity={setTotalQuantity}
            balance={balance}
            setIsFinished={setIsFinished}
          />
        </Wrapper>
      )}
    </MainContainer>
  );
}

export default Checkout;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 1160px;
  margin-top: 51px;
  margin-bottom: 148px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.mobile`
    width: 100%;
    margin: 20px 24px 28px 24px;
  `}
`;

// common elements
const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background: #3f3a3a;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  width: fit-content;
  margin-bottom: 16px;

  ${media.mobile`
    margin-bottom: 9.5px;
  `}
`;

const InputContainer = styled.div`
  width: 696px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  ${media.mobile`
    width: 100%;
    gap: 20px;
  `}
`;

const LabelText = styled.label`
  width: 120px;
  font-size: 16px;
  line-height: 19px;

  ${media.mobile`
    width: 100%;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 17px;
  `}
`;

const InputBox = styled.input`
  width: 576px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid #979797;
  color: #979797;
  padding-left: 8px;
  padding-bottom: 4px;
  overflow-y: hidden;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  appearance: none;

  ${(props) =>
    props.$warning &&
    `
    border: 2px solid red;
  `}

  &::placeholder {
    color: #d3d3d3;
    font-size: 16px;
    line-height: 32px;
  }

  ${media.mobile`
    width: 100%;
  `}
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;

  ${media.mobile`
    flex-direction: column;
    align-items: flex-start;
  `}
`;

const LongHorizontalLine = styled(HorizontalLine)`
  margin-bottom: 25px;

  ${media.mobile`
    margin-bottom: 20px;
  `}
`;

// CartInfo
const CartInfoContainer = styled.div`
  width: 1160px;
  height: fit-content;
  margin-bottom: 48px;

  ${media.mobile`
    width: 100%;
    margin-bottom: 19px;
  `}
`;

const TitleRow = styled.div`
  display: flex;
`;

const SubtitleDiv = styled.div`
  display: flex;
  margin-left: 410px;

  ${media.mobile`
    display: none;
  `}
`;

const Subtitle = styled.p`
  font-size: 16px;
  line-height: 16px;
  width: 192px;
  text-align: center;

  ${media.mobile`
    display: none;
  `}
`;

const Param = styled.div`
  display: none;

  ${media.mobile`
    display: flex;
    width: 100%;
    justify-content: space-between;
  `}
`;

const ParamTitle = styled.p`
  ${media.mobile`
    text-align: center;
    font-size: 14px;
    line-height: 17px; 
    width: 104px;
    margin-bottom: 10px;
  `}
`;

const CartItemWrapper = styled.div`
  width: 1160px;
  height: auto;
  border: 1px solid #979797;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  ${media.mobile`
    width: 100%;
    border: 0;
    padding: 0;
    gap: 19.5px;
  `}
`;

const ItemContainer = styled.div`
  width: 1100px;
  position: relative;

  ${media.mobile`
    width: 100%;
  `}
`;

const Item = styled.div`
  width: 1004px;
  height: 152px;
  display: flex;
  justify-content: space-between;

  ${media.mobile`
    width: 100%;
    height: 231px;
    border: 0;
    padding: 0;
    flex-direction: column;
    justify-content: flex-start;
  `}
`;

const ItemDetail = styled.div`
  width: fit-content;
  height: 152px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;

  ${media.mobile`
    margin-bottom: 20px;
  `}
`;

const MainImage = styled.img`
  width: auto;
  height: 152px;
  margin-right: 15px;

  ${media.mobile`
    margin-right: 10px;
  `}
`;

const ItemTitle = styled.p`
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 17px;

  ${media.mobile`
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 20px;
  `}
`;

const ItemId = styled(ItemTitle)`
  margin-bottom: 22px;

  ${media.mobile`
    margin-bottom: 24px;
  `}
`;

const ItemText = styled(ItemTitle)`
  margin-bottom: 10px;
  ${media.mobile`
    margin-bottom: 12px;
  `}
`;

const ParamValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  ${media.mobile`
    width: 100%;
    justify-content: space-between;
  `}
`;

const ItemCount = styled.div`
  width: 576px;
  display: flex;
  align-items: center;

  ${media.mobile`
    width: 100%;
    flex-direction: column;
  `}
`;

const PriceText = styled(ItemTitle)`
  text-align: center;
  width: 192px;
  margin: 0;

  ${media.mobile`
    width: 104px;
  `}
`;

const PriceSubtotal = styled(PriceText)``;

const Icon = styled.div`
  width: 44px;
  height: 44px;
  background-image: url(${TrashIcon});
  position: absolute;
  right: 0;
  top: 54px;
  cursor: pointer;

  &:hover {
    background-image: url(${CartRemoveHover});
  }

  ${media.mobile`
    top: 0;
  `}
`;

const DropdownContainer = styled.div`
  display: inline-block;
  width: 192px;
  text-align: center;

  ${media.mobile`
    width: 104px;
  `}
`;

const DropdownButton = styled.select`
  border-radius: 8px;
  border: 1px solid #979797;
  background: #f3f3f3;
  width: 80px;
  height: 32px;
  cursor: pointer;
  font-size: 14px;
  padding-left: 15px;
  appearance: none;
  background-image: url(${DropDownSymbol});
  background-position: 62px 10px;
  background-repeat: no-repeat;
  background-size: 10px;

  ${media.mobile`
    height: 30px;
  `}
`;

const CartHorizontalLine = styled(HorizontalLine)`
  display: none;

  ${media.mobile`
    display: block;
    margin-bottom: 20px;
  `}
`;

const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.mobile`
    align-items: flex-start;
  `}
`;

const NoItemReminder = styled.p`
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px;

  ${media.mobile`
    font-size: 20px;
    text-align: start;
    margin-bottom: 10px;
    margin-right: 20px;
  `}
`;

const CartButton = styled(Button)`
  margin-bottom: 0;
`;

// FormInfo
const WholeForm = styled.form`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
`;

//// CustomerInfo
const CustomerInfoContainer = styled.div`
  width: 1160px;
  height: fit-content;
  margin-bottom: 50px;

  ${media.mobile`
    width: 100%;
    margin-bottom: 20px;
  `}
`;

const NameReminder = styled.p`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  color: #8b572a;
  margin-top: 10px;
  margin-bottom: 30px;
  margin-left: 344px;

  ${media.mobile`
    margin: 6px 0 20px;
    font-size: 14px;
    line-height: 17px;
  `}
`;

const ErrorMessage = styled(NameReminder)`
  color: red;
  margin: 0;
  text-align: end;

  ${media.mobile`
    text-align: start;
  `}
`;

const CheckboxOption = styled.div`
  display: flex;
  align-items: center;
`;

const CheckboxInput = styled.input`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  appearance: none;
  border: 1px solid #979797;
  position: relative;

  &:checked::before {
    content: "";
    width: 9.5px;
    height: 10px;
    background-color: #3f3a3a;
    border-radius: 50%;
    position: absolute;
    top: 2.5px;
    left: 2.5px;
  }
`;

const CheckboxText = styled.label`
  margin-left: 8px;
  margin-right: 32px;
  font-size: 16px;
  line-height: 26px;

  ${media.mobile`
    font-size: 14px;
    margin-left: 6px;
    margin-right: 26px;
  `}
`;

const CheckboxTextNoMargin = styled(CheckboxText)`
  margin-right: 0;
`;

//// PaymentInfo
const PaymentInfoContainer = styled.div`
  width: 1160px;
  height: fit-content;
  margin-bottom: 40px;

  ${media.mobile`
    width: 100%;
    margin-bottom: 24px;
  `}
`;

//// BalanceInfo
const BalanceInfoContainer = styled.div`
  width: 240px;
  height: 282px;
  display: flex;
  flex-direction: column;
  align-self: flex-end;

  ${media.mobile`
    width: 100%;
  `}
`;

const BalanceDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-right: 2px;

  ${media.mobile`
    width: 240px;
    align-self: flex-end;
  `}
`;

const BalanceBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BalanceText = styled.p`
  font-size: 16px;
  line-height: 19px;
`;

const AmountDetail = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NTSymbol = styled.p`
  font-size: 16px;
  line-height: 19px;
  margin-right: 8px;
`;

const BalanceNumber = styled.p`
  font-size: 30px;
  line-height: 36px;
`;

const BalanceButton = styled.button`
  width: 240px;
  height: 64px;
  background: #000;
  color: #fff;
  line-height: 30px;
  letter-spacing: 4px;
  border: 0;
  margin-top: 49px;
  padding-left: 2px;
  cursor: pointer;

  ${(props) =>
    props.$warning &&
    `
    background: #F2F2F2;
  `}

  ${media.mobile`
    width: 100%;
    height: 44px;
    font-size: 16px;
    letter-spacing: 3.2px;
    margin-top: 36px;
  `}
`;
