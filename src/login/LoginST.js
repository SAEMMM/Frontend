import styled from "styled-components";

export const SignupBox = styled.div`
margin-top: 20px;
box-sizing: border-box;
padding: 20px;
/* background-color: skyblue; */
width: 600px;
height: 600px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
/* border: 3px solid silver; */
border-radius: 5px;
-webkit-box-shadow: 5px 5px 10px 0px silver; 
box-shadow: 5px 5px 10px 0px silver;
 .SignBoxH1 {
    text-shadow: 2px 2px 0px #FFFFFF, 4px 4px 0px rgba(0,0,0,0.15);
 }
`

export const SignupStyle = styled.span`
&:hover {
    border-bottom: 1px solid grey;
    cursor: pointer;
}
`