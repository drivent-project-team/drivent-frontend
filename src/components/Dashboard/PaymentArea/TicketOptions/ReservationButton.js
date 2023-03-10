import { useContext } from 'react';
import TicketContext from '../../../../contexts/TicketContext';
import { DivChoice, DivPageContent, StyledReservationButton } from './styles/styles';
import { postTicket } from '../../../../services/ticketApi';
import { toast } from 'react-toastify';
import useToken from '../../../../hooks/useToken';

export default function ReservationButton({ setChangePage }) {
  const { setTicketReserved, ticketTypeSelected } =
    useContext(TicketContext);
  const token = useToken();

  return (
    <DivPageContent style={{ marginTop: '0px' }}>
      <DivChoice>
        Fechado! O total ficou em{' '}
        <strong>
          R${' '}
          {ticketTypeSelected.price}
        </strong>
        . Agora é só confirmar:
      </DivChoice>
      <StyledReservationButton
        onClick={async() => {
          try {
            const ticket = await postTicket({ ticketTypeId: ticketTypeSelected.id }, token);
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
