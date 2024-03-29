import { useState, useEffect, useContext } from 'react';
import { Container, PageContainer } from './HotelContainer.style';
import axios from 'axios'; //FIXME
import useToken from '../../../hooks/useToken';
import TicketContext from '../../../contexts/TicketContext';

function HotelContainer({ name, id, targetedHotel, setTargetedHotel, setTargetedRoom, image, bookings, roomObj }) {
  //TODO
  const [accommodation, setAccommodation] = useState('Single');
  const [availableRooms, setAvailableRooms] = useState(0);
  const { showHotelReservationSummary } = useContext(TicketContext);

  const token = useToken();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/hotels/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let c = 0;
        res.data.Rooms.forEach((room) => {
          let capacity = room.capacity;
          bookings.forEach((bookedRoom) => {
            if (bookedRoom.roomId === room.id) {
              capacity -= bookedRoom.num_bookings;
            }
          });
          c += capacity;
          if (
            room.capacity === 2 &&
            accommodation !== 'Single, Double e Triple' &&
            accommodation !== 'Single e Double'
          ) {
            setAccommodation('Single e Double');
          } else if (room.capacity === 3 && accommodation !== 'Single, Double e Triple') {
            setAccommodation('Single, Double e Triple');
          }
        });
        setAvailableRooms(c);
      });
  }, [bookings]);

  return (
    <>
      {showHotelReservationSummary ? (
        <Container
          onClick={() => {
            setTargetedRoom(0);
            setTargetedHotel(id);
            console.log(targetedHotel);
          }}
          targetedHotel={targetedHotel}
          id={id}
        >
          <img alt="Imagem do Hotel" src={image} />
          <h1>{name}</h1>
          <h2>Quarto reservado:</h2>
          <h3>
            {roomObj.name} ({roomObj.capacity === 2 ? 'Double' : roomObj.capacity === 3 ? 'Triple' : 'Single'})
          </h3>
          <h2>Pessoas no seu quarto:</h2>
          <h3>Você e mais {roomObj.bookedRooms} pessoas</h3>
        </Container>
      ) : (
        <Container
          onClick={() => {
            setTargetedRoom(0);
            setTargetedHotel(id);
            console.log(targetedHotel);
          }}
          targetedHotel={targetedHotel}
          id={id}
        >
          <img alt="Imagem do Hotel" src={image} />
          <h1>{name}</h1>
          <h2>Tipos de acomodação:</h2>
          <h3>{accommodation}</h3>
          <h2>Vagas disponíveis:</h2>
          <h3>{availableRooms}</h3>
        </Container>
      )}
    </>
  );
}

export default function HotelContainerList({ setTargetedHotel, setTargetedRoom, targetedHotel, bookings, roomObj }) {
  const [hotelList, setHotelList] = useState([]);
  const token = useToken();
  const { showHotelReservationSummary } = useContext(TicketContext);

  useEffect(() => {
    axios
      .get('http://localhost:4000/hotels', {
        //FIXME
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let hotelsToRender = res.data;
        if (showHotelReservationSummary && targetedHotel) {
          hotelsToRender = res.data.filter((hotel) => hotel.id === targetedHotel);
        }
        setHotelList(
          hotelsToRender.map((hotel) => (
            <HotelContainer
              name={hotel.name}
              key={hotel.id}
              id={hotel.id}
              image={hotel.image}
              setTargetedHotel={setTargetedHotel}
              setTargetedRoom={setTargetedRoom}
              targetedHotel={targetedHotel}
              bookings={bookings}
              roomObj={roomObj}
            />
          ))
        );
      });
  }, [targetedHotel, showHotelReservationSummary, bookings]);

  return <>{hotelList}</>;
}
