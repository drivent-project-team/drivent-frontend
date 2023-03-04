import { useContext, useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import { getEnrollmentUser, getTickets } from '../../../services/paymentApi';
import { TitlePage, ContainerPayment } from './style';
import TicketTypeOptions from '../../../components/Dashboard/PaymentArea/TicketOptions/TicketTypeOptions';
import TicketContext from '../../../contexts/TicketContext';
import HotelOptions from '../../../components/Dashboard/PaymentArea/TicketOptions/HotelOptions';

export default function Payment() {
  const [status, setStatus] = useState(null);
  const [ticketTypes, setTicketTypes] = useState([]);

  const token = useToken();

  const { ticketTypeSelected, selectedButtons, showHotelOptions, setSelectedButtons } = useContext(TicketContext);

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

  console.log(selectedButtons);
  return (
    <>
      <TitlePage>Ingresso e pagamento</TitlePage>
      <ContainerPayment>
        {status === 404 ? (
          <span>
            Você precisa completar sua inscrição antes <br /> de prosseguir pra escolha de ingresso
          </span>
        ) : (
          <TicketTypeOptions tickets={ticketTypes} />
        )}
        {showHotelOptions ? <HotelOptions ticketTypes={ticketTypes} ticket={ticketTypeSelected} /> 
          : null}
      </ContainerPayment>
    </>
  );
}
