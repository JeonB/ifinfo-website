import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'

function Editor({ onChange, ...rest }: { onChange: any; rest: any }) {
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        onChange={(event: any, editor: any) => {
          // event.preventDefault()
          const editorData = editor.getData()

          if (onChange) {
            onChange(editorData)
          }
        }}
        {...rest}
      />
    </div>
  )
}

export default Editor
