import React from 'react'
import marked from 'marked'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { base16AteliersulphurpoolLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

export const renderers = {
  // eslint-disable-next-line no-unused-vars
  code({ _, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter
        children={String(children).replace(/\n$/, '')}
        language={match[1]}
        style={base16AteliersulphurpoolLight}
        {...props}
      />
    ) : (
      <code className={className}
        {...props}
      ></code>
    )
  }

}

export const render = () => {
  const render = new marked.Renderer()
  console.log(render)
  return render
}
