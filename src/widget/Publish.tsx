import React, {useState} from 'react'
import s from 'styled-components'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import {UPLOAD} from '../api'

const S = {
    Content: s.div`
        font-size:13px;
    `
}

const T: React.FC = () => {
    const [editorState, setEditorState] = useState<any>(BraftEditor.createEditorState(null))

    const myUploadFn = (param: any) => {
        var fd = new FormData()
        fd.append('file', param.file)
        UPLOAD(fd).then(res => {
            param.success({url: res})
        }).catch(res => {
            console.log(res)
        })
    }

    return <S.Content>
        <BraftEditor
            media={{
                uploadFn: myUploadFn,
                // validateFn: myValidateFn
            }}
            value={editorState}
        />
    </S.Content>
}

export default T