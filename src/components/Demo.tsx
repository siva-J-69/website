import { useRef, useState } from 'react'

const demos = [
  {
    src: '/assets/siva/video-1.mp4',
    poster: '/assets/siva/demo-open.jpg',
    title: 'Opening a jewellery box',
    caption:
      'A red velvet box opens onto a cream insert, then the film moves to a second box with a navy interior.',
  },
  {
    src: '/assets/siva/video-2.mp4',
    poster: '/assets/siva/demo-finish.jpg',
    title: 'Finished jewellery box exteriors',
    caption:
      'Close views of velvet boxes, quilted panels, and metal plates. Lettering in the film is a sample, not a confirmed print.',
  },
] as const

export function Demo() {
  return (
    <section className="section section-beige" id="demo" aria-labelledby="demo-title">
      <div className="watermark" aria-hidden="true">
        Demo
      </div>
      <div className="wrap">
        <header className="section-heading">
          <p className="eyebrow">Product demonstration</p>
          <h2 id="demo-title">Jewellery boxes, opened and finished.</h2>
          <p className="lede">
            Two short films show how these jewellery boxes open and how the finished exteriors
            look. They demonstrate packaging styles. Finish, fit, and any printed logo are
            confirmed with the business before an order.
          </p>
        </header>
        <div className="demo-grid">
          {demos.map((demo) => (
            <DemoFilm key={demo.src} {...demo} />
          ))}
        </div>
      </div>
    </section>
  )
}

function DemoFilm({
  src,
  poster,
  title,
  caption,
}: (typeof demos)[number]) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const play = () => {
    const video = videoRef.current
    if (!video) return
    setPlaying(true)
    void video.play()
  }

  return (
    <figure className="demo-card">
      <div className="demo-stage">
        <video
          ref={videoRef}
          poster={poster}
          preload="none"
          playsInline
          controls={playing}
          width={1080}
          height={1920}
          onPlay={() => setPlaying(true)}
          onEnded={() => {
            const video = videoRef.current
            if (video) video.currentTime = 0
            setPlaying(false)
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
        {playing ? null : (
          <button className="demo-play" type="button" onClick={play}>
            <span className="demo-play-mark" aria-hidden="true" />
            <span className="sr-only">Play {title}</span>
          </button>
        )}
      </div>
      <figcaption>
        <p className="demo-kicker">{title}</p>
        <p>{caption}</p>
      </figcaption>
    </figure>
  )
}
