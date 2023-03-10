import { Layout, UpperLayout, LowerLayout } from './style';
import { useContext, useEffect, useState } from 'react';
import HotelContainerList from './HotelContainer';
import RoomContainer from './RoomContainer'; //FIXME
import useToken from '../../../hooks/useToken';
import TicketContext from '../../../contexts/TicketContext';
import { getTicket } from '../../../services/ticketApi';
import { getPayment } from '../../../services/paymentApi';
import { NoEnrollmentText, TitlePage } from '../Payment/style';

export default function Hotel() {
  const [targetedRoom, setTargetedRoom] = useState(0);
  const [targetedHotel, setTargetedHotel] = useState(0);
  const [ticketInfo, setTicketInfo] = useState('');
  const { setTicketReserved } = useContext(TicketContext);
  const token = useToken();

  useEffect(async() => {
    try {
      const ticket = await getTicket(token);

      setTicketReserved(ticket);
      if (!ticket.TicketType.includesHotel) {
        setTicketInfo('notIncludeHotel');
      } else if (ticket.status === 'PAID') {
        setTicketInfo('OK');
        return;
      } else {
        setTicketInfo('notPaid');
      }
    } catch (error) {
      setTicketInfo('notPaid');
      console.log(error.response?.status);
    }
  }, []);

  if (ticketInfo !== 'OK') {
    return (
      <>
        <TitlePage>Escolha de hotel e quarto</TitlePage>
        <NoEnrollmentText>
          {ticketInfo === 'notIncludeHotel' && (
            <p>
              Sua modalidade de ingresso não inclui hospedagem <br /> Prossiga para a escolha de atividades
            </p>
          )}
          {ticketInfo === 'notPaid' && (
            <p>
              Você precisa ter confirmado pagamento antes <br /> de fazer a escolha de hospedagem
            </p>
          )}
        </NoEnrollmentText>
      </>
    );
  }

  return (
    <Layout>
      <UpperLayout>
        <h1 onClick={() => console.log(targetedHotel)}>Escolha de hotel e quarto</h1>
        <h2>Primeiro, escolha seu hotel</h2>
        <div>
          <HotelContainerList
            setTargetedHotel={setTargetedHotel}
            setTargetedRoom={setTargetedRoom}
            targetedHotel={targetedHotel}
          />
        </div>
      </UpperLayout>
      <LowerLayout>
        {targetedHotel ? <h2>Ótima pedida! Agora escolha seu quarto:</h2> : ''}
        <div>
          {' '}
          {/*FIXME*/}
          <RoomContainer setTargetedRoom={setTargetedRoom} targetedRoom={targetedRoom} id={1} />
          <RoomContainer setTargetedRoom={setTargetedRoom} targetedRoom={targetedRoom} id={2} />
          <RoomContainer setTargetedRoom={setTargetedRoom} targetedRoom={targetedRoom} id={3} />
          <RoomContainer setTargetedRoom={setTargetedRoom} targetedRoom={targetedRoom} id={4} />
        </div>
      </LowerLayout>
      {targetedRoom ? <button>RESERVAR QUARTO</button> : ''}
    </Layout>
  );
}
