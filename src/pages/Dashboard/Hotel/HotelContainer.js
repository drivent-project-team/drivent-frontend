import { useState, useEffect } from 'react';
import { Container } from './HotelContainer.style';
import axios from 'axios'; //FIXME

function HotelContainer({ name, id, targetedHotel, setTargetedHotel, setTargetedRoom, image }) { //TODO
  const [accommodation, setAccommodation] = useState('Single');
  const [availableRooms, setAvailableRooms] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/hotels/${id}`, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3Nzg1NTEwNn0.1uPwuQX_pT2JXLjN-Bc2e8q6rrgWSazV7cagVZOaOJA'
        }
      })
      .then((res) => {
        let c = 0;
        res.data.Rooms.forEach((room) => {
          c++;
          if (room.capacity === 2 && accommodation !== 'Single, Double e Triple' && accommodation !== 'Single e Double') {
            setAccommodation('Single e Double');
          } else if (room.capacity === 3 && accommodation !== 'Single, Double e Triple') {
            setAccommodation('Single, Double e Triple');
          }
        });
        setAvailableRooms(c);
      });
  }, []);

  return (
    <Container onClick={() => {setTargetedRoom(0); setTargetedHotel(id); console.log(targetedHotel);}} targetedHotel={targetedHotel} id={id}>
      <img alt='Imagem do Hotel' src={image} />
      <h1>{name}</h1>
      <h2>Tipos de acomodação:</h2>
      <h3>{accommodation}</h3>
      <h2>Vagas disponíveis:</h2> 
      <h3>{availableRooms}</h3>
    </Container>
  );
}

export default function HotelContainerList({ setTargetedHotel, setTargetedRoom, targetedHotel }) {
  const [hotelList, setHotelList] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/hotels', {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3Nzg1NTEwNn0.1uPwuQX_pT2JXLjN-Bc2e8q6rrgWSazV7cagVZOaOJA'
        }
      })
      .then((res) => {
        setHotelList((res.data.map((hotel) => {
          return <HotelContainer name={hotel.name} key={hotel.id} id={hotel.id} image={hotel.image} setTargetedHotel={setTargetedHotel} setTargetedRoom={setTargetedRoom} targetedHotel={targetedHotel} />;
        })));
      });
  }, [targetedHotel]);

  return (
    <>
      {hotelList}
    </>
  );
};
