import React from 'react'
import * as st from './SelectST'

function SelectStar() {

    const searchStar = [
        {value: "five", label: "⭐⭐⭐⭐⭐"},
        {value: "four", label: "⭐⭐⭐⭐"},
        {value: "three", label: "⭐⭐⭐"},
        {value: "two", label: "⭐⭐"},
        {value: "one", label: "⭐"},
        {value: "oops", label: "😡"},
    ]

  return (
    <div>
        <st.SelectStyle  width="100%" height="50px">
            <option value="null">별점/비추 셀렉트</option>
            {searchStar.map(item => 
            <option key={item.value} value={item.value}>{item.label}</option>
            )}
        </st.SelectStyle>
    </div>
  )
}

export default SelectStar