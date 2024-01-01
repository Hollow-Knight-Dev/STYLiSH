import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import ProductContent from "./ProductContent";

const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Product({ setTotalQuantity }) {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  function resetPagePosition() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.appworks-school.tw/api/1.0/products/details?id=${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProduct(data.data);
        setIsLoading(false);
      } catch (hasError) {
        console.error(hasError);
        setIsLoading(false);
        setHasError(true);
      }
    }

    fetchData();
  }, [id]);

  return (
    <>
      {isLoading && <Loading />}
      {hasError && <Error />}
      {!isLoading &&
        !hasError &&
        (product ? (
          <Main>
            <ProductContent
              product={product}
              setTotalQuantity={setTotalQuantity}
            />
            <Button onClick={resetPagePosition} text="回頂端" />
          </Main>
        ) : (
          <Error />
        ))}
    </>
  );
}

export default Product;
