import React from 'react';
import { DivPageContent } from '../../../pages/Dashboard/Payment/style';
import { DivChoice } from '../PaymentArea/TicketOptions/styles/styles';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import localeData from 'dayjs/plugin/localeData';
import styled from 'styled-components';

function DatesContainer({ dates }) {
  dayjs.extend(localeData);
  dayjs.locale('pt-br');

  return (
    <DivPageContent>
      <DivChoice>Primeiro, filtre pelo dia do evento:</DivChoice>
      <DatesButtonsContainer>
        {dates.map((d) => {
          const parsedDate = dayjs(d, 'dddd, DD/MM');
          const formattedDate = parsedDate
            .format('dddd, DD/MM')
            .replace(
              parsedDate.format('dddd'),
              parsedDate.format('dddd').replace(/^\w/, (c) => c.toUpperCase())
            )
            .replace(/-feira/g, '');
          console.log(formattedDate);
          return <StyledDatesButton onClick={() => console.log('clicou')}>{formattedDate}</StyledDatesButton>;
        })}
      </DatesButtonsContainer>
    </DivPageContent>
  );
}

export default DatesContainer;

const DatesButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const StyledDatesButton = styled.button`
  height: 37px;
  width: 131px;
  border-radius: 4px;
  background-color: #e0e0e0;
  box-shadow: 0px 2px 10px 0px #00000040;
  font-family: 'Roboto';
  font-size: 14px;
  text-align: center;
  border: none;
  cursor: pointer;

   &:hover {
     background-color: #FFD37D;
  }
  &.selected {
     background-color: #FFD37D;
  }
  &:active {
  background-color: #FFD37D;
  transform: translateY(4px);
}
  &:after {
    background-color: #FFD37D;
  }

`;
