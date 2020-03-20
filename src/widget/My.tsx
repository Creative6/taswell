import React, {useState, useEffect} from 'react'
import s, {keyframes} from 'styled-components'
import {GET_NOTICE_NUM} from '../api'
import {useHistory} from "react-router";
import jwt from 'jwt-decode'
import Cookies from 'js-cookie'

const A = {
    rotate: keyframes`
        0% {
            transform: rotate(45deg) scale(1);
        }
    
        10% {
            transform: rotate(45deg) scale(2);
        }
    
        20%{
            transform: rotate(45deg) scale(1);
        }
    
        30%{
            transform: rotate(45deg) scale(2);
        }
    
        40%{
            transform: rotate(45deg) scale(1);
        }
    
        100%{
            transform: rotate(45deg) scale(2);
            opacity: 0;
        }
    `
}
const S = {
    Content: s.div`
        display: flex;
    `,
    Img: s.img`
        width: 56px;
        height: 56px;
        cursor: pointer;
    `,
    Box: s.div`
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 13px;
        color: #555;
        cursor: pointer;
        transition: 0.2s;
        position: relative;
        :hover{
            background: #efece6;
        }
    `,
    Tips: s.div`
        position: absolute;
        width: 5px;
        height: 5px;
        right: 5px;
        top: 6px;
        z-index: 1;
        background: coral;
        transform: rotate(45deg);
        animation: ${A.rotate} 1s linear infinite;
    `,
    BoxText: s.div`
        margin-top: 6px;
    `,
    LoginBtn: s.div`
        font-size: 13px;
        padding: 10px 15px;
        cursor: pointer;
        transition: 0.2s;
        :hover{
            color: orange;
        }
        &>i{
            font-size: 13px;
            margin-right: 10px;
        }
    `
}


const T: React.FC = () => {
    const history = useHistory()

    const [noticeNum, setNoticeNum] = useState<any>(0)
    const [userInfo, setUserInfo] = useState<any>({})

    useEffect(() => {
        try {
            // @ts-ignore
            const data = jwt(Cookies.get('twa'))
            // console.log(data)
            setUserInfo(data)
            GET_NOTICE_NUM().then(rs => {
                // console.log('GET_NOTICE_NUM', rs)
                setNoticeNum(rs)
            })
        } catch (e) {

        }
    }, [])

    return <S.Content>
        {userInfo.icon ? <>
            <S.Img src={userInfo.icon}/>
            <S.Box
                onClick={() => {
                    // @ts-ignore
                    alert.showPublish()
                }}
            >
                <i className={'iconfont icon-publish'}/>
                <S.BoxText>Publish</S.BoxText>
            </S.Box>
            <S.Box
                onClick={() => {
                    history.push('/message')
                }}
            >
                <i className={'iconfont icon-huifu'}/>
                <S.BoxText>Message</S.BoxText>
                {noticeNum ? <S.Tips/> : null}
            </S.Box>
            {/* <S.Box>
                <i className={'iconfont icon-go__icon_like-'}/>
                <S.BoxText>Like</S.BoxText>
            </S.Box> */}
            <S.Box
                onClick={() => {
                    Cookies.remove('twa', {path: '/', domain: '.taswell.cn'})
                    window.location.reload()
                }}
            >
                <i className={'iconfont icon-exit1'}/>
                <S.BoxText>Exit</S.BoxText>
            </S.Box>
        </> : <S.LoginBtn
            onClick={() => {
                const redirect_url = encodeURI("http://api.taswell.cn/qqlogin");
                const href_url =
                    "https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101503025&redirect_uri=" +
                    redirect_url + "&state=0";
                window.location.replace(href_url)
            }}
        >
            <i className={'iconfont icon-QQ'}></i>
            LOGIN BY QQ</S.LoginBtn>
        }

    </S.Content>
}

export default T