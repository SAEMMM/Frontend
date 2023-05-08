import React from 'react'
import Logins from './Logins'
import NavBar from '../navBar/Navbar'

function Login() {
    return (
        <div>
            <NavBar />
            {/* 이거 빼고 */}
            {/* 버튼 추가 */}
            <Logins />
        </div>
    )
}

export default Login