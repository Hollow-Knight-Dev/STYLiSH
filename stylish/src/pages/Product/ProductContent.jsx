import { produce } from 'immer';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import media from '../../utils/media';

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 19px;

  ${media.mobile`
    margin-bottom: 12px;
  `}
`;

const ProductSection1 = styled.div`
  margin-top: 65px;
  margin-bottom: 50.33px;
  display: flex;
  height: fit-content;
  gap: 40px;

  ${media.mobile`
    flex-direction: column;
    margin-top: 0;
    margin-bottom: 28px;
    gap: 17px;
  `}
`;

const MainImg = styled.img`
  width: 560px;
  height: auto;

  ${media.mobile`
    width: 100vw;
  `}
`;

const ProductDescription = styled.div`
  width: 360px;
  height: 746.67px;

  ${media.mobile`
    width: 100%;
    height: fit-content;
    padding: 0 24px;
  `}
`;

const ProductTitle = styled.p`
  color: #3f3a3a;
  font-size: 32px;
  line-height: 38px;
  letter-spacing: 6.4px;
  margin-bottom: 16px;

  ${media.mobile`
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 4px;
    margin-bottom: 10px;
  `}
`;

const ProductID = styled.p`
  color: #bababa;
  line-height: 24px;
  letter-spacing: 4px;
  margin-bottom: 40px;

  ${media.mobile`
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 3.2px;
    margin-bottom: 20px;
  `}
`;

const ProductPrice = styled.p`
  font-size: 30px;
  line-height: 36px;
  margin-bottom: 20px;

  ${media.mobile`
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 10px;
  `}
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background: #3f3a3a;
  margin-bottom: 30px;
`;

const StockDetail = styled.div`
  width: 100%;
  height: 258px;
  margin-bottom: 40px;

  ${media.mobile`
    margin-bottom: 0; 
  `}
`;

const StockVariable = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
`;

const StockText = styled.p`
  line-height: 24px;
  letter-spacing: 4px;
  margin-right: 24px;

  ${media.mobile`
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 2.8px;
    margin-right: 11.59px;
  `}
`;

const Options = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  gap: 20px;

  ${media.mobile`
    gap: 15px;
  `}
`;

const StockVariableColor = styled(StockVariable)`
  margin-bottom: 30px;

  ${media.mobile`
    margin-bottom: 28px; 
  `}
`;

const Color = styled.div`
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) => (props.$isSelect ? '1px solid #979797' : 'none')};
`;

const Box = styled.div`
  width: 24px;
  height: 24px;
  border: 1px solid #d3d3d3;
  background-color: ${(props) => props.color};
`;

const StockVariableSize = styled(StockVariable)`
  margin-bottom: 22px;

  ${media.mobile`
  margin-bottom: 30px; 
  `}
`;

const Ball = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background: ${(props) => props.color};
  opacity: ${(props) => props.opacity};
`;

const StockSizeBall = ({ color, opacity, children }) => {
  return (
    <Ball color={color} opacity={opacity}>
      {children}
    </Ball>
  );
};

const SizeUnselect = styled.p`
  color: #3f3a3a;
  line-height: 36px;
`;

const SizeSelect = styled(SizeUnselect)`
  color: #fff;
`;

const StockVariableQty = styled(StockVariable)`
  margin-bottom: 26px;

  ${media.mobile`
    margin-bottom: 10px; 
    width: 100%;
  `}
`;

const StockTextQty = styled(StockText)`
  ${media.mobile`
    display: none;
  `}
`;

const QtyBox = styled.div`
  width: 160px;
  height: 44px;
  border: 1px solid #979797;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media.mobile`
    width: 100%;
   `}
`;

const QtySymbol = styled.p`
  font-size: 16px;
  line-height: 32px;
  cursor: pointer;

  ${media.mobile`
    line-height: 22px;
  `}
`;

const DecreaseQty = styled.div`
  width: 36px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.mobile`
    width: 105.23px;
  `}
`;

const IncreaseQty = styled(DecreaseQty)``;

const QtySelected = styled.div`
  width: 50px;
  text-align: center;

  ${media.mobile`
    width: 105.23px;
  `}
`;

const QtyText = styled.p`
  color: #8b572a;
  font-size: 16px;
  line-height: 32px;
`;

const Button = styled.button`
  width: 100%;
  height: 64px;
  color: #fff;
  background: #000000;
  border: 0;
  line-height: 30px;
  letter-spacing: 4px;
  cursor: pointer;

  ${media.mobile`
    height: 44px;
    font-size: 16px;
    letter-spacing: 3.2px;
  `}
`;

const ProductDetail = styled.p`
  line-height: 30px;

  ${media.mobile`
    font-size: 14px;
    line-height: 24px;
  `}
`;

const ProductSection2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 960px;

  ${media.mobile`
    width: 100%;
    padding: 0 24px;
  `}
`;

const ProductMoreInfo = styled.div`
  position: relative;
  width: 960px;
  height: 118px;
  margin-bottom: 30px;

  ${media.mobile`
    width: 100%;
    height: fit-content;
    margin-bottom: 20px;
  `}
`;

const Subtitle = styled.p`
  color: #8b572a;
  line-height: 30px;
  letter-spacing: 3px;
  width: fit-content;
  margin-bottom: 28px;

  ${media.mobile`
    font-size: 16px;
    letter-spacing: 3.2px;
    width: 147px;
    margin-bottom: 12px;
  `}
`;

const SplitLine = styled(HorizontalLine)`
  position: absolute;
  top: 15px;
  right: 0;
  width: 761px;
  height: 1px;
  background: #3f3a3a;

  ${media.mobile`
    width: calc(100% - 147px);
  `}
`;

const MoreDescription = styled.p`
  line-height: 30px;

  ${media.mobile`
    font-size: 14px;
    line-height: 25px; 
  `}
`;

const MoreImg = styled.img`
  width: auto;
  height: auto;
  margin-bottom: 30px;

  ${media.mobile`
    margin-bottom: 20px;
  `}
`;

function ProductContent({ product, setTotalQuantity }) {
  const {
    title,
    id,
    description,
    price,
    texture,
    wash,
    place,
    note,
    story,
    main_image,
    images,
    variants,
    colors,
    sizes,
  } = product;

  const descriptionLines = description.split('\r\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    return savedCart;
  });
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedColorName, setSelectedColorName] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [adjustVariants, setAdjustVariants] = useState([]);

  function adjustStockQty(variants, cart) {
    return produce(variants, (draftVariants) => {
      cart.forEach((cartItem) => {
        if (cartItem.id === id) {
          const matchingVariant = draftVariants.find(
            (variant) =>
              variant.color_code === cartItem.color.code &&
              variant.size === cartItem.size
          );
          if (matchingVariant) {
            matchingVariant.stock -= cartItem.qty;
          }
        }
      });
    });
  }

  const updateTotalQty = () => {
    const newTotalQuantity = cart.reduce((total, item) => total + item.qty, 0);
    setTotalQuantity(newTotalQuantity);
  };

  useEffect(() => {
    const updatedVariants = adjustStockQty(variants, cart);
    setAdjustVariants(updatedVariants);

    updateTotalQty();
  }, [cart]);

  const resetOption = () => {
    setSelectedColor(null);
    setSelectedColorName(null);
    setSelectedSize(null);
    setSelectedQuantity(0);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color.code);
    setSelectedColorName(color.name);
    setSelectedSize(null);
    setSelectedQuantity(0);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setSelectedQuantity(0);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setSelectedQuantity(newQuantity);
  };

  const selectedVariant = adjustVariants.find(
    (variant) =>
      variant.color_code === selectedColor && variant.size === selectedSize
  );

  const recordMaximumStock = variants.find(
    (variant) =>
      variant.color_code === selectedColor && variant.size === selectedSize
  );

  function getStock(variant, color, size) {
    const matchingVariant = variant.find(
      (variant) => variant.color_code === color && variant.size === size
    );
    if (matchingVariant) {
      return matchingVariant.stock;
    } else {
      return null;
    }
  }

  const decreaseQuantity = () => {
    if (selectedSize) {
      const newQuantity = selectedQuantity - 1;
      if (newQuantity >= 1) {
        setSelectedQuantity(newQuantity);
      }
    }
  };

  const increaseQuantity = () => {
    if (selectedSize) {
      if (selectedQuantity < selectedVariant.stock) {
        setSelectedQuantity(selectedQuantity + 1);
      }
      if (
        selectedQuantity == selectedVariant.stock &&
        selectedVariant.stock !== 0
      ) {
        alert('已達商品上限');
      }
      if (selectedVariant.stock <= 0) {
        alert(
          `商品：${title}, 顏色：${selectedColorName}, 尺寸：${selectedSize}, 庫存：無`
        );
      }
    }
  };

  const handleAddToCart = () => {
    if (selectedColor && selectedSize && selectedQuantity > 0) {
      const existingProductIndex = cart.findIndex((item) => {
        return (
          item.id === id &&
          item.color.code === selectedColor &&
          item.size === selectedSize
        );
      });

      if (existingProductIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[existingProductIndex].qty += selectedQuantity;
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      } else {
        const newItem = {
          id: id,
          name: title,
          price: price,
          color: {
            code: selectedColor,
            name: selectedColorName,
          },
          size: selectedSize,
          qty: selectedQuantity,
          main_image: main_image,
          max_stock: recordMaximumStock.stock,
        };
        const updatedCart = [...cart, newItem];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }

      resetOption();
    }
  };

  let buttonText = '請選擇顏色';
  if (selectedColor && selectedSize && selectedQuantity > 0) {
    buttonText = '加入購物車';
  } else if (selectedSize) {
    buttonText = '請選擇件數';
  } else if (selectedColor) {
    buttonText = '請選擇尺寸';
  }

  return (
    <>
      <MainContent>
        <ProductSection1>
          <MainImg src={main_image} alt="Product main image" />
          <ProductDescription>
            <ProductTitle>{title}</ProductTitle>
            <ProductID>{id}</ProductID>
            <ProductPrice>TWD.{price}</ProductPrice>
            <HorizontalLine />
            <StockDetail>
              <StockVariableColor>
                <StockText>顏色｜</StockText>
                <Options>
                  {colors.map((colorOption) => (
                    <div
                      key={colorOption.code}
                      onClick={() => handleColorSelect(colorOption)}
                    >
                      <Color $isSelect={colorOption.code === selectedColor}>
                        <Box color={`#${colorOption.code}`} />
                      </Color>
                    </div>
                  ))}
                </Options>
              </StockVariableColor>
              <StockVariableSize>
                <StockText>尺寸｜</StockText>
                <Options>
                  {sizes.map((size) => (
                    <div
                      key={size}
                      onClick={() => selectedColor && handleSizeSelect(size)}
                    >
                      {getStock(adjustVariants, selectedColor, size) <= 0 ||
                      getStock(adjustVariants, selectedColor, size) === null ? (
                        <StockSizeBall color="#ECECEC" opacity="0.25">
                          <SizeUnselect>{size}</SizeUnselect>
                        </StockSizeBall>
                      ) : size === selectedSize ? (
                        <StockSizeBall color="#000000">
                          <SizeSelect>{size}</SizeSelect>
                        </StockSizeBall>
                      ) : (
                        <StockSizeBall color="#ECECEC">
                          <SizeUnselect>{size}</SizeUnselect>
                        </StockSizeBall>
                      )}
                    </div>
                  ))}
                </Options>
              </StockVariableSize>
              <StockVariableQty>
                <StockTextQty>數量｜</StockTextQty>
                <QtyBox>
                  <DecreaseQty
                    onClick={decreaseQuantity}
                    disabled={!selectedSize}
                  >
                    <QtySymbol>-</QtySymbol>
                  </DecreaseQty>
                  <QtySelected onChange={handleQuantityChange}>
                    <QtyText>{selectedQuantity}</QtyText>
                  </QtySelected>
                  <IncreaseQty
                    onClick={increaseQuantity}
                    disabled={!selectedSize}
                  >
                    <QtySymbol>+</QtySymbol>
                  </IncreaseQty>
                </QtyBox>
              </StockVariableQty>
              <Button
                disabled={
                  !selectedQuantity ||
                  !selectedColor ||
                  !selectedSize ||
                  selectedQuantity > selectedVariant?.stock
                }
                onClick={handleAddToCart}
              >
                {buttonText}
              </Button>
            </StockDetail>
            <ProductDetail>
              {note} <br /> <br />
              {texture} <br />
              {descriptionLines} <br />
              清洗：{wash} <br />
              產地：{place} <br />
            </ProductDetail>
          </ProductDescription>
        </ProductSection1>
        <ProductSection2>
          <ProductMoreInfo>
            <Subtitle>更多產品資訊</Subtitle>
            <SplitLine />
            <MoreDescription>{story}</MoreDescription>
          </ProductMoreInfo>
          {images.map((imageUrl, index) => (
            <MoreImg key={index} src={imageUrl} alt={`Image ${index}`} />
          ))}
        </ProductSection2>
      </MainContent>
    </>
  );
}

export default ProductContent;
