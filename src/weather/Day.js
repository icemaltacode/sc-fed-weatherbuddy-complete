import styled from 'styled-components';
import WeatherIcon from './WeatherIcon';

const DayContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid black;
    padding: 5px;    
`;

const DateContainer = styled.div`
    font-size: 14pt;
`;

const MinMax = styled.div`
    font-size: 10pt;
`;

const Description = styled.div`
    font-size: 8pt;
`;

function Day({ icon, min, max, description, date}) {

    return <DayContainer>
        <DateContainer>{date}</DateContainer>
        <WeatherIcon img={icon} />
        <MinMax>{min} / {max}°C</MinMax>
        <Description>{description}</Description>
    </DayContainer>
}

export default Day;