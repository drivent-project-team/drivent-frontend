import { Layout, UpperLayout, LowerLayout } from './style';
import { useState } from 'react';
import HotelContainerList from './HotelContainer';
import RoomContainer from './RoomContainer'; //FIXME

export default function Hotel() {
  const [targetedRoom, setTargetedRoom] = useState(0);
  const [targetedHotel, setTargetedHotel] = useState(0);

  return (
    <Layout>
      <UpperLayout>
        <h1 onClick={() => console.log(targetedHotel)}>Escolha de hotel e quarto</h1>
        <h2>Primeiro, escolha seu hotel</h2>
        <div> 
          <HotelContainerList setTargetedHotel={setTargetedHotel} setTargetedRoom={setTargetedRoom} targetedHotel={targetedHotel} />
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
