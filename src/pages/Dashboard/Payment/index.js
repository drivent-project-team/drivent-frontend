import { useContext, useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import { getEnrollmentUser } from '../../../services/paymentApi';
import { TitlePage, ContainerPayment, NoEnrollmentText } from './style';
import TicketTypeOptions from '../../../components/Dashboard/PaymentArea/TicketOptions/TicketTypeOptions';
import TicketContext from '../../../contexts/TicketContext';
import HotelOptions from '../../../components/Dashboard/PaymentArea/TicketOptions/HotelOptions';
import ReservationButton from '../../../components/Dashboard/PaymentArea/TicketOptions/ReservationButton';
import PaymentArea from '../../../components/Dashboard/PaymentArea/Index';
import { getTicket, getTicketTypes } from '../../../services/ticketApi';

export default function Payment() {
  const [status, setStatus] = useState(null);
  const [ticketTypes, setTicketTypes] = useState(null);
  const [changePage, setChangePage] = useState('tickets');

  const token = useToken();

  const { ticketTypeSelected, setTicketReserved, showHotelOptions, showReservationButton } =
    useContext(TicketContext);

  useEffect(async() => {
    try {
      const ticketTypes = await getTicketTypes(token);
      setTicketTypes(ticketTypes);
      await enrollmentRequest();
      const ticket = await getTicket(token);
      
      setTicketReserved(ticket);
      setChangePage('payment');
    } catch (error) {
      console.log(error.response?.data);
      console.log(error.response?.status);
    }
  }, []);

  async function enrollmentRequest() {
    try {
      const response = await getEnrollmentUser(token);
      setStatus(response);
    } catch (error) {
      if(error.response) {
        setStatus(error.response.status);
      }
      console.log(error.response?.status);
    }
  }

  if (status === null) {
    return 'Carregando';
  }

  if (status === 404) {
    return (
      <>
        <TitlePage>Ingresso e pagamento</TitlePage>
        <NoEnrollmentText>
          <p>
            Você precisa completar sua inscrição antes <br /> de prosseguir pra escolha de ingresso
          </p>
        </NoEnrollmentText>
      </>
    );
  }

  return (
    <>
      <TitlePage>Ingresso e pagamento</TitlePage>
      {changePage === 'tickets' ? (
        <ContainerPayment>
          {ticketTypes !== null ? <TicketTypeOptions tickets={ticketTypes} /> : 'carregando'}
          {showHotelOptions && <HotelOptions ticketTypes={ticketTypes} ticket={ticketTypeSelected} />}
          {(showReservationButton || ticketTypeSelected.name === 'online') && (
            <ReservationButton setChangePage={setChangePage} />
          )}
        </ContainerPayment>
      ) : (
        <PaymentArea />
      )}
    </>
  );
}
