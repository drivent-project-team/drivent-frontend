import styled from 'styled-components';
import { useContext } from 'react';
import TicketContext from '../../../contexts/TicketContext';

export default function TicketData() {
  const { ticketReserved } = useContext(TicketContext);
  const ticketName = ticketReserved.TicketType.name;

  return (
    <TicketStyle>
      <h2>
        {ticketName.charAt(0).toUpperCase() + ticketName.slice(1)}{' '}
        {ticketReserved.TicketType.includesHotel === true ? '+ Com Hotel' : ''}
      </h2>
      <p>R$ {ticketReserved.TicketType.price}</p>
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
