import { useContext, useEffect, useState } from 'react';
import DatesContainer from '../../../components/Dashboard/ActivitiesArea/DatesContainer';
import useToken from '../../../hooks/useToken';
import { getActivities, getPlaces } from '../../../services/activities';
import { getTicket } from '../../../services/ticketApi';
import { NoEnrollmentText, TitlePage } from '../Payment/style';
import PlacesContainer from '../../../components/Dashboard/ActivitiesArea/PlacesContainer';
import styled from 'styled-components';

export default function Activities() {
  const token = useToken();

  const [ activities, setActivities ] = useState();
  const [ dates, setDates ] = useState([]);
  const [ ticketInfo, setTicketInfo ] = useState('');
  const [ click, setClick ] = useState(false);
  const [ chosenDate, setChosenDate ] = useState('');
  const [ places, setPlaces] = useState([]);

  useEffect(async() => {
    try {
      const ticket = await getTicket(token);

      if (ticket.status === 'RESERVED') {
        setTicketInfo('notPaid');
        return;
      }
      if (ticket.TicketType.isRemote) {
        setTicketInfo('remote');
        return;
      }
      setTicketInfo('OK');
      const activities = await getActivities(token);
      const places = await getPlaces(token);
      setActivities(activities.activities);
      setDates(activities.eventDates);
      setPlaces(places);
    } catch (error) {
      setTicketInfo('notPaid');
      console.log(error);
    }
  }, []);

  if (ticketInfo !== 'OK') {
    return (
      <>
        <TitlePage>Escolha de hotel e quarto</TitlePage>
        <NoEnrollmentText>
          {ticketInfo === 'remote' && (
            <p>
              Sua modalidade de ingresso não necessita escolher <br /> atividade. Você terá acesso a todas as
              atividades.
            </p>
          )}
          {ticketInfo === 'notPaid' && (
            <p>
              Você precisa ter confirmado pagamento antes <br /> de fazer a escolha de atividades
            </p>
          )}
        </NoEnrollmentText>
      </>
    );
  }

  return (
    <ContainerIndexActivities>
      <TitlePage>Escolha de atividades</TitlePage>
      <DatesContainer dates={dates} setClick={setClick} click={click} setChosenDate={setChosenDate}></DatesContainer>
      {click && <PlacesContainer chosenDate={chosenDate} activities={activities} places={places}/>}
    </ContainerIndexActivities>
  );
}

const ContainerIndexActivities = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`;
