const getConditionImage = (conditionId) => {
    if (conditionId >= 200 && conditionId <= 232) {
        return 'thunderstorm';
    } else if (conditionId >= 300 && conditionId <= 321) {
        return 'drizzle';
    } else if (conditionId >= 500 && conditionId <= 531) {
        return 'rain';
    } else if (conditionId >= 600 && conditionId <= 622) {
        return 'snow';
    } else if (conditionId >= 701 && conditionId <= 701) {
        return 'mist';
    } else if (conditionId >= 801 && conditionId <= 804) {
        return 'clouds';
    }
    return 'clear';
};

const formatUnixTime = (unixTime) => {
    const date = new Date(unixTime * 1000);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return `${days[date.getDay()]} ${date.getDate()}`;
}

const getCardinalDirection = (angle) => {
    const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
    return directions[Math.round(angle / 45) % 8];
}

export { getConditionImage, formatUnixTime, getCardinalDirection };