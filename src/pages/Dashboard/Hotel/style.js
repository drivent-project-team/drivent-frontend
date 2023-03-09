import styled from 'styled-components';

export const Layout = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; //FIXME 

  h2 {
    font-size: 20px;
    line-height: 23px;
    color: #8E8E8E;
  }

  > button {
    background-color:  #E0E0E0;
    width: 182px;
    height: 37px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border: none;
    border-radius: 4px;
    margin-top: 45px;
    cursor: pointer;
  }
`;

export const UpperLayout = styled.div`
  margin-bottom: 50px;

  > h1 {
    font-size: 34px;
    line-height: 40px;
  }

  > h2 {
    margin-top: 36px;
    margin-bottom: 18px;
  }
  
  > div {
    display: flex;
    overflow: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const LowerLayout = styled.div`
  h2 {
    margin-bottom: 32px;
  }

  div {
    display: flex;
    flex-wrap: wrap;
  }
`;
