import * as React from 'react'
import s, {keyframes} from 'styled-components'

const rotate = keyframes`
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
`;

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
        animation: ${rotate} 1s linear infinite;
    `,
    BoxText: s.div`
        margin-top: 6px;
    `
}


const T: React.FC = () => {
    return <S.Content>
        <S.Img src={'http://qzapp.qlogo.cn/qzapp/101503025/6933C7C5DAA700AA2037B297514E9DB4/100'}/>
        <S.Box>
            <i className={'iconfont icon-publish'}/>
            <S.BoxText>Publish</S.BoxText>
        </S.Box>
        <S.Box>
            <i className={'iconfont icon-huifu'}/>
            <S.BoxText>Message</S.BoxText>
            <S.Tips/>
        </S.Box>
        <S.Box>
            <i className={'iconfont icon-go__icon_like-'}/>
            <S.BoxText>Like</S.BoxText>
        </S.Box>
        <S.Box>
            <i className={'iconfont icon-exit1'}/>
            <S.BoxText>Exit</S.BoxText>
        </S.Box>
    </S.Content>
}

export default T