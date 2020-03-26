import React, { useEffect, useState } from 'react'
import s from 'styled-components'
import {
    GET_ARTICLES_BY_USER,
    GET_USERINFO_BY_NAME,
    GET_FOLLOWING,
    GET_FOLLOWERS,
    SET_FOLLOW,
    GET_MY_FOLLOWS
} from '../api'
import ArticleItem from '../widget/ArticleItem'
import Loading from '../widget/Loading'
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
        font-size: 14px;
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

const searchArr = ['', '?following', '?followers']

const T: React.FC<any> = (props: any) => {

    const { match, history } = props
    const { location } = history
    const { search } = location
    const { params } = match
    const { name } = params

    const [index, setIndex] = useState(searchArr.indexOf(search))
    const [userinfo, setUserinfo] = useState<any>({})
    const [loginData, setLoginData] = useState<any>({})
    const [isLogin, setIsLogin] = useState(false)
    const [list, setList] = useState<any>('')
    const [following, setFollowing] = useState([])
    const [followers, setFollowers] = useState([])
    const [isMe, setIsMe] = useState(false)
    const [myFollowing, setMyFollowing] = useState<any>([])
    const [myFollowers, setMyFollowers] = useState<any>([])

    useEffect(() => {
        try {
            //@ts-ignore
            const res = jwt(Cookies.get('twa'))
            console.log(res)
            const { uid = '', name: jname = '' } = res
            if (uid) {
                setLoginData(res)
                setIsLogin(true)
                GET_MY_FOLLOWS().then((rs: any) => {
                    const { following, followers } = rs
                    const _following: any = []
                    const _followers: any = []
                    following.forEach((item: any) => _following.push(item.target_uid))
                    followers.forEach((item: any) => _followers.push(item.uid))
                    setMyFollowing(_following)
                    setMyFollowers(_followers)
                })
            }
            if (jname === name) {
                setIsMe(true)
            } else {
                setIsMe(false)
            }
        } catch (error) {
            console.log('GET LOGIN DATA FAIL')
        }

        GET_USERINFO_BY_NAME({ name }).then(rs => {
            setUserinfo(rs)
        })
        GET_ARTICLES_BY_USER({ name }).then((rs: any) => {
            setList(rs)
        })
        GET_FOLLOWING({ name }).then((rs: any) => {
            setFollowing(rs)
        })
        GET_FOLLOWERS({ name }).then((rs: any) => {
            setFollowers(rs)
        })
    }, [name])

    const changeIndex = (i: any) => {
        if (i === index) return
        setIndex(i)
        window.location.href = `#/users/${name}${searchArr[i]}`
    }

    const getMyFollows = () => {
        GET_MY_FOLLOWS().then((rs: any) => {
            const { following, followers } = rs
            const _following: any = []
            const _followers: any = []
            following.forEach((item: any) => _following.push(item.target_uid))
            followers.forEach((item: any) => _followers.push(item.uid))
            setMyFollowing(_following)
            setMyFollowers(_followers)
        })
    }

    const setFollow = (uid: any, type: any) => {
        SET_FOLLOW({ target_uid: uid, type: type }).then(() => {
            getMyFollows()
        })
    }

    return (
        <S.Content>
            {
                Object.keys(userinfo || {}).length > 0 && <S.UserInfoContent>
                    <S.UserIcon src={userinfo.avatar_url} alt="" />
                    <S.UserName>{userinfo.name || 'NOTHING'}</S.UserName>
                    <S.UserEmail>{userinfo.email || 'NOEmail'},Following - {following.length},Followers - {followers.length}</S.UserEmail>
                    {isLogin && !isMe && <S.FucBtn
                        onClick={() => {
                            SET_FOLLOW({ target_uid: userinfo.uid, type: myFollowing.indexOf(userinfo.uid) >= 0 ? 'UNFOLLOW' : 'FOLLOW' }).then(() => {
                                getMyFollows()
                                GET_FOLLOWERS({ name }).then((rs: any) => {
                                    setFollowers(rs)
                                })
                            })
                        }}
                    >{myFollowing.indexOf(userinfo.uid) >= 0 ? 'UNFOLLOW' : 'FOLLOW'}</S.FucBtn>}
                    {!isLogin && <S.FucBtn
                        onClick={() => {
                            const link = window.location.hash.replace('#', '$-$-$-$-$')
                            const redirect_url = encodeURI("http://api.taswell.cn/qqlogin?link=" + link);
                            const href_url =
                                "https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101503025&redirect_uri=" +
                                redirect_url + "&state=0";
                            window.location.href = href_url
                        }}
                    >FOLLOW</S.FucBtn>}
                </S.UserInfoContent>
            }
            <S.TagBtnBox>
                <S.TagBtn onClick={() => { changeIndex(0) }} className={index === 0 && 'active'}>Releases</S.TagBtn>
                <S.TagBtn onClick={() => { changeIndex(1) }} className={index === 1 && 'active'}>Following</S.TagBtn>
                <S.TagBtn onClick={() => { changeIndex(2) }} className={index === 2 && 'active'}>Followers</S.TagBtn>
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
                        return <UserItem
                            key={index}
                            {...item}
                            originUid={item.target_uid}
                            isMe={loginData.uid === item.target_uid}
                            isLogin={isLogin}
                            isMyFollowing={myFollowing.indexOf(item.target_uid) >= 0}
                            isMyFollowers={myFollowers.indexOf(item.target_uid) >= 0}
                            setFollow={setFollow}
                        />
                    })}
                    </div>
                    )
                )
            }
            {
                index === 2 && (
                    !followers ? <Loading /> : (followers.length <= 0 ? <Loading text='- No Followers -' /> : <div>{followers.map((item: any, index: any) => {
                        return <UserItem
                            key={index}
                            {...item}
                            originUid={item.uid}
                            isMe={loginData.uid === item.uid}
                            isLogin={isLogin}
                            isMyFollowing={myFollowing.indexOf(item.uid) >= 0}
                            isMyFollowers={myFollowers.indexOf(item.uid) >= 0}
                            setFollow={setFollow}
                        />
                    })}
                    </div>
                    )
                )
            }
        </S.Content>
    )
}

export default T