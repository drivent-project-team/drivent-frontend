import { useContext } from 'react';
import PaymentArea from '../Index';
import TicketContext from '../../../../contexts/TicketContext';
import { DivChoice, DivPageContent, StyledReservationButton } from './styles/styles';

export default function ReservationButton({ setChangePage }) {
  const { ticketReserved, ticketTypeSelected, reservationSummary, setReservationSummary } = useContext(TicketContext);

  const total = ticketReserved.price + ticketTypeSelected.price;

  let finalPrice;

  if (ticketTypeSelected.name === 'presencial' && ticketReserved.includesHotel) {
    finalPrice = ticketTypeSelected.price + ticketReserved.price;
  }

  if (ticketTypeSelected.name === 'presencial' && !ticketReserved.includesHotel) {
    finalPrice = ticketTypeSelected.price + 0;
  }

  if (ticketTypeSelected.name === 'online') {
    finalPrice = ticketTypeSelected.price;
  }

  return (
    <DivPageContent style={{ marginTop: '0px' }}>
      <DivChoice>
        Fechado! O total ficou em{' '}
        <strong>
          R${' '}
          {ticketReserved.name === 'presencial' && ticketReserved.includesHotel
            ? total
            : ticketReserved.price + 0 || ticketTypeSelected.name === 'online'
              ? ticketTypeSelected.price
              : null}
        </strong>
        . Agora é só confirmar:
      </DivChoice>
      <StyledReservationButton
        onClick={() => {
          const reservationData = {
            ticketType: ticketTypeSelected.name,
            includesHotel: ticketReserved.includesHotel,
            finalPrice: finalPrice,
          };
          setChangePage('payment');
          setReservationSummary(reservationData);
        }}
      >
        RESERVAR INGRESSO
      </StyledReservationButton>
    </DivPageContent>
  );
}
