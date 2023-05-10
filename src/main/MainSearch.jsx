import React, { useContext, useState } from 'react'
import * as st from './MainSt'
import * as sst from '../share/Style'
import { useSearchParams } from 'react-router-dom'
import { useSearchContext } from '../contexts/SearchContext'

function MainSearch() {

    // 전역 context
    const { setSearch } = useSearchContext()
    const search = useSearchContext()

    // 현재 페이지의 query string value 추출
    const [searchParams, setSearchParams] = useSearchParams()
    let season = searchParams.get('season')

    const searchWhere = [
        { value: "null", label: "선택해주세요" },
        { value: "sudogwon", label: "서울/경기/인천" },
        { value: "gangwon", label: "강원도" },
        { value: "chungchung", label: "충청도" },
        { value: "gyeongsang", label: "경상도" },
        { value: "jeolla", label: "전라도" },
        { value: "jeju", label: "제주도" }
    ]
    const [selectWhere, setSelectWhere] = useState(searchWhere[0])

    const [starRadio, setStarRadio] = useState([])
    const clickRadioHandler = (e) => {
        setStarRadio(e.target.value)
    }

    const [keyword, setKeyword] = useState('')

    // const [search, setSearch] = useState('')
    const searchSubmit = () => {
        if (selectWhere.value == 'null' && starRadio.length == 0 && keyword == '') {
            alert("한가지 이상의 조건을 선택하신 후, '검색하기'를 눌러주세요 😉")
            setSearch(`/main?season=${season}`)
        }
        else if (selectWhere.value == 'null' && starRadio.length == 0 && keyword.length >= 1) {
            setSearch(`/main?season=${season}&keyword=${keyword}`)
        }
        else if (selectWhere.value == 'null' && starRadio.length >= 1 && keyword == '') {
            setSearch(`/main?season=${season}&star=${starRadio}`)
        }
        else if (selectWhere.value !== 'null' && starRadio.length == 0 && keyword == '') {
            setSearch(`/main?season=${season}&location=${selectWhere.label}`)
        }
        else if (selectWhere.value !== 'null' && starRadio.length >= 1 && keyword == '') {
            setSearch(`/main?season=${season}&location=${selectWhere.label}&star=${starRadio}`)
        }
        else if (selectWhere.value !== 'null' && starRadio.length == 0 && keyword.length >= 1) {
            setSearch(`/main?season=${season}&location=${selectWhere.label}&keyword=${keyword}`)
        }
        else if (selectWhere.value == 'null' && starRadio.length >= 1 && keyword.length >= 1) {
            setSearch(`/main?season=${season}&star=${starRadio}&keyword=${keyword}`)
        }
        else if (selectWhere.value !== 'null' && starRadio.length >= 1 && keyword.length >= 1) {
            setSearch(`/main?season=${season}&location=${selectWhere.label}&star=${starRadio}&keyword=${keyword}`)
        }
    }
    // console.log('필터링 조건:', search)

    return (
        <st.SearchBox>
            <div><span className='spanBold'>정렬 기준</span>
                <sst.Row>
                    <input type="radio" value="acs" checked={starRadio === "acs"} onChange={clickRadioHandler} />
                    <label>별점 높은 순⭐</label>
                    <input type="radio" value="des" checked={starRadio === "des"} onChange={clickRadioHandler} />
                    <label>별점 낮은 순😡</label>
                </sst.Row></div>
            <div><span className='spanBold'>위치 선택</span>
                <sst.SelectStyle options={searchWhere} value={selectWhere} onChange={setSelectWhere} defaultValue={searchWhere[0]} />
            </div>
            <sst.Row>
                <sst.Column><span className='spanBold'>키워드 검색</span> <sst.Input value={keyword} onChange={(e) => setKeyword(e.target.value)} /></sst.Column>
                <sst.Button onClick={() => searchSubmit()}>검색하기</sst.Button>
            </sst.Row>
        </st.SearchBox>
    )
}

export default MainSearch