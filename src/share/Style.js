import styled from "styled-components";
import Select from 'react-select'

export const SelectStyle = styled(Select)`
    width: 200px;
`

export const Input = styled.input`
    width: 200px;
    height: 30px;
    border: 1px solid silver;
    border-radius: 5px;
`

export const Column = styled.div`
    display: flex;
    flex-direction: column;
`

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const End = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: auto;
`

export const Button = styled.button`
    margin-left: 5px;
    width: ${props => props.fn === 'form' ? '60' : (props => props.fn === 'del' ? '60' : '100')}px;
    height: ${props => props.fn === 'idcheck' ? '43' : '33'}px;
    align-self:  ${props => props.fn === 'sign' ? 'center' : 'flex-end'};
    background-color: ${props => props.fn === 'form' ? '#3CB371' : (props => props.fn === 'del' ? '#CD5C5C' : (props => props.fn === 'sign' ? '#6495ED' : '#F5F5F5'))};
    color: ${props => props.fn === 'form' ? 'white' : (props => props.fn === 'del' ? 'white' : (props => props.fn === 'sign' ? 'white' : 'black'))};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: silver;
        transition: all 0.5s;
    }
    &:active {
        color: white;
        background-color: ${props => props.fn === 'form' ? '#008000' : (props => props.fn === 'del' ? '#FF0000' : (props => props.fn === 'sign' ? '#1E90FF' : '#423d3d'))};
    }
`