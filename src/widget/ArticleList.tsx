import React, { useEffect, useState } from 'react'
import s from 'styled-components'
import ArticleItem from './ArticleItem'
import Loading from '../widget/Loading'
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
    const [loading, setLoading] = useState<any>(false)

    useEffect(() => {
        GET_ARTICLES().then((rs: any) => {
            setList(rs)
        })
    }, [])

    return (
        <>
            {!list ? <Loading /> : list.map((item: any) => <ArticleItem key={item.id} {...item}>{item.title}</ArticleItem>)}
            <S.LoadBtn onClick={() => {
                let nowPage = page + 1
                setLoading(true)
                GET_ARTICLES({ page: nowPage }).then((rs: any) => {
                    setLoading(false)
                    setList(list.concat(rs))
                })
                setPage(nowPage)
            }}>{loading ? 'Loading...' : 'Load More'}</S.LoadBtn>
        </>
    )
}

export default T