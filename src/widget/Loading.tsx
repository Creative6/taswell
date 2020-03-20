import * as React from 'react'

const T: React.FC<any> = (props) => {
    const {
        text = 'Loading...'
    } = props

    return <div
        style={{
            fontSize: 15,
            textAlign: 'center',
            width: '100%',
            padding: 10
        }}>
        {
            text === 'Loading...' && <img
                src={require('../loading.svg')}
                alt=""
                style={{
                    width: 20,
                    position: 'absolute',
                    marginLeft: -22,
                    marginTop: -1
                }}
            />
        }
        {text}
    </div>
}

export default T