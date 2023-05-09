import React from 'react'
import * as st from './MainSt'
import * as sst from '../share/Style'
import { useQueryClient, useQuery, useMutation } from 'react-query'
import { getSpring, getSummer, getFall, getWinter, deleteBoard } from '../api/boardApi'
import { useSearchParams } from 'react-router-dom'

function MainLists() {

    const [searchParams, setSearchParams] = useSearchParams()

    let season = searchParams.get('season')
    console.log('현재페이지:', season)

    const queryClient = useQueryClient()

    const { data: spring } = useQuery('spring', getSpring)
    const { data: summer } = useQuery('summer', getSummer)
    const { data: fall } = useQuery('fall', getFall)
    const { data: winter } = useQuery('winter', getWinter)

    const deleteBoardMutation = useMutation(deleteBoard, {
        onSuccess: () => {
            // Invalidates cache and refetch
            queryClient.invalidateQueries('board')
        }
    })

    const onClickDelBtn = (id) => {
        if (window.confirm('삭제하시겠습니까?')) {
            // 삭제 mutation
            deleteBoardMutation.mutate(id)
            alert('삭제되었습니다')
        } else {
            return false
        }
    }

    const seasonIcon = (season) => {
        if (season == 'spring') {
            return '🌷'
        } else if (season == 'summer') {
            return '🌊'
        } else if (season == 'fall') {
            return '🍂'
        } else if (season == 'winter') {
            return '⛄'
        }
    }

    const starIcon = (star) => {
        if (star == '1') {
            return '⭐'
        } else if (star == '2') {
            return '⭐⭐'
        } else if (star == '3') {
            return '⭐⭐⭐'
        } else if (star == '4') {
            return '⭐⭐⭐⭐'
        } else if (star == '5') {
            return '⭐⭐⭐⭐⭐'
        } else if (star == '0') {
            return '😡'
        }
    }

    return (
        <>
            {
                (season == 'spring' ? spring : (season == 'summer' ? summer : (season == 'fall' ? fall : winter)))?.map((item) => {
                    return (
                        <st.MainListBox key={item.id}>
                            <sst.End>
                                <sst.Button fn="form">수정</sst.Button>
                                <sst.Button fn="del"
                                    onClick={() => onClickDelBtn({ id: item.id })}>삭제</sst.Button>
                            </sst.End>
                            <st.Title season={item.season}><h1 className='TitleH1'>{item.title} {seasonIcon(item.season)}</h1></st.Title>
                            <st.Image style={{ background: `url('${item.image}')` }}></st.Image>
                            <sst.Row>
                                <span className='spanbold'>별점</span>&nbsp;<st.ShowBox type="select">{starIcon(item.star)}</st.ShowBox>
                                <span className='spanbold'>위치</span>&nbsp;<st.ShowBox type="select">{item.location}</st.ShowBox>
                            </sst.Row>
                            <span className='spanbold'>장소 👉 {item.placename}</span>
                            <st.ShowBox type="contents">{item.content}</st.ShowBox>
                        </st.MainListBox>
                    )
                })
            }
        </>
    )
}

export default MainLists