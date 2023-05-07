import React from 'react'
import * as st from './SelectST'

function SelectSeason() {

    const searchSeason = [
        {value: "spring", label: "봄"},
        {value: "summer", label: "여름"},
        {value: "autumn", label: "가을"},
        {value: "winter", label: "겨울"},
    ]

  return (
    <>
        <st.SelectStyle width="70%" height="50px" margintop="20px">
            <option value="null">계절 선택</option>
            {searchSeason.map(item => 
            <option key={item.value} value={item.value}>{item.label}</option>
            )}
        </st.SelectStyle>
    </>
  )
}

export default SelectSeason