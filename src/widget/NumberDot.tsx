import * as React from 'react'
import s from 'styled-components'

const Dot = s.span`
    width: 15px;
    height: 15px;
    line-height: 15px;
    text-align: center;
    display: inline-block;
    color: #fff;
    margin-right: 5px;
    font-size: 12px;
`

const colorList: any = ['#ff3939', '#19b3cc', '#da9d13']

const T: React.FC<any> = (props) => {
    return <Dot style={{ background: colorList[props.num - 1] || '#9cb9b8' }}>{props.num}</Dot>
}

export default T