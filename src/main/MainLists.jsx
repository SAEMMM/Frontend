import React, { useEffect } from 'react'
import * as st from './MainSt'
import * as sst from '../share/Style'
import axios from '../api/boardApi'
import { useQueryClient, useQuery, useMutation } from 'react-query'
import { deleteBoard } from '../api/boardApi'
import { useSearchParams } from 'react-router-dom'
import { useSearchContext } from '../contexts/SearchContext'

function MainLists() {

    // 필터링 state
    const search = useSearchContext()

    // 현재 페이지의 query string value 추출
    const [searchParams, setSearchParams] = useSearchParams()
    let season = searchParams.get('season')

    const queryClient = useQueryClient()

    // 현재 페이지별 Api
    const getBoard = async () => {
        const response = await axios.get(`/api/boards?season=${season}`)
        return response.data.data
    }

    const { data: board } = useQuery('board', getBoard)

    // 삭제 기능
    const deleteBoardMutation = useMutation(deleteBoard, {
        onSuccess: () => {
            // Invalidates cache and refetch
            queryClient.invalidateQueries('board')
            alert('삭제되었습니다')
        },
        onError: () => {
            alert('게시물을 삭제할 수 없습니다')
        }
    })

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    const onClickDelBtn = (id) => {
        if (window.confirm('삭제하시겠습니까?')) {
            deleteBoardMutation.mutate([id.id, accessToken, refreshToken])
        } else {
            return false
        }
    }

    // 페이지별(계절) 제목 테마
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

    useEffect(() => {
        
    }, [season])

    return (
        <>
            {
                board?.map((item) => {
                    return (
                        <st.MainListBox key={item.id}>
                            <sst.End>
                                <sst.Button fn="form">수정</sst.Button>
                                <sst.Button fn="del"
                                    onClick={() => onClickDelBtn({ id: item.id })}>삭제</sst.Button>
                            </sst.End>
                            <st.Title season={item.season}><h1 className='TitleH1'>{item.title} {seasonIcon(item.season)}</h1></st.Title>
                            <st.Image><st.Imageload style={{ background: `url('${item.image}')` }}></st.Imageload></st.Image>
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