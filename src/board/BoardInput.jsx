import React, { useState } from 'react'
import * as st from './BoardST'
import * as sst from '../share/Style'
import SelectLocation from './SelectLocation';
import SelectStar from './SelectStar';
import SelectSeason from './SelectSeason';
import { useMutation } from 'react-query';
import { addPost } from '../api/boardApi';
import useInput from '../hooks/useInput';

function BoardInput() {

    const [title, titleHandler] = useInput('')
    const [content, contentHandler] = useInput('')
    const [placename, placenameHandler] = useInput('')
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

    const mutation = useMutation(addPost);

    const submitHandler = async (e) => {
        e.preventDefault();
        
        //현재 json서버에서는 불가능
        // const formData = new FormData();
        // formData.append('title', title);
        // formData.append('content', content);

        // if (image) {
        //     formData.append('image', image.raw);
        // }

        const newBoard = {
            title,
            content,
            placename,
            location,
            season,
            star,
        }

        try {
            await mutation.mutateAsync(newBoard)
            console.log('게시물 전송 성공')
        } catch (error) {
            console.log('게시물 전송 실패')
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

    return (
        <form onSubmit={submitHandler}>
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

                {/* {image && <img src={image.preview} alt="uploaded"/>} */}

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
                    <sst.Button fn="form">작성완료</sst.Button>
                    <sst.Button fn="del">취소</sst.Button>
                </st.Row>
            </st.BodyStyle>
        </form>
    )
}

export default BoardInput

