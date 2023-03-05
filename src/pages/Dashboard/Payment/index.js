import { useContext, useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import { getEnrollmentUser, getTickets } from '../../../services/paymentApi';
import { TitlePage, ContainerPayment } from './style';
import TicketTypeOptions from '../../../components/Dashboard/PaymentArea/TicketOptions/TicketTypeOptions';
import TicketContext from '../../../contexts/TicketContext';
import HotelOptions from '../../../components/Dashboard/PaymentArea/TicketOptions/HotelOptions';
import ReservationButton from '../../../components/Dashboard/PaymentArea/TicketOptions/ReservationButton';
import Index from '../../../components/Dashboard/PaymentArea/Index';

export default function Payment() {
  const [status, setStatus] = useState(null);
  const [ticketTypes, setTicketTypes] = useState(null);
  const [changePage, setChangePage] = useState('tickets');

  const token = useToken();

  const { ticketTypeSelected, showHotelOptions, showReservationButton } = useContext(TicketContext);

  useEffect(() => {
    requistion();
    ticket();
  }, []);

  async function requistion() {
    try {
      const resposta = await getEnrollmentUser(token);
      setStatus(resposta);
    } catch (error) {
      setStatus(error.response.status);
      console.log(error.response.data);
      console.log(error.response.status);
    }
  }

  async function ticket() {
    try {
      const tickets = await getTickets(token);
      setTicketTypes(tickets);
    } catch (error) {
      console.log(error);
    }
  }

  if (status === null) {
    return 'Carregando';
  }

  return (
    <>
      <TitlePage>Ingresso e pagamento</TitlePage>
      {changePage === 'tickets' ? 
        <ContainerPayment>
          {status === 404 ? (
            <span>
              Você precisa completar sua inscrição antes <br /> de prosseguir pra escolha de ingresso
            </span>
          ) : ticketTypes !== null ? (
            <TicketTypeOptions tickets={ticketTypes} />
          ) : (
            'carregando'
          )}
          {showHotelOptions ? <HotelOptions ticketTypes={ticketTypes} ticket={ticketTypeSelected} /> : null}
          {showReservationButton || ticketTypeSelected.name === 'online' ? <ReservationButton setChangePage={setChangePage}/> : null}
        </ContainerPayment>
        :
        <Index /> }
    </>
  );
}
