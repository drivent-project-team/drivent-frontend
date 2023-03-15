import { Container, Colorizer } from './RoomContainer.style';
import { IonIcon } from '@ionic/react';
import { personOutline } from 'ionicons/icons';
import { person } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useToken from '../../../hooks/useToken';

export function RoomContainer({ id, name, setTargetedRoom, targetedRoom, capacity, bookedRooms, setRoomObj }) {  
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    let arr = [];
    for (let i = 1; i <= capacity; i++) {
      if (i <= capacity - bookedRooms && (i + 1 > capacity || i + 1 > capacity - bookedRooms)) {
        arr.push(<Colorizer selected={targetedRoom === id ? true : false}><IonIcon key={i} icon={targetedRoom === id ? person : personOutline} /></Colorizer>);
      } 
      else if (i <= capacity - bookedRooms) {
        arr.push(<IonIcon key={i} icon={personOutline} />);
      } else {
        arr.push(<IonIcon key={i} icon={person} />);
      };
    };
    setVacancies(arr);
  }, [targetedRoom]);
  
  return (
    <Container onClick={bookedRooms === capacity ? console.log() : () => {setTargetedRoom(id); setRoomObj({
      name,
      capacity,
      bookedRooms
    });}} capacity={capacity} bookedRooms={bookedRooms} targetedRoom={targetedRoom} id={id}>
      <h1>{name}</h1>      
      <div>
        {vacancies}  
      </div>                 
    </Container>
  );
};

export function RoomContainerList({ targetedHotel, targetedRoom, setTargetedRoom, bookings, setRoomObj }) {
  const [roomList, setRoomList] = useState([]);
  const token = useToken();
  
  useEffect(() => {
    axios
      .get(`http://localhost:4000/hotels/${targetedHotel}`, { //FIXME
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setRoomList((res.data.Rooms.map(room => {
          let bookedRooms = 0;
          bookings.forEach((b) => {
            if(b.roomId === room.id) {
              bookedRooms = b.num_bookings;
            };
          });
          return <RoomContainer setRoomObj={setRoomObj} bookedRooms={bookedRooms} capacity={room.capacity} key={room.id} id={room.id} name={room.name} setTargetedRoom={setTargetedRoom} targetedRoom={targetedRoom} />;
        })));
      });
  }, [targetedRoom, targetedHotel]); 

  return (
    <>
      {roomList}
    </>
  );
};
