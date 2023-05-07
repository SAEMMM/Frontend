import React, { useState } from 'react'
import * as st from './BoardST'
import SelectLocation from './SelectLocation';
import SelectStar from './SelectStar';
import SelectSeason from './SelectSeason';

function BoardInput() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null); //custom hook 고민해보기

    const onTitleChangeHadler = (e) => {
        setTitle(e.target.value);
    }

    const onContentChangeHadler = (e) => {
        setContent(e.target.value);
    }

    const handleImageChange = (e) => {
        if (e.target.files.length) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(e.target.files[0]);
            fileReader.onloadend = () => {
                setImage({
                    preview: fileReader.result,
                    raw: e.target.files[0]
                });
            };
        }
    };

    return (
        <st.BodyStyle>
            <st.InputStyle
                width="70%"
                height='50px'
                name='title'
                type='text'
                value={title}
                onChange={onTitleChangeHadler}
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

            <SelectLocation />

            <SelectSeason />

            <st.InputStyle
                width="70%"
                height='50px'
                name='placename'
                type='text'
                placeholder='장소 이름' />

            <SelectStar />

            <st.InputStyle
                width="70%"
                height='100px'
                name='content'
                type='text'
                value={content}
                onChange={onContentChangeHadler}
                placeholder='내용을 작성해주세요' />

            <div>
                <button>작성완료</button>
                <button>취소</button>
            </div>
        </st.BodyStyle>
    )
}

export default BoardInput

