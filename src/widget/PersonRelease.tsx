import React, { useEffect, useState } from 'react'
import s from 'styled-components'
import {
    GET_ARTICLES_BY_USER,
    GET_USERINFO_BY_ID,
    GET_FOLLOWING,
    GET_FOLLOWERS,
    SET_FOLLOW
} from '../api'
import ArticleItem from './ArticleItem'
import Loading from './Loading'
import UserItem from '../widget/UserItem'
import jwt from 'jwt-decode'
import Cookies from 'js-cookie'

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
    UserInfoContent: s.div`
        position:relative;
        background: url(http://rs.creative6.cn/34669673/1583806297795bg2.png);
        background-size: 100%;
        background-position-y: 361px;
        height: 200px;
        margin-bottom: 20px;
    `,
    UserIcon: s.img`
        width: 100px;
        height: 100px;
        position: absolute;
        bottom: -41px;
        left: 30px;
        border-radius: 100px;
    `,
    UserName: s.div`
        position: absolute;
        color: #fff;
        font-size: 21px;
        bottom: 22px;
        left: 140px;
    `,
    UserEmail: s.div`
        position: absolute;
        color: #c3c3c3;
        font-size: 14px;
        bottom: 4px;
        left: 140px;
    `,
    FucBtn: s.div`
        position: absolute;
        color: #c3c3c3;
        font-size: 14px;
        bottom: 11px;
        right: 21px;
        border: 1px solid #ccc;
        padding: 3px 10px;
        cursor: pointer;
        transition: all 0.2s;
        :hover{
            background: #ffffff3d;
            color: #fff;
        }
    `,
    TagBtnBox: s.div`
        overflow: hidden;
        width: 300px;
        margin: 0 auto;
    `,
    TagBtn: s.div`
        float: left;
        width: 100px;
        text-align: center;
        padding-bottom: 5px;
        border-bottom: 2px solid #fff;
        transition: all 0.2s;
        color: #aaa;
        cursor: pointer;
        :hover{
            color: #333;
        }
        &.active{
            color: #333;
            border-bottom: 2px solid #000;
        }
    `
}

const T: React.FC<any> = (props: any) => {
    const [userinfo, setUserinfo] = useState<any>({})
    const [list, setList] = useState<any>('')
    const [following, setFollowing] = useState([])
    const [followers, setFollowers] = useState([])
    const [isLogin, setIsLogin] = useState(false)
    const [isMe, setIsMe] = useState(false)
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const { uid, type = 0 } = props
        let p
        if (type * 1 === 1) {
            setIsMe(true)
            p = {}
        } else {
            p = { uid }
        }

        GET_ARTICLES_BY_USER(p).then((rs: any) => {
            setList(rs)
        })
        GET_USERINFO_BY_ID(p).then((rs: any) => {
            setUserinfo(rs)
        })
        GET_FOLLOWING(p).then((rs: any) => {
            setFollowing(rs)
        })
        GET_FOLLOWERS(p).then((rs: any) => {
            setFollowers(rs)
        })

        try {
            //@ts-ignore
            const data = jwt(Cookies.get('twa'))
            if (data.icon) {
                setIsLogin(true)
            }
        } catch (error) {

        }
    }, [props])

    return (
        <S.Content>
            {
                Object.keys(userinfo || {}).length > 0 && <S.UserInfoContent>
                    <S.UserIcon src={userinfo.avatar_url} alt="" />
                    <S.UserName>{userinfo.name || 'NOTHING'}</S.UserName>
                    <S.UserEmail>{userinfo.email || 'NOTHING'}</S.UserEmail>
                    {
                        (!isMe && isLogin) && <S.FucBtn
                            onClick={() => {
                                SET_FOLLOW({ target_uid: userinfo.uid, type: userinfo.follow_status ? 'UNFOLLOW' : 'FOLLOW' }).then(() => {
                                    GET_USERINFO_BY_ID({ uid: props.uid }).then((rs: any) => {
                                        setUserinfo(rs)
                                    })
                                    GET_FOLLOWERS({ uid: props.uid }).then((rs: any) => {
                                        setFollowers(rs)
                                    })
                                })
                            }}
                        >{userinfo.follow_status ? 'UNFOLLOW' : 'FOLLOW'}</S.FucBtn>
                    }
                </S.UserInfoContent>
            }
            <S.TagBtnBox>
                <S.TagBtn onClick={() => { setIndex(0) }} className={index === 0 && 'active'}>Releases</S.TagBtn>
                <S.TagBtn onClick={() => { setIndex(1) }} className={index === 1 && 'active'}>Following</S.TagBtn>
                <S.TagBtn onClick={() => { setIndex(2) }} className={index === 2 && 'active'}>Followers</S.TagBtn>
            </S.TagBtnBox>
            {
                index === 0 && (
                    !list ? <Loading /> : (list.length <= 0 ? <Loading text='- No Release -' /> : <div>{list.map((item: any, index: any) => {
                        return <ArticleItem key={index} {...item} hidePersonInfo />
                    })}
                    </div>
                    )
                )
            }
            {
                index === 1 && (
                    !following ? <Loading /> : (following.length <= 0 ? <Loading text='- No Following -' /> : <div>{following.map((item: any, index: any) => {
                        return <UserItem key={index} {...item} type={0} isMe={isMe}/>
                    })}
                    </div>
                    )
                )
            }
            {
                index === 2 && (
                    !followers ? <Loading /> : (followers.length <= 0 ? <Loading text='- No Followers -' /> : <div>{followers.map((item: any, index: any) => {
                        return <UserItem key={index} {...item} type={1} isMe={isMe}/>
                    })}
                    </div>
                    )
                )
            }
        </S.Content>
    )
}

export default T