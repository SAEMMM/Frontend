import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as st from './NavbarST'

function NavBar() {

    const navigate = useNavigate();
    // api/boards?season=string&location=string&star=string&keyword=string

    return (
        <st.NavBox>
            <st.NavLink>
                <st.NavContent onClick={() => navigate("/")}>
                    <st.Hover>
                        <span className='hiddenHover'>🏠</span>
                        <span className='showHover'>Home</span>
                    </st.Hover>
                </st.NavContent>
                <st.NavContent onClick={() => navigate("/main?season=spring")}>
                    <st.Hover>
                        <span className='hiddenHover'>🌷</span>
                        <span className='showHover'>봄</span>
                    </st.Hover>
                </st.NavContent>
                <st.NavContent onClick={() => navigate("/main?season=summer")}>
                    <st.Hover>
                        <span className='hiddenHover'>🌊</span>
                        <span className='showHover'>여름</span>
                    </st.Hover>
                </st.NavContent>
                <st.NavContent onClick={() => navigate("/main?season=fall")}>
                    <st.Hover>
                        <span className='hiddenHover'>🍂</span>
                        <span className='showHover'>가을</span>
                    </st.Hover>
                </st.NavContent>
                <st.NavContent onClick={() => navigate("/main?season=winter")}>
                    <st.Hover>
                        <span className='hiddenHover'>⛄</span>
                        <span className='showHover'>겨울</span>
                    </st.Hover>
                </st.NavContent>
            </st.NavLink>

            <st.NavLink>
                <st.Welcome>xxx님! 환영합니다</st.Welcome>
                <st.NavContent onClick={() => navigate("/board")}><span className='spanBold'>작성하기</span></st.NavContent>
                <st.NavContent onClick={() => navigate("/login")}><span className='spanBold'>로그인</span></st.NavContent>
            </st.NavLink>
        </st.NavBox>
    )
}

export default NavBar