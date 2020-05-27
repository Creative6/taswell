import React, { useState } from "react"
import s from "styled-components"
import BraftEditor from "braft-editor"
import "braft-editor/dist/index.css"
import {
  UPLOAD,
  SET_ARTICLE_SAVE,
  SET_ARTICLE_UPDATE,
  DOMAIN_STATIC,
} from "../api"

const S = {
  Content: s.div`
        padding: 15px;
        width: 950px;
        background: #fff;
        margin-top:70px;
        display: flex;
    `,
  Input: s.input`
        outline: none;
        border: none;
        background: #f4f4f4;
        height: 34px;
        width: 100%;
        font-size: 15px;
        color: #777;
        text-indent: 10px;
    `,
  Back: s.div`
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0px;
        top: 0px;
        z-index: 99999;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: start;
        justify-content: center;
    `,
  TagBox: s.div`
        flex:1;
    `,
  BtnBox: s.div`
        display: flex;
        justify-content: flex-end;
    `,
  Btn: s.div`
        height: 30px;
        background: ${(props: any) => (props.title ? "#000" : "#eee")};
        color: ${(props: any) => (props.title ? "#fff" : "unset")};
        line-height: 30px;
        padding: 0px 10px;
        margin-left: 10px;
        font-size: 13px;
        cursor: pointer;
	`,
  EditorBox: s.div`
    
    `,
  ContentLeft: s.div`
        width: 700px;
        padding-right: 10px;
        border-right: 1px dashed #ccc;
    `,
  ContentRight: s.div`
        flex: 1;
        padding-left: 10px;
        display: flex;
        flex-direction: column;
    `,
  Input2: s.input`
       outline: none;
        border: none;
        background: #f4f4f4;
        height: 34px;
        width: 170px;
        font-size: 15px;
        color: #777;
        text-indent: 10px;
    `,
  AddBtn: s.div`
        height: 34px;
        width: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #ccc;
        position: absolute;
        right: 0px;
        top: 0px;
    `,
  List: s.div`
        position: relative;
        float: left;
        background: #eaeaea;
        color: #1b1b1b;
        font-size: 13px;
        margin: 5px;
        padding: 5px;
        &>i{
            margin-left: 5px;
            font-size: 12px;
            cursor: pointer;
        }
    `,
  Tips: s.div`
        text-align: center;
        font-size: 12px;
        color: #bbb;
        overflow: hidden;
        width: 100%;
    `,
}

const T: React.FC<any> = (props: any) => {
  const [editorState, _editorState] = useState<any>(
    BraftEditor.createEditorState(props.content || null)
  )
  const [title, _title] = useState<any>(props.title || "")
  const [tag, _tag] = useState<any>(props.tag ? props.tag.split("|") : [])
  const [tagText, _tagText] = useState<any>("")

  const myUploadFn = (param: any) => {
    var fd = new FormData()
    fd.append("file", param.file)
    UPLOAD(fd).then((res) => {
      param.success({ url: res })
    })
  }

  return (
    <S.Back>
      <S.Content>
        <S.ContentLeft>
          <S.Input
            placeholder={"Title"}
            onChange={(e: any) => {
              _title(e.target.value)
            }}
            value={title}
          />
          <S.EditorBox>
            <BraftEditor
              className={"bigeditor"}
              media={{
                uploadFn: myUploadFn,
                // validateFn: myValidateFn
              }}
              value={editorState}
              onChange={(e: any) => {
                _editorState(e)
              }}
            />
          </S.EditorBox>
        </S.ContentLeft>
        <S.ContentRight>
          <S.TagBox>
            <div style={{ position: "relative" }}>
              <S.Input2
                type="text"
                placeholder={"Tag"}
                onChange={(e: any) => {
                  _tagText(e.target.value)
                }}
                value={tagText}
              />
              <S.AddBtn
                onClick={() => {
                  if (
                    !tagText ||
                    tag.length === 10 ||
                    tag.indexOf(tagText) >= 0
                  )
                    return
                  const tag_temp = JSON.parse(JSON.stringify(tag))
                  tag_temp.push(tagText)
                  _tag(tag_temp)
                  _tagText("")
                }}
              >
                <i className={"iconfont icon-moreunfold"}></i>
              </S.AddBtn>
            </div>
            <div style={{ paddingTop: 10 }}>
              {tag.map((item: any, index: any) => {
                return (
                  <S.List key={index}>
                    <span
                      style={{
                        color: "#999",
                        fontWeight: "bold",
                        marginRight: 3,
                      }}
                    >
                      #
                    </span>
                    {item}
                    <i
                      className={"iconfont icon-close"}
                      onClick={() => {
                        const tag_temp = JSON.parse(JSON.stringify(tag))
                        tag_temp.splice(index, 1)
                        _tag(tag_temp)
                      }}
                    ></i>
                  </S.List>
                )
              })}
            </div>
            <S.Tips>- Add up to 10 tags -</S.Tips>
          </S.TagBox>
          <S.BtnBox>
            <S.Btn
              onClick={() => {
                _editorState(BraftEditor.createEditorState(null))
                _title("")
                _tag([])
                _tagText("")
                // @ts-ignore
                // alert.hidePublish()
                props.closeFuc && props.closeFuc(false)
              }}
            >
              CANCEL
            </S.Btn>
            <S.Btn
              title={"confirm"}
              onClick={() => {
                let preview_img = []
                try {
                  const arr = JSON.parse(editorState.toRAW())
                  const { entityMap } = arr
                  for (let key in entityMap) {
                    let url = entityMap[key].data.url
                    if (url && url.indexOf(DOMAIN_STATIC) >= 0) {
                      preview_img.push(url + "?x-oss-process=style/small")
                    }
                  }
                } catch (e) {}
                console.log(props.update)
                if (props.update) {
                  SET_ARTICLE_UPDATE({
                    title,
                    content: editorState.toHTML(),
                    preview_img: JSON.stringify(preview_img),
                    preview_content: editorState.toText().substr(0, 200),
                    tag: tag.join("|"),
                    id: props.id,
                  }).then((rs) => {
                    window.location.reload()
                  })
                } else {
                  SET_ARTICLE_SAVE({
                    title,
                    content: editorState.toHTML(),
                    preview_img: JSON.stringify(preview_img),
                    preview_content: editorState.toText().substr(0, 200),
                    tag: tag.join("|"),
                  }).then((rs) => {
                    window.location.reload()
                  })
                }
              }}
            >
              CONFIRM
            </S.Btn>
          </S.BtnBox>
        </S.ContentRight>
      </S.Content>
    </S.Back>
  )
}

export default T
