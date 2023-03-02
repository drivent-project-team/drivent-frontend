import styled from 'styled-components';

export default function TicketData() {
  return (
    <TicketStyle>
      <h2>Presencial + Com Hotel</h2>
      <p>R$ 600</p>
    </TicketStyle>
  );
}

export const TicketStyle = styled.div`
  width: 290px;
  height: 108px;
  background-color: #ffeed2;
  border-radius: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  h2 {
    font-size: 16px;
    color: #454545;
  }
  p {
    font-size: 14px;
    color: #898989;
  }
`;
