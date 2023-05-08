import React, { useState } from 'react'
import * as st from './MainSt'
import * as sst from '../share/Style'

function MainSearch() {

    const searchWhere = [
        { value: "sudogwon", label: "서울/경기/인천" },
        { value: "gangwon", label: "강원도" },
        { value: "chungchung", label: "충청도" },
        { value: "gyeongsang", label: "경상도" },
        { value: "jeolla", label: "전라도" },
        { value: "jeju", label: "제주도" },
    ]
    const [selectWhere, setSelectWhere] = useState(searchWhere[0])

   
    const [starRadio, setStarRadio] = useState([])
    const clickRadioHandler = (e) => {
        setStarRadio(e.target.value)
    }

    return (
        <st.SearchBox>
            <div><span className='spanBold'>정렬 기준</span>
                <sst.Row>
                    <input type="radio" value="1" checked={starRadio === "1"} onChange={clickRadioHandler} />
                    <label>별점 높은 순⭐</label>
                    <input type="radio" value="2" checked={starRadio === "2"} onChange={clickRadioHandler} />
                    <label>별점 낮은 순😡</label>
                </sst.Row></div>
            <div><span className='spanBold'>위치 선택</span><sst.SelectStyle options={searchWhere} onChange={setSelectWhere} defaultValue={searchWhere[0]} /></div>
            <sst.Row>
                <sst.Column><span className='spanBold'>키워드 검색</span> <sst.Input /></sst.Column>
                <sst.Button>검색하기</sst.Button>
            </sst.Row>
        </st.SearchBox>
    )
}

export default MainSearch