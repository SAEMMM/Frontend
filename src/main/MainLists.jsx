import React from 'react'
import * as st from './MainSt'
import * as sst from '../share/Style'
import { useQueryClient, useQuery, useMutation } from 'react-query'
import { getBoard, deleteBoard } from '../api/boardApi'

function MainLists() {

    const queryClient = useQueryClient()
    const { data: board } = useQuery('board', getBoard)

    const deleteBoardMutation = useMutation(deleteBoard, {
        onSuccess: () => {
            // Invalidates cache and refetch
            queryClient.invalidateQueries('board')
        }
    })

    const onClickDelBtn = (id) => {
        if(window.confirm('삭제하시겠습니까?')) {
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
                board?.map((item) => {
                    return (
                        <st.MainListBox key={item.id}>
                            <sst.End>
                                <sst.Button fn="form">수정</sst.Button>
                                <sst.Button fn="del"
                                onClick={() => onClickDelBtn({id: item.id})}>삭제</sst.Button>
                            </sst.End>
                            <st.Title season={item.season}><h1 className='TitleH1'>{item.title} {seasonIcon(item.season)}</h1></st.Title>
                            <st.Image>이미지입니다</st.Image>
                            <sst.Row>
                                <span className='spanbold'>별점</span>&nbsp;<st.ShowBox type="select">{starIcon(item.star)}</st.ShowBox>
                                <span className='spanbold'>위치</span>&nbsp;<st.ShowBox type="select">{item.location}</st.ShowBox>
                            </sst.Row>
                            <span className='spanbold'>👉 {item.placename}</span>
                            <st.ShowBox type="contents">{item.content}</st.ShowBox>
                        </st.MainListBox>
                    )
                })
            }
        </>
    )
}

export default MainLists