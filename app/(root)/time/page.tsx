'use client'
import React from 'react'

const time = () => {
    const D = new Date()
  let diff = D.getTimezoneOffset()
  console.log(D)
  console.log(diff)
  return (
    <div>{diff}</div>
  )
}

export default time