import { Container } from './RoomContainer.style';
import { IonIcon } from '@ionic/react';
import { personOutline } from 'ionicons/icons';
import { person } from 'ionicons/icons';

export default function RoomContainer({ id, name, setTargetedRoom, targetedRoom }) {
  return (
    <Container onClick={() => setTargetedRoom(id)} targetedRoom={targetedRoom} id={id}>
      <h1>{name}101 {/*FIXME*/}</h1>      
      <div>
        <IonIcon icon={personOutline} />
        <IonIcon icon={person} /> 
      </div>                 
    </Container>
  );
};
