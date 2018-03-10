import React from 'react'
import { rehydrate, css } from 'glamor'
import glamorous from 'glamorous'

// Adds server generated styles to glamor cache.
// Has to run before any `style()` calls
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined' && window.__NEXT_DATA__ !== undefined) {
  rehydrate(window.__NEXT_DATA__.ids)
}

// Add global styles
css.global('*', {
  boxSizing: 'border-box',
  fontFamily: "'Raleway', sans-serif"
})

css.global('html', {
  textSizeAdjust: '100%'
})

css.global('body', {
  margin: 0,
  font: '16px/1 sans-serif',
  MozOsxFontSmoothing: 'grayscale',
  WebkitFontSmoothing: 'antialiased'
})

css.global('h1, h2, h3, h4, p, blockquote, figure, ol, ul', {
  margin: 0,
  padding: 0
})

css.global('main, li', {
  display: 'block'
})

css.global('h1, h2, h3, h4', {
  fontSize: 'inherit'
})

css.global('strong', {
  fontWeight: 'bold'
})

css.global('a, button', {
  color: 'inherit',
  transition: '.3s'
})

css.global('a', {
  textDecoration: 'none'
})

css.global('button', {
  overflow: 'visible',
  border: 0,
  font: 'inherit',
  WebkitFontSmoothing: 'inherit',
  letterSpacing: 'inherit',
  background: 'none',
  cursor: 'pointer'
})

css.global('::-moz-focus-inner', {
  padding: 0,
  border: 0
})

css.global(':focus', {
  outline: 0
})

css.global('img', {
  maxWidth: '100%',
  height: 'auto',
  border: 0
})

export default ({ children }) => (
  <div>
    <glamorous.Div>{children}</glamorous.Div>
  </div>
)
