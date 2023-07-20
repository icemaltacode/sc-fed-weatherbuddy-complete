import styled from 'styled-components';
import WeatherIcon from './WeatherIcon';
import { getConditionImage, formatUnixTime, getCardinalDirection } from './util';
import Forecast from './Forecast';

const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 960px;
    min-height: 400px;
    margin: 10px auto 0 auto;
    background: 
        linear-gradient(rgba(255,255,255,.4), 
        rgba(255,255,255,.2)), 
        url('assets/thunderstorm.jpg') 
        no-repeat fixed center;
    ${({ $condition }) => 
        {return $condition && 
        `background: 
        linear-gradient(rgba(255,255,255,.4), 
        rgba(255,255,255,.2)), 
        url('assets/${getConditionImage($condition)}.jpg') 
        no-repeat fixed center;`}};
    box-shadow: 10px 10px 73px -21px rgba(0,0,0,0.68);
    border-radius: 5px;
    padding: 5px;
    color: black;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
`;

const TemperatureHeading = styled.span`
    color: black;
    margin: 0;
    font-size: 24pt;
    font-weight: bold;
`;

const MinMax = styled.span`
    font-size: 10pt;
    font-weight: normal;
    margin-left: 10px;  
`;

const CurrentDate = styled.div`
    padding: 0;
`;

const WeatherHeading = styled.div`
    display: flex;
    flex-direction: column;
    height: 80px;
    padding-top: 20px;
    align-items: flex-start;
`;

const Conditions = styled.div`
    margin: 0 auto auto 20px;
    ${({ $topMargin }) => $topMargin && `margin-top: ${$topMargin}px`};
`;

function WeatherView(data) {

    console.log(data);
    console.log(data.weatherData);

    if (!data || !data.weatherData) return null;
    data = data.weatherData;

    const forecastData = data.daily.slice(1).map(day => {
        return {
            date: formatUnixTime(day.dt),
            min: Math.round(day.temp.min),
            max: Math.round(day.temp.max),
            icon: day.weather[0].icon,
            description: day.weather[0].description
        }
    });

    return <>
        <ResultContainer $condition={data.current.weather[0].id}>
            <Row>
                <WeatherIcon img={data.current.weather[0].icon} />
                <WeatherHeading>
                    <CurrentDate>
                        {formatUnixTime(data.current.dt)}
                    </CurrentDate>
                    <TemperatureHeading>
                        {Math.round(data.current.temp)}°C
                        <MinMax>
                            {Math.round(data.daily[0].temp.min)} / {Math.round(data.daily[0].temp.max)}°C
                        </MinMax>
                    </TemperatureHeading>  
                </WeatherHeading>
            </Row>
            <Row>
                <Conditions>
                    🌡️ Feels like {Math.round(data.current.feels_like)}°C. 
                </Conditions>
            </Row>
            <Row>
                <Conditions>
                    🏖️ Currently {data.current.weather[0].description}. {data.daily[0].summary}.
                </Conditions>
            </Row>
            <Row>
                <Conditions>
                    🌬️ {Math.round(data.current.wind_speed, 1)}m/s, {getCardinalDirection(data.current.wind_deg)}, {data.current.pressure}hPa.
                </Conditions>
            </Row>
            <Row>
                <Conditions>
                    💧 {Math.round(data.current.humidity)}% Humidity, {Math.round(data.current.dew_point)}°C Dew Point.
                </Conditions>
            </Row>
            <Row>
                <Conditions $topMargin={20}>
                    <Forecast days={forecastData} />
                </Conditions>
            </Row>
        </ResultContainer>
    </>
}

export default WeatherView;