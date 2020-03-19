import React, { useEffect, useState } from "react"
import s from 'styled-components'
import { GET_TAGS } from '../api'

const S = {
    Item: s.div`
        height: 35px;
        display: flex;
        align-items: center;
        font-size: 13px;
        justify-content: space-between;
        padding: 0px 15px;
        transition: 0.2s;
        cursor: pointer;
        :hover{
            background: #eee;
        }
    `,
    Title: s.div`
    background: #fff;
    color: #000;
    height: 35px;
    line-height: 35px;
    text-indent: 15px;
    font-size: 14px;    
    >span{
        border-left:5px solid #000;
        padding-left:10px;
    }
    `,
    Tag: s.div`
        background: #3c3c3c;
        color: #fff;
        font-size: 12px;
        margin: 3px;
        padding: 5px 10px;
        cursor: pointer;
        transition: all 0.2s;
        :hover{
            background: #000 !important;
            color: #00ff1f;
        }
    `
}

const T: React.FC<any> = () => {
    const [data, setData] = useState<any>()
    useEffect(() => {
        GET_TAGS().then((rs: any) => {
            setData(rs.slice(-10))
        })
    }, [])

    const colorList: any = ['palevioletred', 'orange', 'cornflowerblue']

    return (
        <>
            <S.Title>
                <span>Tags -</span>
            </S.Title>
            <div style={{ background: '#fff', overflow: 'hidden', display: 'flex', flexWrap: 'wrap', padding: 10 }}>
                {
                    data && data.map((item: any, index: any) =>
                        <S.Tag
                            key={index}
                            style={{ background: colorList[index] || '#bfa7ba' }}
                            onClick={() => {
                                if (window.location.href.indexOf('searchresult') >= 0) {
                                    window.location.replace(`#/searchresult/${item.name}`)
                                } else {
                                    window.open(`#/searchresult/${item.name}`)
                                }
                            }}
                        >{item.name}-{item.num}</S.Tag>
                    )
                }
            </div>
        </>
    )
}

export default T