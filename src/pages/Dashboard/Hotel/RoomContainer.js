import { Container } from './RoomContainer.style';
import { IonIcon } from '@ionic/react';
import { personOutline } from 'ionicons/icons';
import { person } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

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

function RoomContainerList({ targetedHotel, targetedRoom, setTargetedRoom }) {
  const [roomList, setRoomList] = useState([]);
  
  useEffect(() => {
    axios
      .get(`http://localhost:4000/hotels/${targetedHotel}`, { //FIXME
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3Nzg1NTEwNn0.1uPwuQX_pT2JXLjN-Bc2e8q6rrgWSazV7cagVZOaOJA'
        }
      })
      .then((res) => {
      });
  }, [targetedRoom]);
};
