import React from 'react'
import * as st from './SeasonSt'
import spring from '../spring.png'
import summer from '../summer.png'
import fall from '../fall.png'
import winter from '../winter.png'
import { useNavigate } from 'react-router-dom'

function Seasons() {

    let navigate = useNavigate()

    return (
            <st.AllSeasonBox>
                <st.SeasonBox style={{ background: 'url(' + spring + ')' }} season="봄" onClick={() => navigate('/main?season=spring')}><p className='SeasonBoxp'>봄</p></st.SeasonBox>
                <st.SeasonBox style={{ background: 'url(' + summer + ')' }} season="여름" onClick={() => navigate('/main?season=summer')}><p className='SeasonBoxp'>여름</p></st.SeasonBox>
                <st.SeasonBox style={{ background: 'url(' + fall + ')' }} season="가을" onClick={() => navigate('/main?season=fall')}><p className='SeasonBoxp'>가을</p></st.SeasonBox>
                <st.SeasonBox style={{ background: 'url(' + winter + ')' }} season="겨울" onClick={() => navigate('/main?season=winter')}><p className='SeasonBoxp'>겨울</p></st.SeasonBox>
            </st.AllSeasonBox>
    )
}

export default Seasons