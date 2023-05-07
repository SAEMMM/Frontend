import React from 'react'
import * as st from './SelectST'

function SelectLocation() {

    const searchWhere = [
        {value: "sudogwon", label: "서울/경기/인천"},
        {value: "gangwon", label: "강원도"},
        {value: "chungchung", label: "충청도"},
        {value: "gyeongsang", label: "경상도"},
        {value: "jeolla", label: "전라도"},
        {value: "jeju", label: "제주도"},
    ]

  return (
    <>
        <st.SelectStyle width="70%" height="50px" margintop="20px">
            <option value="null">지역 선택</option>
            {searchWhere.map(item => 
            <option key={item.value} value={item.value}>{item.label}</option>
            )}
        </st.SelectStyle>
    </>
  )
}

export default SelectLocation