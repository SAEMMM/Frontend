import React from 'react'
import * as st from './SelectST'

function SelectSeason(props) {

  const {season, setSeason} = props

  const handlechange = (e) => {
    setSeason(e.target.value)
  }

    const searchSeason = [
        {value: "spring", label: "봄"},
        {value: "summer", label: "여름"},
        {value: "autumn", label: "가을"},
        {value: "winter", label: "겨울"},
    ]

  return (
    <>
        <st.SelectStyle width="71%" height="50px" margintop="20px" value={season} onChange={handlechange}>
            <option value="null">계절 선택</option>
            {searchSeason.map(item => 
            <option key={item.value} value={item.value}>{item.label}</option>
            )}
        </st.SelectStyle>
    </>
  )
}

export default SelectSeason