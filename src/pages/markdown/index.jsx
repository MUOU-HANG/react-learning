import React,{ useState } from 'react'

import Vditor from 'vditor'

import ReactMde from 'react-mde'

import * as Showdown from 'showdown'

import 'react-mde/lib/styles/css/react-mde-all.css'
import 'vditor/dist/index.css'

import '@toast-ui/editor/dist/toastui-editor.css'

import { Editor } from '@toast-ui/react-editor'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  smoothLivePreview:true
})

const Markdown = () => {
  const [ value, setValue ] = useState('**Hello world!!!**')
  const [ selectedTab, setSelectedTab ] = useState('write')
  const [ vd, setVd ] = useState('hello world')
  React.useEffect(() => {
    const vditor = new Vditor('editor', {
      toolbarConfig: {
        pin: true
      },
      height: 360,
      counter: {
        enable: true,
        max: 1024
      },
      after() {
        vditor.setValue(vd)
        setVd(vditor)
      }
    })
  }, [])

  const save = async function* () {
    // Promise that waits for "time" milliseconds
    const wait = function(time) {
      return new Promise((a) => {
        setTimeout(() => a(), time)
      })
    }

    // Upload "data" to your server
    // Use XMLHttpRequest.send to send a FormData object containing
    // "data"
    // Check this question: https://stackoverflow.com/questions/18055422/how-to-receive-php-image-data-over-copy-n-paste-javascript-with-xmlhttprequest

    await wait(2000)
    // yields the URL that should be inserted in the markdown
    yield 'https://picsum.photos/300'
    await wait(2000)

    // returns true meaning that the save was successful
    return true
  }
  return (
    <div>
      <h1>react-mde</h1>
      <div className="container">
        <ReactMde
          generateMarkdownPreview={markdown =>
            Promise.resolve(converter.makeHtml(markdown))
          }
          onChange={setValue}
          onTabChange={setSelectedTab}
          paste={{
            saveImage: save
          }}
          selectedTab={selectedTab}
          value={value}
        />
      </div>
      <h1>vditor</h1>
      <div id="editor" />
      <h1>TOAST UI Editor for React</h1>
      <Editor
        height="600px"
        initialEditType="markdown"
        initialValue="hello react editor world!"
        previewStyle="vertical"
        useCommandShortcut
      />
    </div>
  )
}

export default Markdown
