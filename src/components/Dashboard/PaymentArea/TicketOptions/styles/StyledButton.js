import styled from 'styled-components';

export const StyledButtons = styled.div`
  width: 145px;
  height: 145px;
  left: 341px;
  top: 323px;
  box-sizing: border-box;
  border: 1px solid #cecece;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24px;
  &:hover {
    background-color: #ffeed2;
    border: 1px solid #ffffff;
  }
  &.selected {
    background-color: #ffeed2;
    border: 1px solid #ffffff;
  }
  span {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #454545;
  }
  p {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #898989;
  }
  div {
    text-align: center;
  }
`;
