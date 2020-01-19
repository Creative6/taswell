import * as React from 'react'
import s from 'styled-components'
import ArticleList from '../widget/ArticleList'
import PersonActiveRankings from '../widget/PersonActiveRankings'
import NewsPopularity from '../widget/NewsPopularity'
import Publish from '../widget/Publish'
import My from '../widget/My'

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
    StickyBoxChild: s.div`
      margin-top: 20px;
      background: #fff;
    `,
    MyBox: s.div`
      background: #fff;
      width: 100%;
    `
}

const T: React.FC = () => {
    return (
        <>
            <S.BodyLeft>
                <Publish/>
                <ArticleList/>
            </S.BodyLeft>
            <S.BodyRight>
                <S.MyBox>
                    <My/>
                </S.MyBox>
                <S.StickyBox>
                    <S.StickyBoxChild>
                        <NewsPopularity/>
                    </S.StickyBoxChild>
                    <S.StickyBoxChild>
                        <PersonActiveRankings/>
                    </S.StickyBoxChild>
                </S.StickyBox>
            </S.BodyRight>
        </>
    )
}

export default T