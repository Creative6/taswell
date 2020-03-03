import * as React from "react";
import s from 'styled-components'
import Search from './Search'

const Header = s.div`
    height: 50px;
    display: flex;
    left: 0px;
    top: 0px;
    z-index: 999;
    width: 100%;
    background: #000;
`

const Content = s.div`
    width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 50px;
`

const Title = s.div`
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #00a67c, 0 0 35px #00a67c, 0 0 40px #00a67c; 
    color: #fff;
    font-size: 20px;
    cursor: pointer;
`

const SubTitle = s.span`
    font-size: 12px;
    margin-left: 10px;
`

const T: React.FC = () => {
    return (
        <Header>
            <Content>
                <Title
                    onClick={() => {
                        window.location.href = '/'
                    }}
                >
                    <i className='iconfont icon-leaf' style={{ marginRight: 10, fontSize: 20 }} />
                    Taswell
                    <SubTitle>Who threatens my concentration?</SubTitle>
                </Title>
                <Search />
            </Content>
        </Header>
    )
};

export default T;
