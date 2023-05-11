import styled from "styled-components";

export const SearchBox = styled.div`
    box-sizing: border-box;
    padding: 10px;
    /* background-color: skyblue; */
    width: 1000px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* border: 3px solid silver; */
    border-radius: 5px;
    -webkit-box-shadow: 5px 5px 10px 0px silver; 
    box-shadow: 5px 5px 10px 0px silver;
    /* &:hover {
        width: 1000px;
        height: 90px;
        transition: all 0.5s;
    } */
    .spanBold {
        font-weight: bold;
    }
`

export const MainListBox = styled.div`
margin-top: 20px;
box-sizing: border-box;
padding: 10px;
/* background-color: skyblue; */
width: 1000px;
height: 700px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
/* border: 3px solid silver; */
border-radius: 5px;
-webkit-box-shadow: 5px 5px 10px 0px silver; 
box-shadow: 5px 5px 10px 0px silver;
&:hover {
    width: 1100px;
    height: 800px;
    transition: all 0.5s;
}
.spanbold {
    font-weight: bold;
}
`

export const Title = styled.div`
.TitleH1 {
    color: ${props => props.season === 'spring' ? '#F08080' : (props => props.season === 'summer' ? '#00BFFF' : (props => props.season === 'fall' ? '#8B4513' : '#000000'))};
    text-shadow: 2px 2px 0px #FFFFFF, 4px 4px 0px rgba(0,0,0,0.15);
}
`

export const Image = styled.div`
width: 700px;
height: 400px;
border-radius: 5px;

&:hover {
    width: 800px;
    height: 500px;
    transition: all 0.5s;
}
`

export const Imageload = styled.img`
    text-align: center;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    object-fit: contain;
`

export const ShowBox = styled.div`
box-sizing: border-box;
padding: 5px;
width: ${props => props.type === 'select' ? '200' : '600'}px;
height: ${props => props.type === 'contents' ? '80' : '30'}px;
border: 1px solid silver;
border-radius: 5px;
margin-right: 20px;
text-align: center;
line-height: ${props => props.type === 'contents' ? 'none' : '17'}px;
`

export const Empty = styled.div`
width: 900px;
height: 300px;
background-color: skyblue;
`