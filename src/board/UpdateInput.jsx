import React, { useState } from 'react'
import * as st from './BoardST'
import * as sst from '../share/Style'
import SelectLocation from './SelectLocation';
import axios from '../api/boardApi'
import SelectStar from './SelectStar';
import SelectSeason from './SelectSeason';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { beforeUpdate, updateBoard } from '../api/boardApi';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateInput() {

    let navigate = useNavigate()

    const queryClient = useQueryClient()

    let { id } = useParams();

    const accessToken = sessionStorage.getItem('accessToken')
    const refreshToken = sessionStorage.getItem('refreshToken')

    // 현재 페이지별 Api
    const beforeUpdate = async () => {
        try {
            const config = {
                headers: {
                    "Authorization": accessToken,
                    "RefreshToken": refreshToken,
                }
            }
            const response = await axios.get(`/api/boards/${id}`, config)
            return response.data.data
        } catch (err) {
            if (err.response.status === 401) {
                try {
                    const response = await axios.get(`/api/boards/${id}`, {
                        headers: {
                            "Authorization": accessToken,
                            "RefreshToken": refreshToken,
                        }
                    })
                    const newAccessToken = response.headers.authorization;
                    const newRefreshToken = response.headers.refreshtoken;
                    sessionStorage.setItem("accessToken", newAccessToken)
                    sessionStorage.setItem("refreshToken", newRefreshToken)
                    await axios.get(`/api/boards/${id}`, {
                        headers: {
                            "Authorization": newAccessToken,
                            "RefreshToken": newRefreshToken
                        }
                    })
                } catch (error) {
                    sessionStorage.removeItem("refreshToken");
                    sessionStorage.removeItem("accessToken");
                    sessionStorage.removeItem("nickname");
                    sessionStorage.removeItem("isLogin");
                    alert('로그인이 필요합니다')
                    navigate('/login')
                }
            } else if (err.response.status === 400) {
                alert('수정 권한이 없습니다')
                navigate('/main?season=spring')
                return
            } else {
                alert('오류가 발생했습니다')
                navigate('/main?season=spring')
                return
            }
            // if (!err?.response) {
            //     alert('서버의 응답이 없습니다')
            // } else if (err.response?.status === 401) {
            //     alert('본인이 작성한 게시물만 수정이 가능합니다')
            //     navigate(-1)
            // } else {
            //     alert('오류가 발생했습니다')
            // }
        }
    }

    

    const { data: getBefore } = useQuery('getBefore', beforeUpdate)

    const [title, setTitle] = useState(getBefore?.title)
    const [content, setContent] = useState(getBefore?.content)
    const [placename, setPlacename] = useState(getBefore?.placename)
    const [location, setLocation] = useState(getBefore?.location);
    const [season, setSeason] = useState(getBefore?.season);
    const [star, setStar] = useState(getBefore?.star);

    const updateTodoMutation = useMutation(updateBoard, {
        onSuccess: () => {
            // Invalidates cache and refetch
            queryClient.invalidateQueries("board")
        }
    })

    const handleLocation = (SelectedLocation) => {
        setLocation(SelectedLocation)
    }

    const handleSeason = (SelectedSeason) => {
        setSeason(SelectedSeason)
    }

    const handleStar = (SelectedStar) => {
        setStar(SelectedStar)
    }

    const submitHandler = async (e, id) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('star', star);
        formData.append('location', location);
        formData.append('placename', placename);
        formData.append('season', season);

        if (!title || !content || !star || !location || !placename || !season) {
            alert("모든 내용을 입력해주세요")
            return;
        }

        const accessToken = sessionStorage.getItem('accessToken');
        const refreshToken = sessionStorage.getItem('refreshToken');

        updateTodoMutation.mutate([id, formData, accessToken, refreshToken]);
        alert("등록되었습니다")
        navigate(`/main?season=${season}`)
    }

    return (
        <st.BodyStyle>
            <st.InputStyle
                width="70%"
                height='50px'
                name='title'
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='제목을 작성해주세요' />


            <st.ImageWrapper>
                <img src={getBefore?.image} alt="uploaded" />
            </st.ImageWrapper>

            <SelectLocation value={location} setLocation={handleLocation} />

            <SelectSeason value={season} setSeason={handleSeason} />

            <st.InputStyle
                width="70%"
                height='50px'
                name='placename'
                type='text'
                value={placename}
                onChange={(e) => setPlacename(e.target.value)}
                placeholder='장소 이름' />

            <SelectStar value={star} setStar={handleStar} />

            <st.InputStyle
                width="70%"
                height='100px'
                name='content'
                type='text'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='내용을 작성해주세요' />

            <st.Row>
                <sst.Button fn="form" id={getBefore?.id} onClick={(e) => submitHandler(e, id)}>완료</sst.Button>
                <sst.Button fn="del" onClick={() => navigate('/main?season=spring')}>취소</sst.Button>
            </st.Row>
        </st.BodyStyle>
    )
}

export default UpdateInput

