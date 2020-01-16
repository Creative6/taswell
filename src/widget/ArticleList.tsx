import React, { useEffect, useState } from 'react'
import s from 'styled-components'
import ArticleItem from './ArticleItem'
import { GET_ARTICLES } from '../api'

const S = {
    LoadBtn: s.div`
        text-align: center;
        height: 30px;
        background: #000;
        font-size: 13px;
        line-height: 30px;
        cursor: pointer;
        color: #eee;
        width: 100px;
        margin: 10px auto;
    `
}

const T: React.FC = () => {
    const [list, setList] = useState<any>()
    const [page, setPage] = useState<any>(0)

    useEffect(() => {
        GET_ARTICLES().then((rs: any) => {
            setList(rs)
        })
    }, [])

    return (
        <>
            {list && list.map((item: any) => <ArticleItem key={item.id} {...item}>{item.title}</ArticleItem>)}
            <S.LoadBtn onClick={() => {
                let nowPage = page + 1
                GET_ARTICLES({ page: nowPage }).then((rs: any) => {
                    setList(list.concat(rs))
                })
                setPage(nowPage)
            }}>LOAD</S.LoadBtn>
        </>
    )
}

export default T