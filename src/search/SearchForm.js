import styled from 'styled-components';
import { useState } from 'react';
import useLoader from '../hook/useLoader';
import useSearch from "./useSearch";

const SearchInput = styled.input`
    border: 2px dotted #CCCCCC;
    border-radius:5px; 
    padding:6px; 
    font-size:25px; 
    box-shadow: 0px 0px 5px 0px rgba(42,42,42,.75); 
    text-shadow:1px 2px 4px rgba(42,42,42,.19); 
    font-weight:bold;
    flex-grow: 2;
    &:focus {
        outline: none;
    }
`;

const SearchButton = styled.button`
    width: 100px;
    background: #A123E8;
    outline: none;
    cursor: pointer;
    border: 0;
    font-size: 15px;
    font-weight: bold;
    color: white;
    &:hover {
        transition: all .1s ease;
        box-shadow: 0 0 0 0 #fff, 0 0 0 1px #EC26FF;
    }
`;

const SearchContainer = styled.form`
    display: flex;
    gap: 10px;
`;

function SearchForm() {
    const searchContext = useSearch();
    const [suggestions, setSuggestions] = useState([]);
    const [currentSearch, setCurrentSearch] = useState('');
    const [state, dispatch] = useLoader({
        status: 'INITIALIZE',
        result: null,
        error: null
    });

    const onChange = evt => {
        const searchTerm = evt.target.value;
        setCurrentSearch(searchTerm);

        dispatch({ action: 'LOADING' });
        const endPoint = `http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${searchContext.app_id}`;
        fetch(endPoint)
            .then(res => res.json())
            .then(data => data.map((suggestion) => {
                return {
                    name: suggestion.name,
                    state: suggestion.state,
                    country: suggestion.country,
                    lat: suggestion.lat,
                    lon: suggestion.lon
                }
            }))
            .then(result => dispatch({ action: 'SUCCESS', payload: result }))
            .catch(message => dispatch({ action: 'FAILURE', payload: message }));
        
        const { status, error, result } = state;

        switch(status) {
            case 'SUCCESS':
                setSuggestions(result)
                break;
            case 'FAILURE':
                console.error(error.message);
                setSuggestions([]);
                break;
            default:
                setSuggestions([]);
        }
    }

    const onSubmit = (evt) => {
        evt.preventDefault();
        
        const endPoint = `http://api.openweathermap.org/geo/1.0/direct?q=${currentSearch}&limit=1&appid=${searchContext.app_id}`;
        fetch(endPoint)
            .then(res => res.json())            
            .then(data => data.map((suggestion) => {
                return {
                    lat: suggestion.lat,
                    lon: suggestion.lon
                }
            }))
            .then(result => searchContext.locationHandler(result[0]))
            .catch(message => console.error(message));
    }
    
    return <>
        <datalist id='location-suggestions'>
            {suggestions.map((s, i) => {
                const suggestionText = `${s.name}, ${s.state}, ${s.country}`;
                return <option key={i} value={suggestionText}/>}
            )}
        </datalist>
        
        <SearchContainer onSubmit={onSubmit}>
            <SearchInput
                autoComplete='off' 
                list='location-suggestions' 
                id='location-search' 
                name='location-search' 
                onChange={onChange} 
                value={currentSearch}
            />
            <SearchButton type='submit'>Search</SearchButton>
        </SearchContainer>
    </>
    
    
}

export default SearchForm;