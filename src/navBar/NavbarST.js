import styled from "styled-components";

export const NavBox = styled.div`
position: relative;
width: 100%;
height: 60px;
background-color: #f1f1f1;
display: flex;
justify-content: space-between;
align-items: center;
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
        background-color: red;
    }
}
`;

export const Welcome = styled.div`
margin-left: 10px;
`