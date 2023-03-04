import { useContext } from 'react';
import PaymentArea from '..';
import TicketContext from '../../../../contexts/TicketContext';
import { DivChoice, DivPageContent, StyledReservationButton } from './styles/styles';


export default function ReservationButton() {
  const { ticketReserved, ticketTypeSelected } = useContext(TicketContext);

  const total = ticketReserved.price + ticketTypeSelected.price;

  return (
    <DivPageContent style={{ marginTop: '0px' }}>
      <DivChoice>
        Fechado! O total ficou em <strong>R$ {ticketReserved.name === 'presencial' && ticketReserved.includesHotel ? total : ticketReserved.price + 0 || ticketTypeSelected.name === 'online' ? ticketTypeSelected.price : null}
        </strong>
        . Agora é só confirmar:
      </DivChoice>
      <StyledReservationButton onclick={<PaymentArea/>}>RESERVAR INGRESSO</StyledReservationButton>
    </DivPageContent>
  );
}
