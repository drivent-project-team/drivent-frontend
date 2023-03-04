import { useEffect, useState } from 'react';
import { createContext } from 'react';

const TicketContext = createContext();
export default TicketContext;

export function TicketProvider({ children }) {
  const [ticketTypeSelected, setTicketTypeSelected] = useState([]);
  const [ticketReserved, setTicketReserved] = useState({});
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [showHotelOptions, setShowHotelOptions] = useState(false);
  const [showReservationButton, setShoeReservationButton] = useState(false);
  const [reservationSummary, setReservationSummary] = useState([]);

  return (
    <TicketContext.Provider
      value={{
        ticketTypeSelected,
        setTicketTypeSelected,
        ticketReserved,
        setTicketReserved,
        selectedButtons,
        setSelectedButtons,
        showHotelOptions,
        setShowHotelOptions,
        showReservationButton,
        setShoeReservationButton,
        reservationSummary,
        setReservationSummary,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}
