import styled from "styled-components";

export const NavBox = styled.div`
/* position: relative; */
width: 900px;
height: 60px;
background-color: #f1f1f1;
display: flex;
justify-content: space-between;
align-items: center;
border-radius: 5px;
-webkit-box-shadow: 5px 2px 10px 0px silver; 
box-shadow: 5px 2px 10px 0px silver;
`

export const NavLink = styled.div`
display: flex;
align-items: center;
& > div {
    padding-left: 20px;
    padding-right: 20px;
}
`

export const NavContent = styled.div`
position: relative;

&:hover {
    cursor: pointer;
    &:before {
        content: "";
        position: absolute;
        bottom: -15px;
        left: 0;
        width: 100%;
        height: 5px;
        background-color: white;
    }
}
.spanBold {
    font-weight: bolder;
    font-size: 20px;
    text-shadow: 2px 2px 0px #FFFFFF, 4px 4px 0px rgba(0,0,0,0.15);
}
`

export const Welcome = styled.div`
margin-left: 10px;
`

export const Hover = styled.div`
    /* background-color: skyblue; */
    width: 60px;
    height: 30px;
    text-align: center;
    text-shadow: 2px 2px 0px #FFFFFF, 4px 4px 0px rgba(0,0,0,0.15);
    font-weight: bolder;
    font-size: 23px;
    .showHover {
        display: none;
    }
    &:hover {
        .showHover {
        display: block;
        }
        .hiddenHover {
        display: none;
    }
    }
`