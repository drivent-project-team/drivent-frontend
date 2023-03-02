import { AiFillCheckCircle } from 'react-icons/ai';
import styled from 'styled-components';

export default function PaymentConfirmation() {
  return (
    <Container>
      <AiFillCheckCircle color="#36b853" size="44px" />
      <TextStyle>
        <h2>Pagamento confirmado!</h2>
        <h3>Prossiga para escolha de hospedagem e atividades</h3>
      </TextStyle>
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TextStyle = styled.div`
  font-size: 16px;
  color: #454545;
  Line-height: 18.75px;
  h2 {
    font-weight: 700;
  }
  h3 {
    font-weight: 400;
  }
`;
