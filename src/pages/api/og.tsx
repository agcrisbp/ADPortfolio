import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'CharFolio';
    const description = searchParams.get('description') || 'Next-gen portfolio for elite developers.';
    
    const fontData = await fetch(
      new URL('https://fonts.googleapis.com/css2?family=Inter:wght@800').href
    ).then(async (res) => {
      const css = await res.text();
      const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);
      if (!resource) throw new Error('Font not found');
      return fetch(resource[1]).then((res) => res.arrayBuffer());
    });

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#000',
            position: 'relative',
            fontFamily: 'Inter',
            color: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '100px',
          }}
        >
          {/* --- BACKGROUND ACCENTS --- */}
          {/* Subtle Radial Gradient */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120%',
            height: '120%',
            background: 'radial-gradient(circle at center, #111 0%, #000 70%)',
            display: 'flex',
          }} />

          {/* Indigo Spotlight */}
          <div style={{
            position: 'absolute',
            top: -200,
            left: '20%',
            width: '1000px',
            height: '600px',
            background: 'rgba(79, 70, 229, 0.15)',
            filter: 'blur(150px)',
            borderRadius: '1000px',
            display: 'flex',
          }} />

          {/* --- THE FLOATING CARD --- */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '60px',
              padding: '80px',
              width: '100%',
              maxWidth: '1600px',
              position: 'relative',
              boxShadow: '0 50px 100px rgba(0,0,0,0.5)',
            }}
          >
            {/* Top Badge Overlay */}
            <div style={{
              position: 'absolute',
              top: -30,
              left: 80,
              padding: '12px 24px',
              backgroundColor: '#4F46E5',
              borderRadius: '12px',
              fontSize: '24px',
              fontWeight: 800,
              display: 'flex',
            }}>
              v3.0.1
            </div>

            {/* Content Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{
                display: 'flex',
                fontSize: title.length > 20 ? '140px' : '170px',
                fontWeight: 800,
                lineHeight: 1.2,
                letterSpacing: '-0.07em',
                background: 'linear-gradient(to bottom, #FFF 40%, #777 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}>
                {title}
              </div>

              <div style={{
                display: 'flex',
                fontSize: '52px',
                fontWeight: 400,
                color: '#888',
                lineHeight: 1.4,
                maxWidth: '1100px',
                letterSpacing: '-0.02em',
              }}>
                {description}
              </div>
            </div>

            {/* Footer Inside Card */}
            <div style={{
              display: 'flex',
              marginTop: '100px',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              paddingTop: '60px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <img src="https://www.charisprod.xyz/trademarks/charis.svg" width="64" height="64" />
                <span style={{ fontSize: '32px', fontWeight: 800, color: '#FFF' }}>Charis Production</span>
              </div>
            </div>
          </div>

          {/* Bottom Branding */}
          <div style={{
            position: 'absolute',
            bottom: 40,
            fontSize: '20px',
            color: '#222',
            fontWeight: 800,
            letterSpacing: '0.5em',
          }}>
            charisprod.xyz
          </div>
        </div>
      ),
      {
        width: 1920,
        height: 1080,
        fonts: [
          {
            name: 'Inter',
            data: fontData,
            style: 'normal',
            weight: 800,
          },
        ],
      }
    );
  } catch (e: any) {
    return new Response(`Error: ${e.message}`, { status: 500 });
  }
}
