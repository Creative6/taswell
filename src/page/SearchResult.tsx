import React, { useEffect, useState } from 'react'
import s from 'styled-components'
import { GET_SEARCH_RESULT } from '../api'
import ArticleItem from '../widget/ArticleItem'
import Loading from '../widget/Loading'

const S: any = {
    Content: s.div`
        width: 800px;
        background: #fff;
        overflow: hidden;
        margin: 0 auto;
    `,
    Empty: s.div`
        text-align:center;
        margin: 10px;
        font-size: 13px;
    `,
    Num: s.span`
        font-weight: bold;
    `,
    Loading: s.div`
        text-align: center;
        width: 100%;
    `
}

const T: React.FC = (props: any) => {

    const [list, setList] = useState<any>('')
    const [keyword, setKeyword] = useState<any>('')

    useEffect(() => {
        const { match } = props
        const { params } = match
        const { keyword } = params
        setKeyword(keyword)
        GET_SEARCH_RESULT({ keyword }).then(rs => {
            setList(rs)
        })
    }, [props])

    return (
        <>
            {
                !list ? <Loading /> : (list.length <= 0 ? <Loading text='- No Result -' /> : <S.Content><Loading text={`- ${list.length} RESULT${list.length > 1 && 'S'} FOUND FOR "${keyword}" -`} />{list.map((item: any, index: any) => {
                    return <ArticleItem key={index} {...item} />
                })}
                </S.Content>
                )
            }
        </>
    )
}

export default T