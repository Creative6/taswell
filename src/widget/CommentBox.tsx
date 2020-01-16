import React, { useState, useEffect } from 'react'
import s from 'styled-components'
import { SET_COMMENT_SAVE, GET_COMMENTS } from '../api'
import Dot from './Dot'

const S: any = {
    SB1: s.div`
    display: flex;
    flex-direction: column;
    `,
    TextArea: s.textarea`
    border: none;
    outline: none;
    width: 100%;
    padding: 10px;
    font-family: unset;
    height: 100px;
    resize: none;
    `,
    FucBox: s.div`
    display: flex;
    height: 30px;
    background: #ddd;
    align-items: center;
    font-size: 13px;
    `,
    FucBoxLeft: s.div`
    flex: 1;
    `,
    FucBoxRight: s.div`
    width: 80px;
    height: 100%;
    line-height: 30px;
    text-align: center;
    background: #ccc;
    cursor: pointer;
    transition: 0.2s;
    :hover{
    background: #bbb;
    }
    `,
    Icon: s.i`
    color: #888;
    margin-left: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: 0.2s;
    :hover{
    color: skyblue;
    }
    `,
    ListBody: s.div`
    background: #fff;
    padding: 10px;
    padding-bottom: 1px;
    max-height: calc(100vh - 250px);
    overflow: auto;
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
    CommentTips: s.div`
    background: #fff;
    font-size: 13px;
    font-weight: bold;
    padding: 5px 10px;
    border-bottom: 1px dashed #eee;
    color:#666;
    &>i{
        margin-right:5px;
        font-size:13px;
    }
    `
}

const T: React.FC = (props: any) => {
    const [aid, setAid] = useState('')
    const [tragetUid, setTragetUid] = useState('')
    const [content, setContent] = useState('')
    const [list, setList] = useState<any>([])

    useEffect(() => {
        console.log({ props })
        const { id, uid } = props
        setAid(id)
        setTragetUid(uid)
        getComments(id)
    }, [props])

    const getComments = (id: any) => {
        GET_COMMENTS({ id }).then(rs => {
            setList(rs)
            setContent('')
        })
    }

    return (
        <>
            <S.SB1>
                <S.TextArea
                    placeholder={'Leave an interesting comment!'}
                    onChange={(e: any) => { setContent(e.target.value) }}
                    value={content}
                ></S.TextArea>
                <S.FucBox>
                    <S.FucBoxLeft>
                        <S.Icon className={'iconfont icon-biaoqing'}></S.Icon>
                        <S.Icon className={'iconfont icon-code1'}></S.Icon>
                    </S.FucBoxLeft>
                    <S.FucBoxRight onClick={() => {
                        console.log({ aid, tragetUid, content, uid: '056C7015293CC3AC8C4E5C75F0ACF24A' })
                        SET_COMMENT_SAVE({ aid, tragetUid, content: content.substring(0, 200), uid: '056C7015293CC3AC8C4E5C75F0ACF24A' }).then(rs => {
                            console.log(rs)
                            getComments(props.id)
                        })
                    }}>PUBLISH</S.FucBoxRight>
                </S.FucBox>
            </S.SB1>
            <S.CommentTips>
                <i className={'iconfont icon-comment'}></i>
                {list.length} comments</S.CommentTips>
            {list.length > 0 && <S.ListBody>
                {
                    list.map((item: any, index: any) => {
                        return (
                            <S.List key={index}>
                                <S.ListIcon src={item.avatar_url} />
                                <S.ListBox>
                                    <S.ListBoxTop>
                                        {item.name}
                                        <Dot />
                                        {item.create_time}
                                    </S.ListBoxTop>
                                    <S.ListBoxBottom dangerouslySetInnerHTML={{ __html: item.content }} />
                                </S.ListBox>
                            </S.List>
                        )
                    })
                }
            </S.ListBody>}
        </>
    )
}

export default T