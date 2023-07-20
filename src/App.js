import { useState } from 'react';
import styled from 'styled-components';
import { SearchProvider, SearchBar } from "./search";
import { WeatherView } from './weather';
import useLoader from './hook/useLoader';

const Container = styled.div`
  background: #7d32fe;
  position: absolute;
  height: 100vh;
  width: 100%;
`;

function App() {
  const [weatherData, setWeatherData] = useState(null);

  const [state, dispatch] = useLoader({
    status: 'INITIALIZE',
    result: null,
    error: null
  });

  const onReceiveCoordinates = (coor) => {
    const appId = process.env.REACT_APP_OPENWEATHER_APP_ID
    const endPoint = `https://api.openweathermap.org/data/3.0/onecall?lat=${coor.lat}&lon=${coor.lon}&appid=${appId}&units=metric`;

    fetch(endPoint)
        .then(res => res.json())
        .then(result => dispatch({ action: 'SUCCESS', payload: result }))
        .catch(message => dispatch({ action: 'FAILURE', payload: message }));
    
    const { status, error, result } = state;

    switch(status) {
      case 'SUCCESS':
        setWeatherData(result);
        break;
      case 'FAILURE':
        console.log(error);
        setWeatherData(null);
        break;
      default:
        setWeatherData(null);
    }
  }

  return  <Container>
    <SearchProvider locationHandler={onReceiveCoordinates}>
        <SearchBar />
    </SearchProvider>
    <WeatherView weatherData={weatherData} />
  </Container>
  
}

export default App;
