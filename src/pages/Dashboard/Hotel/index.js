import { Layout, UpperLayout, LowerLayout } from './style';
import { useState } from 'react';
import HotelContainerList from './HotelContainer';
import RoomContainer from './RoomContainer'; //FIXME
import { useEffect } from 'react';
import axios from 'axios';

export default function Hotel() {
  const [targetedRoom, setTargetedRoom] = useState(0);
  const [targetedHotel, setTargetedHotel] = useState(0);
  const [bookings, setBookings] = useState([]);
  
  useEffect(() => {
    axios
      .get('http://localhost:4000/booking/count', { //FIXME
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3Nzg1NTEwNn0.1uPwuQX_pT2JXLjN-Bc2e8q6rrgWSazV7cagVZOaOJA'
        }
      })
      .then((res) => {
        setBookings(res.data);
      });
  }, []);

  return (
    <Layout>
      <UpperLayout>
        <h1 onClick={() => console.log(targetedHotel)}>Escolha de hotel e quarto</h1>
        <h2>Primeiro, escolha seu hotel</h2>
        <div> 
          <HotelContainerList bookings={bookings} setTargetedHotel={setTargetedHotel} setTargetedRoom={setTargetedRoom} targetedHotel={targetedHotel} />
        </div>      
      </UpperLayout>
      <LowerLayout>
        {targetedHotel ? <h2>Ótima pedida! Agora escolha seu quarto:</h2> : ''}
        <div> {/*FIXME*/}
          <RoomContainer setTargetedRoom={setTargetedRoom} targetedRoom={targetedRoom} id={1} />
          <RoomContainer setTargetedRoom={setTargetedRoom} targetedRoom={targetedRoom} id={2} />
          <RoomContainer setTargetedRoom={setTargetedRoom} targetedRoom={targetedRoom} id={3} />
          <RoomContainer setTargetedRoom={setTargetedRoom} targetedRoom={targetedRoom} id={4} />       
        </div>
      </LowerLayout>
      {targetedRoom ? <button>RESERVAR QUARTO</button> : ''}      
    </Layout>
  );
};
