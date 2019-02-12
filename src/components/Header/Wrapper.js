import styled from "styled-components";

const Wrapper = styled.div`
  .logo {
    display: inline-block;
    vertical-align: bottom;
    padding: 20px 0px;
    float: left;
  }
  .logo img {
    max-height: 60px;
    padding: 0.8em 0;
    max-width: 100%;
  }

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    .site-name {
      display: block;
    }
    a, img {
      max-width: 100%;
    }
  }
`;

export default Wrapper;
