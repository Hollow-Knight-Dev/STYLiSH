import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import styled from "styled-components";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Checkout from "./pages/Checkout";
import Product from "./pages/Product";
import media from "./utils/media";

const MainContent = styled.div`
  min-height: 100vh;
`;

const PaddingTop = styled.div`
  width: 100vw;
  height: 140px;

  ${media.mobile`
    height: 102px;
  `}
`;

const PaddingBottom = styled.div`
  ${media.mobile`
    height: 60px;
  `}
`;

function App() {
  const [totalQuantity, setTotalQuantity] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const newTotalQuantity = savedCart.reduce(
      (total, item) => total + item.qty,
      0
    );
    return newTotalQuantity;
  });

  return (
    <Router>
      <Header totalQuantity={totalQuantity} />
      <PaddingTop />
      <MainContent>
        <Routes>
          <Route
            path="/product/:id"
            element={<Product setTotalQuantity={setTotalQuantity} />}
          />
          <Route
            path="/checkout"
            element={<Checkout setTotalQuantity={setTotalQuantity} />}
          />
        </Routes>
      </MainContent>
      <Footer />
      <PaddingBottom />
    </Router>
  );
}

export default App;
