import styled from 'styled-components';
import SearchForm from './SearchForm';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 960px;
    min-height: 100px;
    margin: 10px auto 0 auto;
    background: linear-gradient(180deg, rgba(236,38,255,1) 0%, rgba(161,35,232,1) 100%);
    box-shadow: 10px 10px 73px -21px rgba(0,0,0,0.68);
    border-radius: 5px;
    padding: 5px;
`;

const FormContainer = styled.div`
    
`;

const Header = styled.h1`
    margin: 0 auto 5px 5px;
    ${({ $color }) => $color && `color: ${$color}`};
`;

function SearchBar() {
    return <Container>
        <Header $color={'white'}>Search</Header>
        <div>
            <SearchForm />
        </div>
    </Container>
}

export default SearchBar;