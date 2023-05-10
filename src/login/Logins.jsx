import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import * as st from './LoginST'
import * as sst from '../share/Style'
import { useMutation } from 'react-query';
import { login } from '../api/loginApi';
import { useDispatch } from 'react-redux';
import { loggedInOut } from '../redux/modules/isLogin';

function Logins() {
    const navigation = useNavigate();

    const dispatch = useDispatch();

    const [userId, setuserId] = useState('');
    const [password, setPassword] = useState('');

    const mutation = useMutation(login, {
        onSuccess: () => {
            alert('로그인 성공')
            navigation(-1)
            dispatch(loggedInOut(true))
        }
    })

    const submitHandler = async (e) => {
        e.preventDefault();
        const userData = {
            userId,
            password
        }
        await mutation.mutateAsync(userData)
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

            <sst.Button fn="sign" onClick={submitHandler}>Login</sst.Button>

            <sst.Column style={{alignItems: 'center'}}>
                <span>회원이 아니시라면?</span>
                <st.LoginStyle onClick={() => navigation("/signup")}><span className='spanBold'>회원가입하러가기</span></st.LoginStyle>
            </sst.Column>

        </st.LoginBox>
    )
}

export default Logins