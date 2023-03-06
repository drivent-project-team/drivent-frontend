import { useContext, useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import { getEnrollmentUser, getPayment } from '../../../services/paymentApi';
import { TitlePage, ContainerPayment } from './style';
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

  const { ticketTypeSelected, setTicketReserved, showHotelOptions, showReservationButton, setReservationSummary } = useContext(TicketContext);

  useEffect(async() => {
    try {
      const response = await getEnrollmentUser(token);
      setStatus(response);

      const ticketReserved = await getTicket(token);
      if (ticketReserved) {
        setReservationSummary({
          ticketType: ticketReserved.TicketType.name,
          includesHotel: ticketReserved.includesHotel,
          finalPrice: ticketReserved.TicketType.price,
        });
        setTicketReserved(ticketReserved);
        setChangePage('payment');
      } else {
        const ticketTypes = await getTicketTypes(token);
        setTicketTypes(ticketTypes);
      }
    } catch (error) {
      setStatus(error.response.status);
      console.log(error.response.data);
      console.log(error.response.status);
    }
  }, []);

  if (status === null) {
    return 'Carregando';
  }

  return (
    <>
      <TitlePage>Ingresso e pagamento</TitlePage>
      {changePage === 'tickets' ? (
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
