import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '96px',
        }}
      >
        <p
          style={{
            color: '#52525b',
            fontSize: 13,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            margin: '0 0 40px 0',
            fontWeight: 300,
          }}
        >
          Portfolio Co. · Est. 2025
        </p>
        <h1
          style={{
            color: '#fafafa',
            fontSize: 96,
            fontWeight: 200,
            margin: '0 0 28px 0',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          dprplx
        </h1>
        <p
          style={{
            color: '#71717a',
            fontSize: 28,
            fontWeight: 300,
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          Software distilled to its essence.
        </p>
      </div>
    ),
    { ...size }
  )
}
