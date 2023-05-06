import styled from "styled-components"

export const BodyStyle = styled.div`
flex-direction: column;
display: flex;
align-items: center;
justify-content: center;
margin-top: 20px;
width: 100%;
height: 100%;
`

export const InputStyle = styled.input`
width: ${props => props.width};
height: ${props => props.height};
border: 1px solid gray;
margin-top: 20px;
`

export const ImageWrapper = styled.div`
width: 70%;
height: 300px;
margin-top: 20px;
border: 1px solid gray;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export const ImagePlaceholder = styled.div`
width: 70%;
height: 300px;
display: flex;
justify-content: center;
align-items: center;
border: 1px solid gray;
margin-top: 20px;
`

export const RowWrapper = styled.div`
display: flex;
margin-top: 20px;
`