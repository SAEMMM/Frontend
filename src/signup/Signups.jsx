import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useInput from '../hooks/useInput'
import * as st from './SignupSt'
import * as sst from '../share/Style'
import { useQueryClient, useQuery, useMutation } from 'react-query'
import { getUser, addUser } from '../api/signupApi'

function Signups() {

    let navigate = useNavigate()

    const queryClient = useQueryClient()
    const { data: users } = useQuery('users', getUser)

    // 정보 입력 input state
    const [ninkname, onChangeNickname] = useInput()
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const [doubleCheckPw, setDoubleCheckPw] = useState('')

    // 오류 메세지 state
    const [msgId, setMsgId] = useState('')
    const [msgPw, setMsgPw] = useState('')
    const [msgDoublePw, setMsgDoublePw] = useState('')

    // 유효성 검사 state
    const [isId, setIsId] = useState(false)
    const [isPw, setIsPw] = useState(false)
    const [isDoublePw, setIsDoublePw] = useState(false)

    // 아이디 입력
    const onChangeId = (e) => {
        setUserId(e.target.value)

        const idRegExp = /^[a-z0-9]{6,18}$/
        if (!idRegExp.test(userId)) {
            setMsgId("🚨 6-18자의 소문자 또는 숫자만 입력해 주세요")
            setIsId(false)
        } else {
            setMsgId("🙆 사용가능한 아이디입니다")
            setIsId(true)
        }
    }

    // 비밀번호 입력
    const onChangePw = (e) => {
        setPassword(e.target.value)

        const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/
        if (!passwordRegExp.test(password)) {
            setMsgPw("🚨 영어, 숫자, 특수문자를 8자 이상 입력해주세요")
            setIsPw(false)
        } else {
            setMsgPw("🙆 사용가능한 비밀번호입니다")
            setIsPw(true)
        }
    }

    // 비밀번호 확인
    const onChangeDoubleCheckPw = (e) => {
        setDoubleCheckPw(e.target.value)

        if (password !== doubleCheckPw) {
            setMsgDoublePw("🚨 비밀번호가 다릅니다")
            setIsDoublePw(false)
        } else {
            setMsgDoublePw("🙆 비밀번호가 같습니다")
            setIsDoublePw(true)
        }
    }

    // 아이디 중복확인 클릭
    const onClickIdCheck = () => {
        const [item] = users?.filter(v => v.userId == userId)
        console.log('중복', item)

        if (userId == '') {
            alert('아이디를 입력해주세요')
        } if (item.userId == userId) {  // ok
            alert('이미 사용중인 아이디입니다')
            setUserId('')
            setMsgId(false)
        } if (item.userId == undefined || item.userId == null) {
            alert('사용 가능한 아이디입니다')
            setUserId(userId)
        }
        // 사용 가능한 아이디 수정 중..
    }

    // signupApi로 post
    const addUserMutation = useMutation(addUser, {
        onSuccess: () => {
            // Invalidates cache and refetch
            queryClient.invalidateQueries('users')
        }
    })

    // 회원가입 정보 전송
    const handlesubmit = (e) => {
        if (ninkname === false || ninkname == '') {
            alert('닉네임을 확인해주세요')
        } else if (userId === false || userId == '') {
            alert('아이디를 확인해주세요')
        } else if (password === false || password == '') {
            alert('비밀번호를 확인해주세요')
        } else if (password !== doubleCheckPw || doubleCheckPw == '') {
            alert('비밀번호를 다시 확인해주세요')
        }
        else {
            e.preventDefault()
            addUserMutation.mutate({ ninkname, userId, password })
            alert('환영합니다! 로그인 해주세요')
            navigate('/login')
        }
    }

    return (
        <st.SignupBox>
            <h1 className='SignBoxH1'>회원가입 🎉</h1>
            <st.SignInputBox>
                <st.SignLabel htmlFor='putNickname'>닉네임</st.SignLabel>
                <st.SignInput id='putNickname' placeholder='닉네임을 입력해주세요'
                    value={ninkname} onChange={onChangeNickname} />
            </st.SignInputBox>

            <st.SignInputBox>
                <st.SignLabel htmlFor='putId'>아이디</st.SignLabel>
                <sst.Row>
                    <st.SignInput type="userId" id='putId' placeholder='아이디는 영어, 숫자 포함 6~18자입니다'
                        value={userId} onChange={onChangeId} />
                    <sst.Button fn="idcheck" onClick={onClickIdCheck}>중복확인</sst.Button>
                </sst.Row>
                <st.SingCheckMsg>{msgId}</st.SingCheckMsg>
            </st.SignInputBox>

            <st.SignInputBox>
                <st.SignLabel htmlFor='putPw'>비밀번호</st.SignLabel>
                <st.SignInput type="password" id='putPw' placeholder='비밀번호는 영어, 숫자, 특수문자 포함 8~20자입니다'
                    value={password} onChange={onChangePw} />
                <st.SingCheckMsg>{msgPw}</st.SingCheckMsg>
            </st.SignInputBox>

            <st.SignInputBox>
                <st.SignLabel htmlFor='putPwCheck'>비밀번호 확인</st.SignLabel>
                <st.SignInput type="password" id='putPwCheck' placeholder='비밀번호를 한번 더 입력해주세요'
                    value={doubleCheckPw} onChange={onChangeDoubleCheckPw} />
                <st.SingCheckMsg>{msgDoublePw}</st.SingCheckMsg>
            </st.SignInputBox>

            <sst.Button fn="sign" onClick={handlesubmit}>회원가입 완료</sst.Button>
        </st.SignupBox>
    )
}

export default Signups