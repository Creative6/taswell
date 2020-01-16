import * as React from 'react'
import s from 'styled-components'

const Search = s.div`
    position: relative;
    width: 200px;
    height: 26px;
`

const Input = s.input`
    background: #555;
    border: none;
    outline: none;
    height: 100%;
    color: #ccc;
    border-radius: 26px;
    width: 100%;
    padding-left: 30px;
`

const T: React.FC = () => {
    return (
        <Search>
            <i className='iconfont icon-search1' style={{ position: 'absolute', color: '#ccc', left: 6, top: 6 }} />
            <Input placeholder={'Concentration'} />
        </Search>
    )
}

export default T