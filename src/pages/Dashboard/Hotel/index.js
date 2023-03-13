import { Layout, UpperLayout, LowerLayout } from './style';
import { useContext, useEffect, useState } from 'react';
import HotelContainerList from './HotelContainer';
import { RoomContainerList } from './RoomContainer'; //FIXME
import axios from 'axios';
import useToken from '../../../hooks/useToken';
import TicketContext from '../../../contexts/TicketContext';
import { getTicket } from '../../../services/ticketApi';
import { getPayment } from '../../../services/paymentApi';
import { NoEnrollmentText, TitlePage } from '../Payment/style';
import { StyledReservationButton } from '../../../components/Dashboard/PaymentArea/TicketOptions/styles/styles';

export default function Hotel() {
  const [targetedRoom, setTargetedRoom] = useState(0);
  const [targetedHotel, setTargetedHotel] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [ticketInfo, setTicketInfo] = useState('');
  const [roomObj, setRoomObj] = useState({});
  const { setTicketReserved, setShowHotelReservationSummary, showHotelReservationSummary } = useContext(TicketContext);
  const token = useToken();

  useEffect(() => {
    axios
      .get('http://localhost:4000/booking/count', { //FIXME
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setBookings(res.data);
      });
  }, []);

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

  console.log(targetedHotel);
  return (
    <Layout>
      <UpperLayout>
        <h1 onClick={() => console.log(roomObj)}>Escolha de hotel e quarto</h1>
        {showHotelReservationSummary ? <h2>Você já escolheu seu quarto:</h2> : <h2>Primeiro, escolha seu hotel</h2>}
        <div>
          <HotelContainerList
            setTargetedHotel={setTargetedHotel}
            setTargetedRoom={setTargetedRoom}
            targetedHotel={targetedHotel}
            bookings={bookings}
          />
        </div>
      </UpperLayout>
      
      {showHotelReservationSummary ? (
        <StyledReservationButton
          onClick={() => {
            setShowHotelReservationSummary(false);
          }}
        >
          TROCAR DE QUARTO
        </StyledReservationButton>
      ) : (
        <LowerLayout>
          {targetedHotel && !showHotelReservationSummary ? <h2>Ótima pedida! Agora escolha seu quarto:</h2> : ''}
          <div>
            {targetedHotel ? <RoomContainerList setRoomObj={setRoomObj} bookings={bookings} targetedHotel={targetedHotel} setTargetedRoom={setTargetedRoom} targetedRoom={targetedRoom} /> : ''}
          </div>
          {targetedRoom ? (
            <StyledReservationButton
              onClick={() => {
                setShowHotelReservationSummary(true);
              }}
            >
              RESERVAR QUARTO
            </StyledReservationButton>
          ) : (
            ''
          )}
        </LowerLayout>
      )}
      
    </Layout>
  );
}
