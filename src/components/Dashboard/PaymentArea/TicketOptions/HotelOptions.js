import { useContext } from 'react';
import TicketContext from '../../../../contexts/TicketContext';
import { StyledButtons } from './styles/StyledButton';
import { BoxButtons, DivChoice, DivPageContent } from './styles/styles';

function HotelOptions({ ticketTypes }) {
  const { setIncludesHotel, selectedButtons, setSelectedButtons } = useContext(TicketContext);

  const handleHotelOptionButtonClick = (id) => {
    setSelectedButtons([...selectedButtons, id]);
  };

  return (
    <DivPageContent style={{ marginTop: '0px' }}>
      <DivChoice> Ótimo! Agora escolha sua modalidade de hospedagem</DivChoice>
      <BoxButtons>
        {ticketTypes
          .filter((t) => t.name === 'presencial')
          .map((t) => {
            const isSelected = selectedButtons.includes(['presencial', t.id]);

            return (
              <StyledButtons
                key={t.id}
                isSelected={isSelected}
                className={selectedButtons.includes('presencial' && t.id) ? 'selected' : ''}
                onClick={() => {
                  setIncludesHotel(t.name);
                  handleHotelOptionButtonClick(t.id);
                }}
              >
                <div>
                  <span>{t.includesHotel === true ? 'Com hotel' : 'Sem hotel'}</span>
                  <p>+ R${t.includesHotel === true ? 100 : 0}</p>
                </div>
              </StyledButtons>
            );
          })}
      </BoxButtons>
    </DivPageContent>
  );
}

export default HotelOptions;
