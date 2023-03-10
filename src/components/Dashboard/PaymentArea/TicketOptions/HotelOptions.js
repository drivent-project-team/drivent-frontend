import { useContext } from 'react';
import TicketContext from '../../../../contexts/TicketContext';
import { StyledButtons } from './styles/StyledButton';
import { BoxButtons, DivChoice, DivPageContent } from './styles/styles';

function HotelOptions({ ticketTypes }) {
  const { selectedButtons, setSelectedButtons, setShoeReservationButton, ticketTypeSelected, setTicketTypeSelected } =
    useContext(TicketContext);

  const handleHotelOptionButtonClick = (id) => {
    setSelectedButtons([...selectedButtons, id]);
    setShoeReservationButton(true);
  };

  const { price: priceIncludeHotel } = ticketTypes.filter((t) => t.name === 'presencial' && t.includesHotel)[0];
  const { price: priceWithoutHotel } = ticketTypes.filter((t) => t.name === 'presencial' && !t.includesHotel)[0];

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
                  setTicketTypeSelected(ticketTypes.filter((tckt) => tckt.isRemote === ticketTypeSelected.isRemote && tckt.price === t.price)[0]);
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
                  <p>+ R${t.includesHotel === true ? (priceIncludeHotel-priceWithoutHotel) : 0 }</p>
                </div>
              </StyledButtons>
            );
          })}
      </BoxButtons>
    </DivPageContent>
  );
}

export default HotelOptions;
