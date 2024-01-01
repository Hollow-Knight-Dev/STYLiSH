import React from "react";
import styled from "styled-components";
import loaderGif from "/images/loader.gif";

const Loader = styled.div`
  display: flex;
  justify-content: center;
`;

const Gif = styled.img`
  padding-top: 50px;
  width: 20%;
`

function Loading() {
  return (
    <Loader>
      <Gif src={loaderGif} alt="Loader" />
    </Loader>
  );
}

export default Loading;