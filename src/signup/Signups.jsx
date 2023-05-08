import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/signupApi'
import * as st from './SignupSt'
import * as sst from '../share/Style'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{6,18}$/
const PW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const REGISTER_URL = '/users'

function Signups() {

    let navigate = useNavigate()

    const userRef = useRef()
    const errRef = useRef()

    const [nickname, setNickname] = useState('')

    const [userId, setUserId] = useState('')
    const [validuserId, setValiduserId] = useState(false)
    const [userIdFocus, setUserIdFocus] = useState(false)

    const [pw, setPw] = useState('')
    const [validPw, setValidPw] = useState(false)
    const [pwFocus, setPwFocus] = useState(false)

    const [matchPw, setMatchPw] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(userId)
        console.log(result)
        console.log(userId)
        setValiduserId(result)
    }, [userId])

    useEffect(() => {
        const result = PW_REGEX.test(pw)
        console.log(result)
        console.log(pw)
        setValidPw(result)
        const match = pw === matchPw
        setValidMatch(match)
    }, [pw, matchPw])

    useEffect(() => {
        setErrMsg('')
    }, [userId, pw, matchPw])

    const handleSubmit = async (e) => {
        e.preventDefault()
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(userId)
        const v2 = PW_REGEX.test(pw)
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry")
            return
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ nickname, userId, pw }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(response.data)
            console.log(response.accessToken)
            console.log(JSON.stringify(response))
            setSuccess(true)
            alert('회원이 되신 것을 환영합니다!')
            navigate('/')
            // clear input fields
        } catch (err) {
            if (!err?.response) {
                setErrMsg('서버의 응답이 없습니다')
            } else if (err.response?.status === 409) {
                setErrMsg('중복된 아이디입니다')
            } else {
                setErrMsg('회원가입에 실패했습니다')
            }
            errRef.current.focus()
        }
    }

    return (
        <st.SignupBox>
            <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
            <h1 className='SignBoxH1'>회원가입 🎉</h1>
            <st.SignInputBox>
                <st.SignLabel htmlFor='nickname'>닉네임
                    <span className={setNickname ? "valid" : "hide"}>✔</span>
                </st.SignLabel>
                <st.SignInput id='nickname'
                    value={nickname} onChange={(e) => setNickname(e.target.value)} required />
            </st.SignInputBox>

            <st.SignInputBox>
                <st.SignLabel htmlFor='userId'>아이디
                    <span className={validuserId ? "valid" : "hide"}>✔</span>
                    <span className={validuserId || !userId ? "hide" : "invalid"}>🚨</span>
                </st.SignLabel>
                <sst.Row>
                    <st.SignInput type="userId" id='userId'
                        value={userId}
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setUserId(e.target.value)}
                        required
                        aria-invalid={validuserId ? "false" : "true"}
                        aria-describedby='uidnote'
                        onFocus={() => setUserIdFocus(true)}
                        onBlur={() => setUserIdFocus(false)} />
                    <sst.Button fn="idcheck">중복확인</sst.Button>
                </sst.Row>
                <st.SingCheckMsg id="uidnote" className={userIdFocus && userId && !validuserId ? "instructions" : "offscreen"}>
                    아이디는 6~18자의 소문자, 숫자입니다
                </st.SingCheckMsg>
            </st.SignInputBox>

            <st.SignInputBox>
                <st.SignLabel htmlFor='pw'>비밀번호
                    <span className={validPw ? "valid" : "hide"}>✔</span>
                    <span className={validPw || !pw ? "hide" : "invalid"}>🚨</span>
                </st.SignLabel>
                <st.SignInput type="password" id='pw'
                    value={pw}
                    onChange={(e) => setPw(e.target.value)} required
                    aria-invalid={validPw ? "false" : "true"}
                    aria-describedby='pwnote'
                    onFocus={() => setPwFocus(true)}
                    onBlur={() => setPwFocus(false)} />
                <st.SingCheckMsg id="pwnote" className={pwFocus && !validPw ? "instructions" : "offscreen"}>
                    비밀번호는 대소문자, 숫자, 특수문자 포함 8~20자입니다
                </st.SingCheckMsg>
            </st.SignInputBox>

            <st.SignInputBox>
                <st.SignLabel htmlFor='putPwCheck'>비밀번호 확인
                    <span className={validMatch ? "valid" : "hide"}>✔</span>
                    <span className={validMatch || !matchPw ? "hide" : "invalid"}>🚨</span>
                </st.SignLabel>
                <st.SignInput type="password" id='putPwCheck'
                    value={matchPw}
                    onChange={(e) => setMatchPw(e.target.value)}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby='confirmnote'
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)} />
                <st.SingCheckMsg id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    비밀번호를 한번 더 입력해주세요
                </st.SingCheckMsg>
            </st.SignInputBox>

            <sst.Button disabled={!validuserId || !validPw || !validMatch ? true : false} fn="sign" onClick={handleSubmit}>회원가입 완료</sst.Button>
        </st.SignupBox>
    )
}

export default Signups