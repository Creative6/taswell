import * as React from 'react'
import s from 'styled-components'

const S = {
    Box: s.div`
    display: flex;
    width: 400px;
    margin: 10px auto;
    `,
    Img: s.img`
    width: 50px;
    height: 50px;
    border-radius: 50px;
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
        background: #ccc;
        font-size: 13px;
        padding: 0px 10px;
    `
}

const T: React.FC<any> = (props: any) => {
    const {
        // id,
        // uid,
        // target_uid,
        // create_time,
        name,
        avatar_url,
        // is_disabled,
        following,
        followers,
        type,
        follow_status
        // isMe
    } = props
    return <S.Box>
        <S.Img src={avatar_url} />
        <S.Content>
            <S.B1>
                <div>{name}</div>
                <div style={{ fontSize: 12, color: '#aaa' }}>- Following:{following} -Followers:{followers}</div>
            </S.B1>
            <S.B2>
                <S.Btn>{type === 0 ? 'UNFOLLOW' : (follow_status ? 'UNFOLLOW' : 'FOLLOW')}</S.Btn>
            </S.B2>
        </S.Content>
    </S.Box>
}

export default T