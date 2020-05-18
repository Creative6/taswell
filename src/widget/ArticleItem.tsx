import React, { useState, useEffect } from "react"
import s from "styled-components"
import Dot from "./Dot"
import Publish from "./Publish"
import jwt from "jwt-decode"
import Cookies from "js-cookie"
import { SET_ARTICLE_DELETE } from "../api"

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
        background: #f5f5f5;
        padding: 5px;
        border-radius: 5px;
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
    `,
  ImgContent: s.div({
    width: 200,
    height: 200,
    background: "#000",
    marginRight: 5,
    marginBottom: 5,
    overflow: "hidden",
    position: "relative",
    cursor: "pointer",
    transition: "all 0.2s",
    ":hover": {
      boxShadow: "4px 4px 10px #aaa",
      transform: "translate(-4px,-4px)",
    },
  }),
  FucBtn: s.div({
    padding: 5,
    transition: "all 0.2s",
    float: "right",
    marginLeft: 10,
    background: "#eee",
    cursor: "pointer",
    ":hover": {
      background: "#ccc",
    },
  }),
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
    tag = "",
    uid,
    hidePersonInfo = false,
  } = props

  const [showEditor, _showEditor] = useState<any>(false)
  const [userInfo, setUserInfo] = useState<any>({})

  useEffect(() => {
    try {
      // @ts-ignore
      const data = jwt(Cookies.get("twa"))
      setUserInfo(data)
    } catch (e) {}
  }, [])

  return (
    <S.Content>
      {simple && showEditor && (
        <Publish closeFuc={_showEditor} {...props} update />
      )}
      {!hidePersonInfo && (
        <S.Imgbox>
          <S.Img
            src={avatar_url}
            onError={(e: any) => {
              e.target.onerror = null
              e.target.src = "http://rs.creative6.cn/icon/badimg.png"
            }}
            onClick={() => {
              window.open(`#/users/${name}`)
            }}
          />
        </S.Imgbox>
      )}
      <S.Box>
        <S.Title
          onClick={() => {
            window.open(`#/article/${id}`)
          }}
        >
          {title || "UNKONW"}
        </S.Title>
        {simple && (
          <>
            {(userInfo.uid === "57855C971FF740B46EAE8F7FEBEC5D35" ||
              uid === userInfo.uid) && (
              <S.FucBtn
                onClick={() => {
                  _showEditor(true)
                }}
              >
                <i className={"iconfont icon-edit"}></i>
              </S.FucBtn>
            )}
            {userInfo.uid === "57855C971FF740B46EAE8F7FEBEC5D35" && (
              <S.FucBtn
                onClick={() => {
                  SET_ARTICLE_DELETE({ id }).then(() => {
                    window.location.reload()
                  })
                }}
              >
                <i className={"iconfont  icon-delete"}></i>
              </S.FucBtn>
            )}
          </>
        )}
        <S.Information>
          {!hidePersonInfo ? (
            <div>
              {name}
              <Dot />
              {create_time}
            </div>
          ) : (
            <div>{create_time}</div>
          )}
          {comment_num > 0 && (
            <div>
              <S.CommentNum>{comment_num}</S.CommentNum>comment
              {comment_num > 1 && "s"}
            </div>
          )}
        </S.Information>
        {!simple && (preview_content || "").replace(/\s+/g, "") && (
          <S.PreviewContent
            dangerouslySetInnerHTML={{ __html: preview_content }}
          />
        )}
        {!simple && preview_img && (
          <div style={{ marginTop: 5, display: "flex" }}>
            {preview_img.length > 0 &&
              preview_img.slice(0, 3).map((item: any, index: any) => (
                <S.ImgContent
                  key={index}
                  onClick={() => {
                    window.open(item.replace("?x-oss-process=style/small", ""))
                  }}
                >
                  <img
                    src={item}
                    onError={(e: any) => {
                      e.target.onerror = null
                      e.target.src = "http://rs.creative6.cn/icon/badimg.png"
                    }}
                    alt=""
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%,-50%)",
                      width: "100%",
                    }}
                  />
                  {preview_img.length > 3 && index === 2 && (
                    <S.NumTips>{preview_img.length}</S.NumTips>
                  )}
                </S.ImgContent>
              ))}
          </div>
        )}
        <div style={{ overflow: "hidden" }}>
          {tag &&
            tag.split("|").map((item: any, index: any) => (
              <S.Tag
                key={index}
                onClick={() => {
                  if (window.location.href.indexOf("searchresult") >= 0) {
                    window.location.replace(`#/searchresult/${item}`)
                  } else {
                    window.open(`#/searchresult/${item}`)
                  }
                }}
              >
                <i className={"iconfont icon-tag"} />
                {item}
              </S.Tag>
            ))}
        </div>
      </S.Box>
    </S.Content>
  )
}

export default T
