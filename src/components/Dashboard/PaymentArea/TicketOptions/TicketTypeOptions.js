import { useState } from 'react';
import { useContext } from 'react';
import TicketContext from '../../../../contexts/TicketContext';
import { StyledButtons } from './styles/StyledButton';
import { BoxButtons, DivChoice, DivPageContent } from './styles/styles';

function TicketTypeOptions({ tickets }) {
  const { setTicketTypeSelected, setShowHotelOptions, setSelectedButtons, selectedButtons } = useContext(TicketContext);

  const handleTicketTypeButtonClick = (type, index) => {
    {
      type === 'presencial' ? setShowHotelOptions(true) : setShowHotelOptions(false);
    }

    setSelectedButtons([type, index]);
  };

  return (
    <DivPageContent>
      <DivChoice>Primeiro, escolha sua modalidade de ingresso</DivChoice>
      <BoxButtons>
        {tickets
          .filter((t) => (t.name === 'presencial' && t.includesHotel === false) || t.name === 'online')
          .map((t, index) => (
            <StyledButtons
              key={t.id}
              className={selectedButtons.includes('presencial' && index) ? 'selected' : ''}
              onClick={() => {
                setTicketTypeSelected(t.name);
                {
                  t.name === 'presencial'
                    ? handleTicketTypeButtonClick('presencial', index)
                    : handleTicketTypeButtonClick('online', index);
                }
              }}
            >
              <div>
                <span>{t.name.charAt(0).toUpperCase() + t.name.slice(1)}</span>
                <p>R${t.price}</p>
              </div>
            </StyledButtons>
          ))}
      </BoxButtons>
    </DivPageContent>
  );
}

export default TicketTypeOptions;
