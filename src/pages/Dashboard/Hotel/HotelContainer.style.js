import styled from 'styled-components';

export const Container = styled.button`
  border: none;
  text-align: left;
  background-color: ${(props) => (props.targetedHotel === props.id ? '#FFEED2' : '#EBEBEB')};
  width: 196px;
  height: 264px;
  border-radius: 10px;
  margin-right: 19px;
  flex-direction: column;
  padding: 14px;

  &&:hover {
    filter: brightness(95%);
    cursor: pointer;
  }

  img {
    border-radius: 5px;
    width: 168px;
    height: 109px;
  }

  h1 {
    color: #343434;
    font-size: 20px;
    line-height: 23px;
    margin: 10px 0px;
  }

  h2 {
    margin: 0px;
    margin-bottom: 2px;
    color: #3c3c3c;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
  }

  > h3 {
    color: #3c3c3c;
    font-size: 12px;
    line-height: 14px;
    margin-bottom: 13px;
  }
`;
