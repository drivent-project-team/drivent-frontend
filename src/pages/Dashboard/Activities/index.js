import { useContext, useEffect, useState } from 'react';
import DatesContainer from '../../../components/Dashboard/ActivitiesArea/DatesContainer';
import useToken from '../../../hooks/useToken';
import { getActivities } from '../../../services/activities';
import { TitlePage } from '../Payment/style';

export default function Activities() {
  const token = useToken();

  const [activities, setActivities] = useState();
  const [dates, setDates] = useState([]);

  useEffect(async() => {
    try {
      const activities = await getActivities(token);
      setActivities(activities.activities);
      setDates(activities.eventDates);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <TitlePage>Escolha de atividades</TitlePage>
      <DatesContainer dates={dates}></DatesContainer>
    </>
  );
}
