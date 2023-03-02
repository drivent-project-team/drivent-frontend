import styled from 'styled-components';
import PaymentConfirmation from './PaymentConfirmation';
import PaymentForm from './PaymentForm';
import TicketData from './TicketData';

export default function PaymentArea() {
  return (
    <Container>
      <h1>Ingresso escolhido</h1>
      <TicketData />
      <h1>Pagamento</h1>
      <PaymentConfirmation/>
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
