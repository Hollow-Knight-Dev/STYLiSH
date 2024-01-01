import { css } from "styled-components";

const media = {
  mobile: (...args) => css`
    @media (max-width: 1279px) {
      ${css(...args)};
    }
  `,
};

export default media;
