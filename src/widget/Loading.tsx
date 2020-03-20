import * as React from 'react'

const T: React.FC = () => {
    return <div
        style={{
            fontSize: 20,
            textAlign: 'center',
            width: '100%',
            paddingBottom: 10
        }}>
        <img
            src={require('../loading.svg')}
            alt=""
            style={{
                width: 30,
                position: 'relative',
                top: 8,
                right: 8
            }}
        />
        Loading...
        </div>
}

export default T