import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as st from './NavbarST'
import { useMutation } from 'react-query';
import { logout } from '../api/loginApi';

function NavBar() {

    const mutation = useMutation(logout)

    const accessToken = sessionStorage.getItem('accessToken');
    const refreshToken = sessionStorage.getItem('refreshToken');
    const nickname = sessionStorage.getItem('nickname');
    const isLogin = sessionStorage.getItem('isLogin');

    const logoutHandler = () => {
        mutation.mutateAsync([accessToken, refreshToken]);
        sessionStorage.setItem('isLogin', 'isLogout');
    }

    const navigate = useNavigate();
    const navigateHandler = () => {
        if (isLogin === 'isLogin') {
            navigate("/board")
        } else {
            alert("로그인이 필요합니다")
            navigate("/login")
        }
    }

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
                {isLogin === 'isLogin' ?
                    <st.Welcome>{nickname}님! 환영합니다</st.Welcome>
                    : null}
                <st.NavContent onClick={navigateHandler}><span className='spanBold'>작성하기</span></st.NavContent>
                {isLogin === 'isLogin' ?
                    <st.NavContent onClick={logoutHandler}><span className='spanBold'>로그아웃</span></st.NavContent>
                    : <st.NavContent onClick={() => navigate("/login")}><span className='spanBold'>로그인</span></st.NavContent>}
            </st.NavLink>
        </st.NavBox>
    )
}

export default NavBar