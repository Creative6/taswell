import * as React from 'react'
import s from 'styled-components'

const Dot = s.span`
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    display: inline-block;
    color: #fff;
    margin-right: 10px;
    border-radius: 20px;
`

const colorList: any = ['palevioletred', 'orange', 'cornflowerblue']

const T: React.FC<any> = (props) => {
    return <Dot style={{ background: colorList[props.num - 1] || 'lightseagreen' }}>{props.num}</Dot>
}

export default T