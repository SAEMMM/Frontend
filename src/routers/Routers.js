import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Season from '../season/Season'
import Main from '../main/Main'
import styled from 'styled-components'
import Signup from '../signup/Signup'
import Board from '../board/Board'
import Login from '../login/Login'

function Routers() {

    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.get('refreshToken');
    
    const goBoard = () => {
        if (isLoggedIn) {
            navigate('/board');
        } else {
            navigate('/login');
        }
    }

    return (
        <Background>
            <Routes>
                <Route path="/" element={<Season />} />
                <Route path="/main" element={<Main />}>
                    <Route path="?season=spring" element={<div>봄</div>} />
                    <Route path="?season=summer" element={<div>여름</div>} />
                    <Route path="?season=fall" element={<div>가을</div>} />
                    <Route path="?season=winter" element={<div>겨울</div>} />
                </Route>
                <Route path="/board" element={<Board />} onClick={goBoard} />
                <Route path="/login" element={<Login />} />
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