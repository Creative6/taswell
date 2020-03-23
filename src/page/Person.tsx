import React from 'react'
import PersonRelease from '../widget/PersonRelease'

const T: React.FC = (props: any) => {
    const { match } = props
    const { params } = match
    const { uid } = params

    return (
        <>
            <PersonRelease uid={uid} />
        </>
    )
}

export default T