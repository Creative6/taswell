import React, { useState, useEffect } from 'react'
import s from 'styled-components'
import { GET_ARTICLE_INFO } from '../api'
import ArticleItem from '../widget/ArticleItem'
import CommentBox from '../widget/CommentBox'

const S: any = {
  BodyLeft: s.div`
      width: 700px;
      background: #fff;
      overflow: hidden;
    `,
  BodyRight: s.div`
      position: relative;
      padding-left: 10px;
      flex: 1;
      padding-left: 20px;
    `,
  StickyBox: s.div`
      width: 100%;
      position: sticky; 
      top: 20px;
    `,
  Content: s.div`
      background: #fff;
      width: 100%;
      font-size: 13px;
  `,
  ContentBox: s.div`
      padding: 20px;
      padding-top: 0px;
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
  `
}

const T: React.FC = (props: any) => {
  const [info, setInfo] = useState<any>({})

  useEffect(() => {
    const { match } = props
    const { params } = match
    const { id } = params
    GET_ARTICLE_INFO({ id }).then(rs => {
      setInfo(rs)
    })
  }, [props])

  return (
    <>
      <S.BodyLeft>
        <S.Content>
          <ArticleItem {...info} simple={true} />
          <S.ContentBox dangerouslySetInnerHTML={{ __html: info.content }} />
        </S.Content>
      </S.BodyLeft>
      <S.BodyRight>
        <S.StickyBox>
          <CommentBox {...info} />
        </S.StickyBox>
      </S.BodyRight>
    </>
  )
}

export default T