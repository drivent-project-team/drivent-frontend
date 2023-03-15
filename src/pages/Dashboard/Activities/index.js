import { useContext, useEffect, useState } from 'react';
import DatesContainer from '../../../components/Dashboard/ActivitiesArea/DatesContainer';
import useToken from '../../../hooks/useToken';
import { getActivities } from '../../../services/activities';
import { getTicket } from '../../../services/ticketApi';
import { NoEnrollmentText, TitlePage } from '../Payment/style';

export default function Activities() {
  const token = useToken();

  const [activities, setActivities] = useState();
  const [dates, setDates] = useState([]);
  const [ticketInfo, setTicketInfo] = useState('');

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
      setActivities(activities.activities);
      setDates(activities.eventDates);
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
    <>
      <TitlePage>Escolha de atividades</TitlePage>
      <DatesContainer dates={dates}></DatesContainer>
    </>
  );
}
