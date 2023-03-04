import { useContext } from 'react';
import TicketContext from '../../../../contexts/TicketContext';
import { StyledButtons } from './styles/StyledButton';
import { BoxButtons, DivChoice, DivPageContent } from './styles/styles';

function HotelOptions({ ticketTypes }) {
  const { selectedButtons, setSelectedButtons, setTicketReserved, setShoeReservationButton } =
    useContext(TicketContext);

  const handleHotelOptionButtonClick = (id) => {
    setSelectedButtons([...selectedButtons, id]);
    setShoeReservationButton(true);
  };

  return (
    <DivPageContent style={{ marginTop: '0px' }}>
      <DivChoice> Ótimo! Agora escolha sua modalidade de hospedagem</DivChoice>
      <BoxButtons>
        {ticketTypes
          .filter((t) => t.name === 'presencial')
          .map((t) => {
            return (
              <StyledButtons
                key={t.id}
                className={selectedButtons.includes('presencial' && t.id) ? 'selected' : ''}
                onClick={() => {
                  setTicketReserved(t);
                  handleHotelOptionButtonClick(t.id);
                  {
                    selectedButtons.length !== 2
                      ? setSelectedButtons([...selectedButtons.slice(0, 2), t.id])
                      : handleHotelOptionButtonClick(t.id);
                  }
                }}
              >
                <div>
                  <span>{t.includesHotel === true ? 'Com hotel' : 'Sem hotel'}</span>
                  <p>+ R${t.includesHotel === true ? t.price : (t.price - t.price) }</p>
                </div>
              </StyledButtons>
            );
          })}
      </BoxButtons>
    </DivPageContent>
  );
}

export default HotelOptions;
