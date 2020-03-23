import React, { useEffect, useState } from 'react'
import s from 'styled-components'
import { GET_ARTICLES_BY_USER, GET_ARTICLES_BY_MY } from '../api'
import ArticleItem from './ArticleItem'
import Loading from './Loading'

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
    `,
    UserInfoContent:s.div`
        display:flex;
    `,
    UserIcon:s.img`
        width:100px;
        height:100px;
    `
}

const T: React.FC<any> = (props: any) => {
    const [userinfo, setUserinfo] = useState<any>({})
    const [list, setList] = useState<any>('')

    useEffect(() => {
        const { uid, type = 0 } = props
        console.log(uid)
        if (type * 1 === 1) {
            GET_ARTICLES_BY_MY().then((rs: any) => {
                setList(rs.list)
            })
        } else {
            GET_ARTICLES_BY_USER({ uid }).then((rs: any) => {
                setList(rs.list)
                setUserinfo(rs.userinfo)
            })
        }
    }, [props])

    return (
        <S.Content>
            {
                Object.keys(userinfo || {}).length > 0 && <S.UserInfoContent>
                    <S.UserIcon src={userinfo.avatar_url} alt="" />
                    <div>
                        <div>{userinfo.name}</div>
                        <div>{userinfo.html_url}</div>
                        <div>{userinfo.email}</div>
                        <div>{userinfo.bio}</div>
                    </div>
                </S.UserInfoContent>
            }
            {
                !list ? <Loading /> : (list.length <= 0 ? <Loading text='- No Release -' /> : <div><Loading text={`Found ${list.length} releases`} />{list.map((item: any, index: any) => {
                    return <ArticleItem key={index} {...item} hidePersonInfo />
                })}
                </div>
                )
            }
        </S.Content>
    )
}

export default T