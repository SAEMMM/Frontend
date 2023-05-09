import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import * as st from './LoginST'
import * as sst from '../share/Style'

function Logins() {

    // const userRef = useRef();
    // const errRef = useRef();

    const [userId, setuserId] = useState('');
    const [password, setPassword] = useState('');
    // const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState(false);

    const navigation = useNavigate();

    // useEffect(() => {
    //     userRef.current.focus()
    // },[])

    // useEffect(() => {
    //     setErrMsg('')
    // }, [userId, password])

    return (
        <st.LoginBox>
            <h1 className='SignBoxH1'>로그인 🎉</h1>
            <st.LoginInputBox>
                <st.LoginLabel>아이디</st.LoginLabel>
                <st.LoginInput
                    type='text'
                    placeholder='아이디를 입력하세요'
                />
            </st.LoginInputBox>

            <st.LoginInputBox>
                <st.LoginLabel>비밀번호</st.LoginLabel>
                <st.LoginInput
                    type='password'
                    placeholder='비밀번호를 입력하세요'
                />
            </st.LoginInputBox>

            <sst.Button fn="sign">Login</sst.Button>

            <span>회원이 아니시라면?</span>
            <st.LoginStyle onClick={() => navigation("/signup")}>회원가입하러가기</st.LoginStyle>

        </st.LoginBox>
    )
}

export default Logins