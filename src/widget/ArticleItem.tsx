import * as React from 'react'
import s from 'styled-components'
import Dot from './Dot'

const S = {
    Content: s.div`
        overflow: hidden;
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgb(221, 221, 221);
        margin: 15px;
    `,
    Imgbox: s.div`
        padding-top: 3px;
    `,
    Img: s.img`
        width: 40px;
        border-radius: 10px;
        margin-right: 12px;
    `,
    Box: s.div`
        flex: 1;
    `,
    Title: s.a`
        font-weight: bold;
        font-size: 17px;
        color: rgb(102, 102, 102);
        margin-bottom: 5px;
        text-decoration: none;
        cursor: pointer;
        :hover {
            text-decoration: underline;
        }
    `,
    Information: s.div`
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: rgb(102, 102, 102);
        padding: 5px 0px;
    `,
    PreviewContent: s.div`
        font-size: 12px;
        color: rgb(119, 119, 119);
        line-height: 1.5;
    `,
    CommentNum: s.span`
        font-weight: bold;
        margin-right: 3px;
    `
}

const T: React.FC = (props: any) => {
    const {
        avatar_url,
        title,
        name,
        create_time,
        preview_content,
        comment_num,
        id,
        simple
    } = props

    return (
        <S.Content>
            <S.Imgbox><S.Img src={avatar_url}/></S.Imgbox>
            <S.Box>
                <S.Title onClick={() => {
                    window.open(`#/article/${id}`)
                }}>{title}</S.Title>
                <S.Information>
                    <div>{name}<Dot/>{create_time}</div>
                    {comment_num > 0 &&
                    <div><S.CommentNum>{comment_num}</S.CommentNum>comment{comment_num > 1 && 's'}</div>}
                </S.Information>
                {!simple && <S.PreviewContent dangerouslySetInnerHTML={{__html: preview_content}}/>}
            </S.Box>
        </S.Content>
    )
}

export default T