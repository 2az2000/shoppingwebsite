import React from 'react'

interface IContainerProps{
    children : React.ReactNode
    className: string
}

export default function Container({children , className}: IContainerProps) {
  return (
    <div className={`container mx-auto px-40 ${className}`}>
        {children}
    </div>
  )
}
