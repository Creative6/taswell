import React, { useEffect, useState } from 'react'
import s from 'styled-components'
import Dot from "../widget/Dot";
import { GET_NOTICES } from '../api'
import { useHistory } from "react-router"
import { SET_NOTICE_READ } from '../api'
import Loading from '../widget/Loading'

const S: any = {
    Content: s.div`
    display: flex;
    flex-direction: column;
    width: 800px;
    background: #fff;
    padding: 15px;
    margin:0 auto;
    `,
    List: s.div`
    display: flex;
    font-size: 14px;
    border-bottom: 1px solid rgb(238, 238, 238);
    padding-bottom: 10px;
    margin-bottom: 10px;
    `,
    ListIcon: s.img`
    width: 30px;
    height: 30px;
    border-radius: 5px;
    margin-right: 10px;
    position: relative;
    top: 2px;
    `,
    ListBox: s.div`
    flex: 1 1 0%;
    `,
    ListBoxTop: s.div`
    font-size: 12px;
    color: #999;
    `,
    ListBoxBottom: s.div`
    font-size: 13px;
    margin-top: 2px;
    `,
    Link: s.a`
    color: skyblue;
    :hover{
        cursor: pointer;
        text-decoration: underline;
    }
    `,
    PreyText: s.span`
        color: #999;
        margin-right:5px;
    `,
    ContentText: s.div`
        font-size:14px;
        margin-top:5px;
    `,
    Empty: s.div`
        text-align:center;
        margin-bottom: 10px;
        font-size: 15px;
        width: 100%;
        padding: 10px;
    `
}

const T: React.FC = () => {
    const history = useHistory()

    const [list, setList] = useState<any>('')

    useEffect(() => {
        GET_NOTICES().then(rs => {
            setList(rs)
        })
    }, [])

    return (
        <>
            {
                !list ? <Loading /> : (list.length <= 0 ? <Loading text='- No Message -'/> : <S.Content>{list.map((item: any, index: any) => {
                    return <S.List key={index}>
                        <S.ListIcon src={item.avatar_url} />
                        <S.ListBox>
                            <S.ListBoxTop>
                                {item.name}
                                <Dot />
                                {item.create_time}
                            </S.ListBoxTop>
                            <S.ListBoxBottom>
                                <S.PreyText>在</S.PreyText>
                                <S.Link onClick={() => {
                                    SET_NOTICE_READ({ id: item.aid }).then((rs: any) => {
                                        history.push(`/article/${item.aid}`)
                                    })
                                }}>{item.title || 'NOTHING'}</S.Link>
                                <S.PreyText>中评论:</S.PreyText>
                            </S.ListBoxBottom>
                            <S.ContentText dangerouslySetInnerHTML={{ __html: item.content }} />
                        </S.ListBox>
                    </S.List>
                })}
                </S.Content>
                )
            }
        </>
    )
}

export default T