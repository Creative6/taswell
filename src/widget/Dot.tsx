import * as React from 'react'
import s from 'styled-components'

const Dot = s.span`
    font-weight: 700;
    color: #ccc;
    margin: 0 6px;
`
const T: React.FC = () => {
    return <Dot>•</Dot>
}

export default T