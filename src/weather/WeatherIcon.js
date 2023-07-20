import styled from 'styled-components';

const Icon = styled.div`
        ${({ $img }) => $img && `background-image: url('https://openweathermap.org/img/wn/${$img}@2x.png')`};
        display: block;
        width: 100px;
        height: 100px;
    `;

function WeatherIcon({ img }) {
    return <Icon $img={img} />
}

export default WeatherIcon;