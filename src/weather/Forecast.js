import styled from 'styled-components';
import Day from './Day';

const DayList = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

function Forecast({ days }) {
    return <DayList>
        {days.map((day, i) => {
            return <Day
                key={i} 
                min={day.min} 
                max={day.max} 
                description={day.description} 
                icon={day.icon} 
                date={day.date}
                />
        })}
    </DayList>
}

export default Forecast;