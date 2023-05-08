import React from 'react'
import * as st from './SelectST'

function SelectStar(props) {

  const {star, setStar} = props

  const handlechange = (e) => {
    setStar(e.target.value)
  }

    const searchStar = [
        {value: "five", label: "⭐⭐⭐⭐⭐"},
        {value: "four", label: "⭐⭐⭐⭐"},
        {value: "three", label: "⭐⭐⭐"},
        {value: "two", label: "⭐⭐"},
        {value: "one", label: "⭐"},
        {value: "oops", label: "😡"},
    ]

  return (
    <>
        <st.SelectStyle width="71%" height="50px" margintop="20px" value={star} onChange={handlechange}>
            <option value="null">별점/비추 셀렉트</option>
            {searchStar.map(item => 
            <option key={item.value} value={item.value}>{item.label}</option>
            )}
        </st.SelectStyle>
    </>
  )
}

export default SelectStar