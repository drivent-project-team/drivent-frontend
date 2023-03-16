import styled from 'styled-components';
import { CgEnter, CgCloseO } from 'react-icons/cg';

export default function PlacesContainer({ chosenDate, activities }) {
  console.log(chosenDate);
  console.log(activities);

  return(
    <Container>
      <BoxPlace >
        <Place>Auditório Principal</Place>
        < AllActivitiesByDay>
          <ActivityByHour> 
            <TitleAndTime>
              <p>Minecraft: montando o PC ideal</p>
              <span>09:00 - 10:00</span>
            </TitleAndTime>
            <Line />
            <Capacity><CgEnter /><span>27 Vagas</span></Capacity>
          </ActivityByHour>
        </ AllActivitiesByDay>
      </BoxPlace>

      <BoxPlace >
        <Place>Auditório Lateral</Place>
        < AllActivitiesByDay>
          <ActivityByHour>
            <TitleAndTime>
              <p>Minecraft: montando o PC ideal</p>
              <span>09:00 - 11:00</span>
            </TitleAndTime>
            <Line />
            <Capacity><CgCloseO /><span>27 Vagas</span></Capacity>
          </ActivityByHour>
        </ AllActivitiesByDay>
      </BoxPlace>

      <BoxPlace >
        <Place>Sala de Workshop</Place>
        < AllActivitiesByDay>
          <ActivityByHour>
            <TitleAndTime>
              <p>LoL: montando o PC ideal</p>
              <span>09:00 - 10:30</span>
            </TitleAndTime>
            <Line />
            <Capacity><CgCloseO /><span>27 Vagas</span></Capacity>
          </ActivityByHour>
        </ AllActivitiesByDay>
      </BoxPlace>
    </Container>
  );
};

const Container = styled.div`
    display: flex;
    margin-top: 60px;
`;
const BoxPlace = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: -1px;
`;
const Place = styled.div`
    width: 288px;
    height: 30px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    text-align: center;
    color: #7B7B7B;
`;
const AllActivitiesByDay = styled.div`
    width: 288px;
    height: 392px;
    border: 1px solid #D7D7D7;
    box-sizing: border-box;
    padding: 9px;
`;
const ActivityByHour = styled.div`
    width: 265px;
    height: 79px;
    left: 350px;
    top: 415px;
    background: #F1F1F1;
    border-radius: 5px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 12px;
`;
const TitleAndTime = styled.div`
    width: 67%;
    height: 100%;
    p{
        display: block;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 14px;
        color: #343434;
    }
    span{
        display: block;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: #343434;
    }
`;
const Line = styled.div`
    width: 1px;
    height: 95%;
    background-color: #CFCFCF;
`;
const Capacity = styled.div`
    width: 32%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    span{
        display: block;
        text-align: center;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 9px;
        line-height: 11px;
        color: #078632;
    }
    svg{
        width: 20px;
        height: 28px;
        color: #078632;
    }
`;
