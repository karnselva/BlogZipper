import JoditEditor from "jodit-react"


import React, { useRef, useState } from 'react'

export default function TextEditor( props) {
    const{setContent,content}=props
    const editor=useRef(null)



  return (
    <div>
        <JoditEditor
          ref={editor}
          value={content}
          onClick={()=>console.log("clicked")}
          onChange={(newContent) => {
            console.log("newcontent",newContent)
            setContent(newContent)}}
        />
    </div>
  )
}
