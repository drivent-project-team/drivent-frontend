import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import { getEnrollmentUser, getTickets } from '../../../services/paymentApi';
import OptionsButtons from '../../../components/OptionsButtons';
import { TitlePage, ContainerPayment, DivPageContent, BoxButtons, DivChoice } from './style';

export default function Payment() {
  const [status, sendStatus] = useState(null);
  const [ticketTypes, sendTicketTypes] = useState(null);
  const token = useToken();

  useEffect(() => {
    requistion();
    ticket();
  }, []);

  async function requistion() {
    try {
      const resposta = await getEnrollmentUser(token);
      sendStatus(resposta);
    } catch (error) {
      sendStatus(error.response.status);
      console.log(error.response.data);
      console.log(error.response.status);
    }
  }

  async function ticket() {
    try {
      const tickets = await getTickets(token);
      sendTicketTypes(tickets);
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
      <ContainerPayment>
        {status === 404 ? (
          <span>
            Você precisa completar sua inscrição antes <br /> de prosseguir pra escolha de ingresso
          </span>
        ) : ticketTypes !== null ? (
          <DivPageContent>
            <DivChoice>Primeiro, escolha sua modalidade de ingresso</DivChoice>
            <BoxButtons>
              {ticketTypes.map((t) => (
                <OptionsButtons firstParam={t.name} secondParam={t.price} />
              ))}
            </BoxButtons>
          </DivPageContent>
        ) : (
          <></>
        )}
      </ContainerPayment>
    </>
  );
}
