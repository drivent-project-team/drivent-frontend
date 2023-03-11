import styled from 'styled-components';

export const Container = styled.button`
  width: 190px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #CECECE;
  border-radius: 10px;
  margin-right: 17px;
  margin-bottom: 8px;
  background-color: ${props => props.targetedRoom === props.id ? '#FFEED2' : '#fff'};

  h1 {
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: #454545;
  }

  &&:hover {
    filter: brightness(95%);
    cursor: pointer;
  }

  ion-icon {
    margin-left: 3px;
    font-size: 23px;
    color: #FF4791;
;
  }
`;
