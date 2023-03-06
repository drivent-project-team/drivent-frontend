import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import { getPayment } from '../../../services/paymentApi';
import PaymentConfirmation from './PaymentConfirmation';
import PaymentForm from './PaymentForm';
import TicketData from './TicketData';
import TicketContext from '../../../contexts/TicketContext';

export default function PaymentArea() {
  const [showConfirmation, setConfirmation] = useState(false);
  const token = useToken();
  const { ticketReserved } = useContext(TicketContext);

  useEffect(async() => {
    try {
      const paid = await getPayment(token, ticketReserved.id);
      if (paid) {
        setConfirmation(true);
      }
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
    }
  }, []);
  return (
    <Container>
      <h1>Ingresso escolhido</h1>
      <TicketData />
      <h1>Pagamento</h1>
      {showConfirmation ? <PaymentConfirmation /> : <PaymentForm setConfirmation={setConfirmation} />}
    </Container>
  );
}

export const Container = styled.main`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  h1 {
    font-size: 20px;
    color: #8e8e8e;
    margin: 30px 0 15px 5px;
  }
`;
