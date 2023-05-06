import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Season from '../season/Season'
import Main from '../main/Main'
import styled from 'styled-components'
import Signup from '../signup/Signup'
import Board from '../board/Board'
import Login from '../login/Login'

function Routers() {
    return (
        <Background>
            <Routes>
                <Route path="/" element={<Season />} />
                <Route path="/main" element={<Main />} />
                <Route path="/board" element={<Board />} />
                <Route path="/login" element={<Login />}/>
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Background>
    )
}

export default Routers

const Background = styled.div`
box-sizing: border-box;
padding: 100px;
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
`