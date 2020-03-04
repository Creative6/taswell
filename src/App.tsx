import React from "react";
import s from "styled-components";
import Header from './widget/Header'
import Home from './page/Home'
import NotFound from './page/NotFound'
import ArticleInfo from './page/ArticleInfo'
import Message from './page/Message'
import SearchResult from './page/SearchResult'
import NoPermission from './page/NoPermission'

import {
    HashRouter as Router,
    Route,
    Switch,
} from "react-router-dom"

const S: any = {
    Container: s.div`
    display: flex;
    background: #e8eeef;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    flex-direction: column;
  `,
    Body: s.div`
    flex: 1;
    overflow: auto;
  `,
    BodyContent: s.div`
    width: 1000px;
    margin: 20px auto;
    display: flex;
  `
}

const T: React.FC = () => {
    return (
        <S.Container>
            <Header />
            <S.Body>
                <S.BodyContent>
                    <Router>
                        <Switch>
                            <Route exact path="/" component={() => <Home />} />
                            <Route path="/article/:id" component={ArticleInfo} />
                            <Route path="/message" component={Message} />
                            <Route path="/searchresult/:keyword" component={SearchResult} />
                            <Route path="/nopermission" component={NoPermission} />
                            <Route component={NotFound} />
                        </Switch>
                    </Router>
                </S.BodyContent>
                <div style={{ textAlign: 'center', fontSize: 12, padding: 10 }}>
                    -- Powered by Flower ©2020 --
                    <br />
                    <a href="http://www.miitbeian.gov.cn/">苏ICP备19039887号</a>
                </div>
            </S.Body>
        </S.Container>
    );
};

export default T;