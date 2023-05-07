import React from 'react'
import { useNavigate } from 'react-router'
import * as st from './LoginST'

function Logins() {

    const navigation = useNavigate();

    return (
        <st.SignupBox>
            <h1>Login</h1>

            <div>ID</div>
            <input
                type='text'
                placeholder='아이디를 입력하세요'
            />

            <div>PW</div>
                <input
                    type='password'
                    placeholder='비밀번호를 입력하세요'
                />
            
            <button>Login</button>

            <p>회원이 아니시라면?</p>
            <st.SignupStyle onClick={() => navigation("/signup")}>회원가입하러가기</st.SignupStyle>

        </st.SignupBox>
    )
}

export default Logins