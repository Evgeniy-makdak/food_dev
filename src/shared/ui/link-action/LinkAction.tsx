import React from 'react'
import { Link } from 'react-router'

export default function LinkAction({ text, style, to }: { text: string, style?: React.CSSProperties, to: string }) {
  return (
    <Link style={
      {
        ...style,
        width: '100%',
        textAlign: 'center',
        margin: '0 auto',
        display: 'block',
        borderRadius: '16px',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: '500',
        lineHeight: '24px',
        cursor: 'pointer',
        textDecoration: 'none',

        // color: 'inherit',
      }
    } to={to}>{text}</Link>
  )
}
