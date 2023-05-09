import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import * as st from './LoginST'
import * as sst from '../share/Style'
import axios from "axios";

function Logins() {
    const navigation = useNavigate();

    const [userId, setuserId] = useState('');
    const [password, setPassword] = useState('');

    axios.defaults.baseURL = 'http://13.124.170.137:8080/';

    const loginHandler = () => {
        axios.post('/api/user/login', {
            userId,
            password,
        })
            .then(( data ) => {
                axios.defaults.headers.common[`Authorization`] = `Bearer ${data.accessToken}`;
                localStorage.setItem('refreshToken', data.refreshToken); //localStorage.setItem("key","value"), localStorage.getItem(key)
                alert('로그인 성공')
            })
            .catch((error) => {
                if (error.response.statusCode === 401) {
                    alert('회원정보를 찾을 수 없습니다')
                }
            })
    }

    return (
        <st.LoginBox>
            <h1 className='SignBoxH1'>로그인 🎉</h1>
            <st.LoginInputBox>
                <st.LoginLabel>아이디</st.LoginLabel>
                <st.LoginInput
                    type='text'
                    placeholder='아이디를 입력하세요'
                    value={userId}
                    onChange={(e) => setuserId(e.target.value)}
                    required
                />
            </st.LoginInputBox>

            <st.LoginInputBox>
                <st.LoginLabel>비밀번호</st.LoginLabel>
                <st.LoginInput
                    type='password'
                    placeholder='비밀번호를 입력하세요'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </st.LoginInputBox>

            <sst.Button fn="sign" onClick={loginHandler}>Login</sst.Button>

            <span>회원이 아니시라면?</span>
            <st.LoginStyle onClick={() => navigation("/signup")}>회원가입하러가기</st.LoginStyle>

        </st.LoginBox>
    )
}

export default Logins