import { useContext, useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import TicketContext from '../../../contexts/TicketContext';
import useToken from '../../../hooks/useToken';
import { postPayment } from '../../../services/paymentApi';
import { StyledReservationButton } from './TicketOptions/styles/styles';

export default function PaymentForm() {
  const token = useToken();
  const { ticketReserved, setTicketReserved } = useContext(TicketContext);
  const [issuer, setIssuer] = useState('');
  const [paymentData, setData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  function handleForm(e) {
    setData({ ...paymentData, [e.target.name]: e.target.value });
  }

  function handleInputFocus(e) {
    setData({ ...paymentData, focus: e.target.name });
  }

  function handleCallback({ issuer }, isValid) {
    if (isValid) {
      setIssuer(issuer);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const cardData = {
      number: paymentData.number,
      name: paymentData.name,
      expirationDate: paymentData.expiry,
      cvv: paymentData.cvc,
      issuer,
    };

    try {
      await postPayment({ ticketId: ticketReserved.id, cardData }, token);
      setTicketReserved({ ...ticketReserved, status: 'PAID' });
      toast('Pagamento feito com sucesso!');
    } catch (err) {
      toast('Não foi possível fazer o pagamento!');
    }
  }

  return (
    <Container>
      <Cards
        number={paymentData.number}
        expiry={paymentData.expiry}
        cvc={paymentData.cvc}
        name={paymentData.name}
        focused={paymentData.focus}
        callback={handleCallback}
      />

      <form onSubmit={handleSubmit}>
        <div>
          <LargeInput
            name="number"
            placeholder="Card Number"
            value={paymentData.number}
            onChange={handleForm}
            onFocus={handleInputFocus}
            required
          />
          <p>E.g.: 49..., 51..., 36, 37...</p>
        </div>
        <LargeInput
          name="name"
          placeholder="Name"
          value={paymentData.name}
          onChange={handleForm}
          onFocus={handleInputFocus}
          required
        />
        <ExpiryCVCDiv>
          <ExpiryInput
            name="expiry"
            placeholder="Valid Thru"
            value={paymentData.expiry}
            onChange={handleForm}
            onFocus={handleInputFocus}
            required
          />
          <CVCInput
            name="cvc"
            placeholder="CVC"
            value={paymentData.cvc}
            onChange={handleForm}
            onFocus={handleInputFocus}
          />
        </ExpiryCVCDiv>
        <StyledReservationButton>FINALIZAR PAGAMENTO</StyledReservationButton>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    color: #929292;
    input {
      height: 45px;
      border-radius: 5px;
      border: 1px solid #c9c9c9;
      padding-left: 10px;
      ::placeholder {
        opacity: 1;
        color: #929292;
        font-size: 18px;
        font-family: 'Roboto', sans-serif;
      }
    }
    p {
      margin-top: 5px;
    }
  }
`;

const ExpiryCVCDiv = styled.div`
  display: flex;
  gap: 20px;
`;

const LargeInput = styled.input`
  width: 350px;
`;

const ExpiryInput = styled.input`
  width: 210px;
`;

const CVCInput = styled.input`
  width: 120px;
`;
