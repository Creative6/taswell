import React, { useState } from 'react'
import s from 'styled-components'

const S = {
    Search: s.div`
    position: relative;
    width: 200px;
    height: 26px;
`,
    Input: s.input`
    background: #555;
    border: none;
    outline: none;
    height: 100%;
    color: #ccc;
    border-radius: 26px;
    width: 100%;
    padding-left: 15px;
    padding-right: 35px;
`,
    Icon: s.i`
    position: absolute;
    color: #ccc;
    right: 10px;
    top: 6px;
    cursor: pointer;
    transition: all 0.2s;
    :hover{
        color:#fff;
    }
`
}

const T: React.FC = (props) => {

    const [keyword, setKeyword] = useState<any>('')


    return (
        <S.Search>
            <S.Icon className='iconfont icon-search1'
                onClick={() => {
                    window.location.href = `/#/searchresult/${keyword}`
                }}
            />
            <S.Input
                placeholder={'WTF'}
                onChange={(e: any) => {
                    setKeyword(e.target.value)
                }}
            />
        </S.Search>
    )
}

export default T