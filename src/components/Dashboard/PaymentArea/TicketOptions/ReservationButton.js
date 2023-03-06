import { useContext } from 'react';
import PaymentArea from '../Index';
import TicketContext from '../../../../contexts/TicketContext';
import { DivChoice, DivPageContent, StyledReservationButton } from './styles/styles';
import { postTicket } from '../../../../services/ticketApi';
import { toast } from 'react-toastify';
import useToken from '../../../../hooks/useToken';

export default function ReservationButton({ setChangePage }) {
  const { ticketReserved, setTicketReserved, ticketTypeSelected, setReservationSummary } = useContext(TicketContext);
  const token = useToken();

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
        onClick={async() => {
          const reservationData = {
            ticketType: ticketTypeSelected.name,
            includesHotel: ticketReserved.includesHotel,
            finalPrice: finalPrice,
          };
          try {
            const ticket = await postTicket({ ticketTypeId: ticketTypeSelected.id }, token);
            setReservationSummary(reservationData);
            setTicketReserved(ticket);
            setChangePage('payment');
            toast('Ticket inscrito com sucesso!');
          } catch (err) {
            toast('Não foi possível inscrever o ticket!');
          }
        }}
      >
        RESERVAR INGRESSO
      </StyledReservationButton>
    </DivPageContent>
  );
}
