import React, { useEffect, useState } from "react"
import s from "styled-components"
import { GET_ARTICLE_POPULARITY } from "../api"
import NumberDot from "./NumberDot"

const S = {
  Item: s.div`
        height: 35px;
        display: flex;
        align-items: center;
        font-size: 13px;
        justify-content: space-between;
        padding: 0px 15px;
        transition: 0.2s;
        cursor: pointer;
        :hover{
            background: #eee;
        }
    `,
  Title: s.div`
        background: #fff;
        color: #000;
        height: 35px;
        line-height: 35px;
        text-indent: 15px;
        font-size: 14px;    
        >i{
            margin-right: 5px;
            font-size: 13px;
        }
    `,
  Num: s.span`
        font-weight: bold;
        color: mediumseagreen;
    `,
  TitleWarp: s.div`
        width: 140px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    `,
}

const T: React.FC = () => {
  const [data, setData] = useState<any>()
  useEffect(() => {
    GET_ARTICLE_POPULARITY().then((rs: any) => {
      setData(rs)
    })
  }, [])

  return (
    <>
      <S.Title>
        <i className={"iconfont icon-popular_fill"} />
        NewsPopularity -
      </S.Title>
      {data &&
        data.map((item: any, index: number) => {
          return (
            <S.Item
              key={index}
              onClick={() => {
                window.open(`#/article/${item.id}`)
              }}
            >
              <div style={{ display: "flex" }} title={item.title}>
                <NumberDot num={index + 1} />
                <S.TitleWarp>{item.title || "NO TITLE"}</S.TitleWarp>
              </div>
              <div>
                <S.Num>{item.count}</S.Num> comments
              </div>
            </S.Item>
          )
        })}
    </>
  )
}

export default T
