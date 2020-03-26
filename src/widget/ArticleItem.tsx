import * as React from 'react'
import s from 'styled-components'
import Dot from './Dot'


const S = {
    Content: s.div`
        overflow: hidden;
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
        padding-bottom: 13px;
        border-bottom: 2px dashed rgb(221, 221, 221);
        margin: 15px;
    `,
    Imgbox: s.div`
        padding-top: 3px;
    `,
    Img: s.img`
        width: 40px;
        border-radius: 10px;
        margin-right: 12px;
        cursor: pointer;
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
        word-break: break-all;
    `,
    CommentNum: s.span`
        font-weight: bold;
        margin-right: 3px;
    `,
    Tag: s.div`
        float: left;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
        margin-right: 10px;
        transition: all 0.2s;
        font-weight:bold;
        color:#999;
        :hover{
            cursor: pointer;
            text-decoration: underline;
        };
        >i{
            font-size:12px;
            margin-right:3px;
        }
    `,
    NumTips: s.div`
        position: absolute;
        right: 0px;
        bottom: 0px;
        background: #00000087;
        width: 30px;
        height: 30px;
        color: #fff;
        text-align: center;
        line-height: 30px;
        font-size: 20px;
    `
}

const T: React.FC = (props: any) => {
    const {
        avatar_url,
        title,
        name,
        create_time,
        preview_content,
        preview_img,
        comment_num,
        id,
        simple,
        tag = '',
        // uid,
        hidePersonInfo = false
    } = props

    return (
        <S.Content>
            {
                !hidePersonInfo && <S.Imgbox>
                    <S.Img
                        src={avatar_url}
                        onError={(e: any) => {
                            e.target.onerror = null
                            e.target.src = 'http://rs.creative6.cn/icon/badimg.png'
                        }}
                        onClick={() => {
                            window.open(`#/users/${name}`)
                        }}
                    />
                </S.Imgbox>
            }
            <S.Box>
                <S.Title onClick={() => {
                    window.open(`#/article/${id}`)
                }}>{title || 'UNKONW'}</S.Title>
                <S.Information>
                    {!hidePersonInfo ? <div>{name}<Dot />{create_time}</div> : <div>{create_time}</div>}
                    {comment_num > 0 &&
                        <div><S.CommentNum>{comment_num}</S.CommentNum>comment{comment_num > 1 && 's'}</div>}
                </S.Information>
                {!simple && <S.PreviewContent dangerouslySetInnerHTML={{ __html: preview_content }} />}
                {
                    !simple && preview_img &&
                    <div style={{ marginTop: 5, overflow: 'hidden' }}>
                        {preview_img.length > 0 &&
                            preview_img.slice(0, 3).map((item: any, index: any) =>
                                <div key={index} style={{
                                    width: 200,
                                    height: 200,
                                    background: '#000',
                                    float: 'left',
                                    marginRight: 5,
                                    marginBottom: 5,
                                    overflow: 'hidden',
                                    position: 'relative',
                                }}>
                                    <img
                                        src={item}
                                        onError={(e: any) => {
                                            e.target.onerror = null
                                            e.target.src = 'http://rs.creative6.cn/icon/badimg.png'
                                        }}
                                        alt=""
                                        style={{
                                            position: 'absolute',
                                            left: '50%',
                                            top: '50%',
                                            transform: 'translate(-50%,-50%)',
                                            width: '100%'
                                        }} />
                                    {preview_img.length > 3 && index === 2 && <S.NumTips>{preview_img.length}</S.NumTips>}
                                </div>
                            )
                        }
                    </div>
                }
                <div style={{ overflow: 'hidden' }}>
                    {
                        tag && tag.split('|').map((item: any, index: any) => <S.Tag
                            key={index}
                            onClick={() => {
                                if (window.location.href.indexOf('searchresult') >= 0) {
                                    window.location.replace(`#/searchresult/${item}`)
                                } else {
                                    window.open(`#/searchresult/${item}`)
                                }
                            }}
                        ><i className={'iconfont icon-tag'} />{item}</S.Tag>)
                    }
                </div>
            </S.Box>
        </S.Content >
    )
}

export default T