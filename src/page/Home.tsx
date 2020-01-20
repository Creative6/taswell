import React, {useState, useEffect} from 'react'
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
      margin-top: 15px;
      background: #fff;
    `,
    MyBox: s.div`
      background: #fff;
      width: 100%;
    `
}

const T: React.FC = () => {
    const [showPublish, _showPublish] = useState<any>(false)

    useEffect(() => {
        // @ts-ignore
        alert.showPublish = () => {
            _showPublish(true)
        }

        // @ts-ignore
        alert.hidePublish = () => {
            _showPublish(false)
        }
    }, [])

    return (
        <>
            <S.BodyLeft>
                {showPublish && <Publish/>}
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