import React, { useState } from 'react'
import * as st from './BoardST'
import * as sst from '../share/Style'
import SelectLocation from './SelectLocation';
import SelectStar from './SelectStar';
import SelectSeason from './SelectSeason';
import { useMutation } from 'react-query';
import { addPost } from '../api/boardApi';
import useInput from '../hooks/useInput';
import { useNavigate } from 'react-router-dom';

function BoardInput() {

    const navigate = useNavigate()

    const [title, titleHandler, resetTitle] = useInput('')
    const [content, contentHandler, resetContent] = useInput('')
    const [placename, placenameHandler, resetPlace] = useInput('')
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState('');
    const [season, setSeason] = useState('');
    const [star, setStar] = useState('');

    const handleLocation = (SelectedLocation) => {
        setLocation(SelectedLocation)
    }

    const handleSeason = (SelectedSeason) => {
        setSeason(SelectedSeason)
    }

    const handleStar = (SelectedStar) => {
        setStar(SelectedStar)
    }

    const isLogin = sessionStorage.getItem('isLogin')

    const mutation = useMutation(addPost, {
        onError: () => {
            alert('로그인이 필요합니다')
            navigate('/login')
        }
    })

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('star', star);
        formData.append('location', location);
        formData.append('placename', placename);
        formData.append('season', season);

        if (image) {
            formData.append('image', image.raw);
        }

        if (!title || !content || !star || !location || !placename || !season || !image) {
            alert("모든 내용을 입력해주세요")
            return;
        } else {
            const accessToken = sessionStorage.getItem('accessToken');
            const refreshToken = sessionStorage.getItem('refreshToken');

            await mutation.mutateAsync([formData, accessToken, refreshToken]);
            alert("등록되었습니다")
            navigate(`/main?season=${season}`)
            resetTitle('');
            resetContent('');
            resetPlace('');
            setImage(null);
        }
    }

    const handleImageChange = (e) => {
        if (e.target.files.length) {
            const file = e.target.files[0]
            const fileReader = new FileReader();
            fileReader.readAsDataURL(e.target.files[0]);
            fileReader.onloadend = () => {
                setImage({
                    preview: fileReader.result,
                    raw: file
                });
            };
        }
    };

    if (isLogin === 'isLogin') {
        return (
            <st.BodyStyle>
                <st.InputStyle
                    width="70%"
                    height='50px'
                    name='title'
                    type='text'
                    value={title}
                    onChange={titleHandler}
                    placeholder='제목을 작성해주세요' />

                {image ? (
                    <st.ImageWrapper>
                        <img src={image.preview} alt="uploaded" />
                    </st.ImageWrapper>
                ) : <st.ImagePlaceholder>이미지를 추가해주세요</st.ImagePlaceholder>}

                <st.InputStyle
                    width="70%"
                    height='50px'
                    name='image'
                    type='file'
                    onChange={handleImageChange} />

                <SelectLocation value={location} setLocation={handleLocation} />

                <SelectSeason value={season} setSeason={handleSeason} />

                <st.InputStyle
                    width="70%"
                    height='50px'
                    name='placename'
                    type='text'
                    value={placename}
                    onChange={placenameHandler}
                    placeholder='장소 이름' />

                <SelectStar value={star} setStar={handleStar} />

                <st.InputStyle
                    width="70%"
                    height='100px'
                    name='content'
                    type='text'
                    value={content}
                    onChange={contentHandler}
                    placeholder='내용을 작성해주세요' />

                <st.Row>
                    <sst.Button fn="form" onClick={submitHandler}>완료</sst.Button>
                    <sst.Button fn="del" onClick={() => navigate(-1)}>취소</sst.Button>
                </st.Row>
            </st.BodyStyle>
        )
    } else {
        alert('로그인이 필요합니다')
        navigate('/login')
        return null;
    }
}

export default BoardInput

