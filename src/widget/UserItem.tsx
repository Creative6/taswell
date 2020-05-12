import * as React from "react"
import s from "styled-components"

const S = {
  Box: s.div`
display: flex;
width: 400px;
margin: 10px auto;
position: relative;
`,
  Img: s.img`
width: 50px;
height: 50px;
border-radius: 50px;
cursor: pointer;
`,
  Content: s.div`
display: flex;
flex: 1;
justify-content: space-between;
padding: 0px 15px;
`,
  B1: s.div`
display: flex;
flex-direction: column;
justify-content: center;
`,
  B2: s.div`
align-items: center;
display: flex;
`,
  Btn: s.div`
height: 30px;
line-height: 30px;
background: #eee;
font-size: 13px;
padding: 0px 10px;
cursor: pointer;
transition: all 0.2s;
:hover{
background: #ccc;
color: #fff;
}
`,
  EachIcon: s.i`
margin-right:3px;
`,
  Name: s.div`
cursor: pointer;
:hover{
text-decoration: underline;
}
`,
}

const T: React.FC<any> = (props: any) => {
  const {
    // id,
    // uid,
    // target_uid,
    // create_time,
    name,
    avatar_url,
    following,
    followers,
    isMe,
    isLogin,
    isMyFollowing,
    isMyFollowers,
    setFollow,
    originUid,
  } = props

  let BtnText = "FOLLOW"
  let followEachOther = false
  if (isMyFollowing) {
    BtnText = "UNFOLLOW"
  }
  if (isMyFollowing && isMyFollowers) {
    BtnText = "UNFOLLOW"
    followEachOther = true
  }

  return (
    <S.Box>
      <S.Img
        src={avatar_url}
        onClick={() => {
          window.open(`#/users/${name}`)
        }}
      />
      <S.Content>
        <S.B1>
          <S.Name
            onClick={() => {
              window.open(`#/users/${name}`)
            }}
          >
            {name}
          </S.Name>
          <div style={{ fontSize: 12, color: "#aaa" }}>
            Following - {following},Followers - {followers}
          </div>
        </S.B1>
        <S.B2>
          {!isMe && isLogin && (
            <S.Btn
              onClick={() => {
                setFollow(originUid, BtnText)
              }}
            >
              {followEachOther && (
                <S.EachIcon
                  className={"iconfont icon-iconfonthuxiangguanzhu"}
                />
              )}
              {BtnText}
            </S.Btn>
          )}
          {!isLogin && (
            <S.Btn
              onClick={() => {
                const link = window.location.hash.replace("#", "$-$-$-$-$")
                const redirect_url = encodeURI(
                  "http://api.taswell.cn/qqlogin?link=" + link
                )
                const href_url =
                  "https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101503025&redirect_uri=" +
                  redirect_url +
                  "&state=0"
                window.location.href = href_url
              }}
            >
              FOLLOW
            </S.Btn>
          )}
        </S.B2>
      </S.Content>
    </S.Box>
  )
}

export default T
