import React, { useState } from 'react'
import * as st from './BoardST'
import * as sst from '../share/Style'
import SelectLocation from './SelectLocation';
import axios from '../api/boardApi'
import SelectStar from './SelectStar';
import SelectSeason from './SelectSeason';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { beforeUpdate } from '../api/boardApi';
import useInput from '../hooks/useInput';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateInput() {

    let navigate = useNavigate()

    const queryClient = useQueryClient()

    let { id } = useParams();

    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

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
        } catch (error) {
            console.log(error)
        }
    }

    // console.log("1" + beforeUpdate([id, accessToken, refreshToken]).then((res) => {
    //     console.log(res)
    // }))

    const { data: getBefore } = useQuery('getBefore', beforeUpdate)

    const [title, titleHandler, resetTitle] = useInput('')
    const [location, locationHandler, resetLocation] = useInput('')
    const [content, contentHandler, resetContent] = useInput('')
    const [placename, placenameHandler, resetPlace] = useInput('')
    const [star, starHandler, resetStar] = useInput('')
    const [season, seasonHandler, resetSeason] = useInput('')

    // const [atitle, setTitle] = useState(getBefore.title)

    // console.log("2" + getBefore)
    // console.log("3" + getBefore.title)

    // const [title, setTitle] = useState('')

    // console.log(title)
    // const [content, contentHandler, resetContent] = useInput('')
    // const [placename, placenameHandler, resetPlace] = useInput('')
    // const [image, setImage] = useState(null);
    // const [location, setLocation] = useState('');
    // const [season, setSeason] = useState('');
    // const [star, setStar] = useState('');

    // const mutation = useMutation(beforeUpdate)

    // const handleLocation = (SelectedLocation) => {
    //     setLocation(SelectedLocation)
    // }

    // const handleSeason = (SelectedSeason) => {
    //     setSeason(SelectedSeason)
    // }

    // const handleStar = (SelectedStar) => {
    //     setStar(SelectedStar)
    // }

    // const submitHandler = async (e) => {
    //     e.preventDefault();

    //     const formData = new FormData();
    //     formData.append('title', title);
    //     formData.append('content', content);
    //     formData.append('star', star);
    //     formData.append('location', location);
    //     formData.append('placename', placename);
    //     formData.append('season', season);

        // if (image) {
        //     formData.append('image', image.raw);
        // }

    //     if (!title || !content || !star || !location || !placename || !season ) {
    //         alert("모든 내용을 입력해주세요")
    //         return;
    //     }

    //     const accessToken = localStorage.getItem('accessToken');
    //     const refreshToken = localStorage.getItem('refreshToken');

    //     await mutation.mutateAsync([formData, accessToken, refreshToken]);
    //     alert("등록되었습니다")
    //     navigate(`/main?season=${season}`)
    // }

    // const handleImageChange = (e) => {
    //     if (e.target.files.length) {
    //         const file = e.target.files[0]
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(e.target.files[0]);
    //         fileReader.onloadend = () => {
    //             setImage({
    //                 preview: fileReader.result,
    //                 raw: file
    //             });
    //         };
    //     }
    // };
    
    return (
        <form>
            <st.BodyStyle>
                <st.InputStyle
                    width="70%"
                    height='50px'
                    name='title'
                    type='text'
                    value={getBefore?.title}
                    onChange={titleHandler}
                    placeholder='제목을 작성해주세요' />

                {/* {image ? (
                    <st.ImageWrapper>
                        <img src={image.preview} alt="uploaded" />
                    </st.ImageWrapper>
                ) : <st.ImagePlaceholder>이미지를 추가해주세요</st.ImagePlaceholder>} */}
{/* 
                <st.InputStyle
                    width="70%"
                    height='50px'
                    name='image'
                    type='file'
                    onChange={handleImageChange} /> */}
{/* 
                <SelectLocation value={getBefore?.location} setLocation={handleLocation} />

                <SelectSeason value={getBefore?.season} setSeason={handleSeason} /> */}

                <st.InputStyle
                    width="70%"
                    height='50px'
                    name='placename'
                    type='text'
                    value={getBefore?.placename}
                    onChange={placenameHandler}
                    placeholder='장소 이름' />

                {/* <SelectStar value={getBefore?.star} setStar={handleStar} /> */}

                <st.InputStyle
                    width="70%"
                    height='100px'
                    name='content'
                    type='text'
                    value={getBefore?.content}
                    onChange={contentHandler}
                    placeholder='내용을 작성해주세요' />

                <st.Row>
                    <sst.Button fn="form">완료</sst.Button>
                    <sst.Button fn="del" onClick={() => navigate(-1)}>취소</sst.Button>
                </st.Row>
            </st.BodyStyle>
        </form>
    )      
}

export default UpdateInput

