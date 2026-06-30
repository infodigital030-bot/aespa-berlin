'use client'
import { useState, useEffect, useRef } from 'react'

const SAGE = '#8a8f6a'
const SAGE_LIGHT = '#b5b98f'
const CREAM = '#f7f5f0'
const WARM = '#ede9e0'
const DARK = '#2a2820'
const MID = '#5a5748'

const packages = [
  {
    name: '4 Stunden',
    persons: '2 Personen',
    price: '200 €',
    highlight: false,
    tag: null,
    desc: 'Perfekt für einen entspannten Nachmittag oder Abend. Whirlpool, Sauna & Outdoor Pool exklusiv für euch.',
    includes: ['Whirlpool', 'Sauna', 'Outdoor Pool', 'Sitzbereich & Kamin', '2 Personen'],
  },
  {
    name: '8 Stunden',
    persons: '2 Personen',
    price: '250 €',
    highlight: false,
    tag: null,
    desc: 'Ein ganzer Tag Entspannung — ohne Stress, ohne Zeitdruck.',
    includes: ['Whirlpool', 'Sauna', 'Outdoor Pool', 'Sitzbereich & Kamin', '2 Personen'],
  },
  {
    name: '12 Stunden',
    persons: '2 Personen',
    price: '300 €',
    highlight: true,
    tag: 'Beliebt',
    desc: 'Das volle ae SPA Erlebnis. Den ganzen Tag nur für euch — entspannt, ungestört, unvergesslich.',
    includes: ['Whirlpool', 'Sauna', 'Outdoor Pool', 'Sitzbereich & Kamin', 'Liegen', '2 Personen', 'Alles bestellbar'],
  },
  {
    name: 'Übernachtung',
    persons: '2 Personen',
    price: '350 €',
    highlight: false,
    tag: null,
    desc: 'Check-in ab 12:00 Uhr, Check-out 10:00 Uhr. Die ultimative Auszeit — bleibt einfach über Nacht.',
    includes: ['Whirlpool', 'Sauna', 'Outdoor Pool', 'Sitzbereich & Kamin', 'Liegen', '2 Personen', 'Check-in 12:00 · Check-out 10:00'],
  },
  {
    name: '12 Std. Girls',
    persons: '4 Personen',
    price: '280 €',
    highlight: false,
    tag: '👯‍♀️ Girls',
    desc: 'Das perfekte Paket für euren Girls Spa Day — der ganze Spaß, für bis zu 4 Personen.',
    includes: ['Whirlpool', 'Sauna', 'Outdoor Pool', 'Sitzbereich & Kamin', 'Liegen', '4 Personen', 'Alles bestellbar'],
  },
]

const features = [
  { icon: '〜', title: 'Whirlpool', text: 'Unser großzügiger Innen-Whirlpool lädt zum Loslassen ein. Wärme, Druck, Stille.' },
  { icon: '△', title: 'Sauna', text: 'Finnische Sauna mit voller Hitze. Aufgüsse nach Wunsch, ganz ohne Zeitdruck.' },
  { icon: '◌', title: 'Outdoor Pool', text: 'Frische Luft, Sterne, Entspannung. Unser Außenpool macht jede Jahreszeit besonders.' },
  { icon: '♡', title: 'Kamin & Liegen', text: 'Kuschelige Sitzecken, bequeme Liegen, knisterndes Kaminfeuer — euer Wohnzimmer auf Zeit.' },
]

const occasions = [
  { emoji: '👫', label: 'Pärchen' },
  { emoji: '👨‍👩‍👧‍👦', label: 'Kleine Familien' },
  { emoji: '👯‍♀️', label: 'Girls Spa Day' },
  { emoji: '🎂', label: 'Geburtstage' },
]

const times = ['10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00']

const SLIDES = ['/spa1.jpeg', '/spa2.jpeg', '/spa3.jpeg']
const LAUNCH_DATE = new Date('2026-08-01T10:00:00')

function useCountdown(target) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    function calc() {
      const diff = target - Date.now()
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [target])
  return timeLeft
}

export default function SpaPage() {
  const [selectedPkg, setSelectedPkg] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', persons: '2', notes: '' })
  const [sent, setSent] = useState(false)
  const [slide, setSlide] = useState(0)
  const [prev, setPrev] = useState(null)
  const [transitioning, setTransitioning] = useState(false)
  const [overlayEmail, setOverlayEmail] = useState('')
  const [overlaySent, setOverlaySent] = useState(false)
  const timerRef = useRef(null)
  const countdown = useCountdown(LAUNCH_DATE)

  function goTo(idx) {
    if (transitioning || idx === slide) return
    setPrev(slide)
    setSlide(idx)
    setTransitioning(true)
    setTimeout(() => { setPrev(null); setTransitioning(false) }, 1400)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSlide(s => {
        const next = (s + 1) % SLIDES.length
        setPrev(s)
        setTransitioning(true)
        setTimeout(() => { setPrev(null); setTransitioning(false) }, 1400)
        return next
      })
    }, 5000)
    return () => clearInterval(timerRef.current)
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div style={{ fontFamily: "'Jost', sans-serif", background: CREAM, color: DARK }}>

      {/* COMING SOON OVERLAY — covers entire page */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 999, overflow: 'hidden' }}>
        <style>{`
          @keyframes cs-zoom { from{transform:scale(1)} to{transform:scale(1.06)} }
          @keyframes cs-pulse { 0%,100%{opacity:1} 50%{opacity:0.25} }
          @keyframes cs-fadein { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
          .cs-bg { animation: cs-zoom 14s ease-out infinite alternate; }
          .cs-pulse { animation: cs-pulse 2s ease-in-out infinite; }
          .cs-in { animation: cs-fadein 1s ease both; }
          .cs-btn { transition: all 0.2s; }
          .cs-btn:hover { opacity:0.85; transform:translateY(-2px); }
        `}</style>

        {/* Background image — autoplays through all 3 */}
        {SLIDES.map((src, i) => (
          <img key={src} src={src} alt="" className={i === slide ? 'cs-bg' : ''}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
              opacity: i === slide ? 1 : 0,
              transition: 'opacity 1.4s ease',
              zIndex: 0,
            }}
          />
        ))}

        {/* Dark gradient */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to bottom, rgba(20,18,12,0.55) 0%, rgba(20,18,12,0.5) 40%, rgba(20,18,12,0.75) 100%)',
        }} />

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 2, height: '100%',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '24px clamp(24px,6vw,80px)',
          gap: 0,
        }}>

          {/* Logo */}
          <div className="cs-in" style={{ animationDelay: '0.1s', marginBottom: 32 }}>
            <div style={{
              background: 'rgba(247,245,240,0.1)', backdropFilter: 'blur(12px)',
              borderRadius: 10, padding: '10px 18px', display: 'inline-block',
            }}>
              <img src="/ae-spa-logo.jpeg" alt="ae SPA" style={{ height: 100, width: 'auto', display: 'block', borderRadius: 6 }} />
            </div>
          </div>

          {/* Eyebrow */}
          <div className="cs-in" style={{ animationDelay: '0.25s', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span className="cs-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: SAGE_LIGHT, display: 'inline-block' }} />
            <span style={{ color: SAGE_LIGHT, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase' }}>Eröffnung · 1. August 2026</span>
          </div>

          {/* Headline */}
          <h1 className="cs-in" style={{
            animationDelay: '0.4s',
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: 'italic',
            fontSize: 'clamp(32px,5vw,64px)', color: CREAM, lineHeight: 1.2,
            marginBottom: 12, maxWidth: 700,
          }}>
            Privates Luxus-Spa<br />kommt bald nach Henningsdorf.
          </h1>

          <p className="cs-in" style={{
            animationDelay: '0.5s',
            color: 'rgba(247,245,240,0.6)', fontSize: 'clamp(13px,1.6vw,16px)',
            maxWidth: 460, lineHeight: 1.75, marginBottom: 40,
          }}>
            Whirlpool · Sauna · Outdoor Pool · bis zu 4 Personen · exklusiv für euch
          </p>

          {/* Countdown */}
          <div className="cs-in" style={{ animationDelay: '0.6s', display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 44 }}>
            {[['days','Tage'],['hours','Std'],['minutes','Min'],['seconds','Sek']].map(([key, label], i) => (
              <div key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                {i > 0 && <span style={{ color: 'rgba(247,245,240,0.2)', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 200, marginTop: 4 }}>:</span>}
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    background: 'rgba(138,143,106,0.2)', backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(138,143,106,0.3)',
                    borderRadius: 6, padding: 'clamp(10px,1.5vw,18px) clamp(14px,2vw,26px)',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(28px,4vw,52px)', fontWeight: 400, color: CREAM, lineHeight: 1,
                    minWidth: 'clamp(56px,8vw,90px)',
                  }}>
                    {String(countdown[key]).padStart(2,'0')}
                  </div>
                  <div style={{ fontSize: 9, letterSpacing: '0.18em', color: 'rgba(247,245,240,0.35)', marginTop: 6, textTransform: 'uppercase' }}>{label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="cs-in" style={{ animationDelay: '0.75s', display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 28 }}>
            <a href="https://wa.me/4930000000?text=Hallo%2C%20ich%20m%C3%B6chte%20mich%20f%C3%BCr%20die%20Er%C3%B6ffnung%20des%20ae%20SPA%20vormerken%20lassen."
              target="_blank" rel="noopener noreferrer" className="cs-btn"
              style={{
                background: '#25D366', color: '#fff', padding: '14px 32px',
                fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase',
                textDecoration: 'none', borderRadius: 3, display: 'flex', alignItems: 'center', gap: 9,
              }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Via WhatsApp vormerken
            </a>
            {!overlaySent ? (
              <form onSubmit={e => { e.preventDefault(); setOverlaySent(true) }}
                style={{ display: 'flex', gap: 0 }}>
                <input
                  type="email" required placeholder="Eure E-Mail-Adresse"
                  value={overlayEmail} onChange={e => setOverlayEmail(e.target.value)}
                  style={{
                    background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(138,143,106,0.4)', borderRight: 'none',
                    color: CREAM, padding: '14px 18px', fontSize: 13,
                    borderRadius: '3px 0 0 3px', outline: 'none',
                    fontFamily: "'Jost', sans-serif", width: 'clamp(180px,22vw,260px)',
                  }}
                />
                <button type="submit" className="cs-btn" style={{
                  background: SAGE, color: '#fff', border: 'none',
                  padding: '14px 20px', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase',
                  cursor: 'pointer', borderRadius: '0 3px 3px 0', whiteSpace: 'nowrap',
                }}>Vormerken</button>
              </form>
            ) : (
              <div style={{
                background: 'rgba(138,143,106,0.2)', border: '1px solid rgba(138,143,106,0.4)',
                borderRadius: 3, padding: '14px 24px', color: CREAM, fontSize: 13,
              }}>✓ Wir melden uns zur Eröffnung!</div>
            )}
          </div>

          {/* Slide dots */}
          <div className="cs-in" style={{ animationDelay: '0.9s', display: 'flex', gap: 8 }}>
            {SLIDES.map((_, i) => (
              <div key={i} onClick={() => goTo(i)} style={{
                width: i === slide ? 24 : 7, height: 7, borderRadius: 4,
                background: '#fff', opacity: i === slide ? 0.8 : 0.3,
                cursor: 'pointer', transition: 'all 0.3s',
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '10px clamp(20px,5vw,56px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(247,245,240,0.93)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(138,143,106,0.15)',
      }}>
        <AeLogo size={72} />
        <div style={{ display: 'flex', gap: 32, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: MID }}>
          <a href="#angebot" style={{ color: MID, textDecoration: 'none' }}>Angebot</a>
          <a href="#ausstattung" style={{ color: MID, textDecoration: 'none' }}>Ausstattung</a>
          <a href="#anfahrt" style={{ color: MID, textDecoration: 'none' }}>Anfahrt</a>
          <a href="#buchen" style={{ color: MID, textDecoration: 'none' }}>Buchen</a>
        </div>
        <a href="#buchen" style={{
          background: SAGE, color: '#fff', padding: '10px 28px',
          fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
          textDecoration: 'none', borderRadius: 2,
        }}>Jetzt buchen</a>
      </nav>

      {/* HERO SLIDER */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 640, overflow: 'hidden' }}>
        <style>{`
          @keyframes zoomIn {
            from { transform: scale(1); }
            to   { transform: scale(1.08); }
          }
          @keyframes fadeOut {
            from { opacity: 1; }
            to   { opacity: 0; }
          }
          .hero-slide-active {
            animation: zoomIn 6s ease-out forwards;
          }
          .hero-slide-leaving {
            animation: fadeOut 1.4s ease-out forwards;
          }
          .slide-dot { transition: all 0.3s ease; cursor: pointer; }
          .slide-dot:hover { opacity: 1 !important; transform: scale(1.2); }
        `}</style>

        {/* Leaving slide */}
        {prev !== null && (
          <img
            key={`prev-${prev}`}
            src={SLIDES[prev]}
            alt=""
            className="hero-slide-leaving"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', zIndex: 1 }}
          />
        )}

        {/* Active slide */}
        <img
          key={`slide-${slide}`}
          src={SLIDES[slide]}
          alt="ae SPA Henningsdorf"
          className="hero-slide-active"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', zIndex: 2 }}
        />

        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 3, background: 'linear-gradient(to bottom, rgba(20,18,12,0.25) 0%, rgba(20,18,12,0.42) 50%, rgba(20,18,12,0.82) 100%)' }} />

        {/* Content */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 4,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '0 24px',
        }}>
          <p style={{ color: SAGE_LIGHT, letterSpacing: '0.28em', fontSize: 11, textTransform: 'uppercase', marginBottom: 28 }}>Privates Luxus-Spa · Henningsdorf bei Berlin</p>
          <AeLogo size={130} light />
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
            color: 'rgba(247,245,240,0.88)', fontSize: 'clamp(18px,2.5vw,28px)',
            marginTop: 30, maxWidth: 560, lineHeight: 1.65,
          }}>Euer Spa. Nur für euch. Bis zu 4 Personen, ganztags buchbar.</p>
          <div style={{ marginTop: 18, display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            {occasions.map(o => (
              <span key={o.label} style={{ color: 'rgba(247,245,240,0.65)', fontSize: 13 }}>{o.emoji} {o.label}</span>
            ))}
          </div>
          <div style={{ marginTop: 44, display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#buchen" style={{
              background: SAGE, color: '#fff', padding: '15px 40px',
              letterSpacing: '0.14em', fontSize: 12, textTransform: 'uppercase',
              textDecoration: 'none', borderRadius: 2,
            }}>Termin anfragen</a>
            <a href="#angebot" style={{
              border: '1px solid rgba(247,245,240,0.45)', color: CREAM, padding: '15px 40px',
              letterSpacing: '0.14em', fontSize: 12, textTransform: 'uppercase',
              textDecoration: 'none', borderRadius: 2,
            }}>Preise & Pakete</a>
          </div>
        </div>

        {/* Slide dots */}
        <div style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', zIndex: 5, display: 'flex', gap: 10 }}>
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className="slide-dot"
              onClick={() => goTo(i)}
              style={{
                width: i === slide ? 28 : 8, height: 8, borderRadius: 4,
                background: '#fff', opacity: i === slide ? 0.9 : 0.35,
              }}
            />
          ))}
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: SAGE, padding: '26px clamp(24px,5vw,80px)', display: 'flex', justifyContent: 'center', gap: 'clamp(28px,6vw,100px)', flexWrap: 'wrap' }}>
        {[['Personen','bis zu 4'],['Whirlpool','✓'],['Sauna','✓'],['Outdoor Pool','✓'],['Ab','200 €']].map(([label,val]) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ color: '#fff', fontSize: 'clamp(20px,2.5vw,30px)', fontWeight: 300, fontFamily: "'Cormorant Garamond', serif" }}>{val}</div>
            <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </section>

      {/* PAKETE */}
      <section id="angebot" style={{ padding: 'clamp(60px,8vw,110px) clamp(24px,6vw,80px)' }}>
        <SectionHeader label="Preise & Pakete" title="Euer Spa-Erlebnis" />

        {/* Package grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', gap: 20, marginTop: 52 }}>
          {packages.map(p => (
            <div key={p.name} style={{
              background: p.highlight ? DARK : WARM, padding: '36px 32px', borderRadius: 4,
              position: 'relative', border: p.highlight ? `2px solid ${SAGE}` : '2px solid transparent',
            }}>
              {p.tag && (
                <div style={{
                  position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                  background: SAGE, color: '#fff', fontSize: 10, letterSpacing: '0.16em',
                  textTransform: 'uppercase', padding: '4px 14px', borderRadius: 2, whiteSpace: 'nowrap',
                }}>{p.tag}</div>
              )}
              {/* persons badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: SAGE_LIGHT }}>{p.persons}</span>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 400, color: p.highlight ? CREAM : DARK, marginBottom: 6 }}>{p.name}</h3>
              <div style={{ fontSize: 36, fontWeight: 300, fontFamily: "'Cormorant Garamond', serif", color: SAGE, marginBottom: 16 }}>{p.price}</div>
              <p style={{ fontSize: 13, color: p.highlight ? 'rgba(247,245,240,0.65)' : MID, lineHeight: 1.7, marginBottom: 20 }}>{p.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {p.includes.map(item => (
                  <li key={item} style={{ fontSize: 12, color: p.highlight ? 'rgba(247,245,240,0.75)' : MID, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: SAGE }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <a href="#buchen" style={{
                display: 'inline-block', marginTop: 28,
                background: p.highlight ? SAGE : 'transparent',
                border: `1px solid ${p.highlight ? SAGE : 'rgba(138,143,106,0.45)'}`,
                color: p.highlight ? '#fff' : SAGE,
                padding: '11px 24px', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
                textDecoration: 'none', borderRadius: 2,
              }}>Buchen</a>
            </div>
          ))}
        </div>

        {/* Shuttle Service Card */}
        <div style={{
          marginTop: 28, background: DARK, borderRadius: 4, padding: '32px 36px',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24,
        }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: SAGE_LIGHT, marginBottom: 8 }}>Zusatzservice</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 400, color: CREAM, marginBottom: 8 }}>🚗 Shuttle Service</h3>
            <p style={{ fontSize: 13, color: 'rgba(247,245,240,0.65)', lineHeight: 1.7, maxWidth: 480 }}>
              Wir holen euch ab und fahren euch zurück — stressfrei von Tür zu Tür. Kein Parken, kein Navi, keine Gedanken.
            </p>
          </div>
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontSize: 32, fontWeight: 300, fontFamily: "'Cormorant Garamond', serif", color: SAGE }}>50 € + 1 €/km</div>
            <div style={{ fontSize: 11, color: 'rgba(247,245,240,0.45)', letterSpacing: '0.12em', marginTop: 4 }}>Pauschale + pro Kilometer</div>
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: MID, marginTop: 24 }}>Alle Preise inkl. MwSt. · Getränke & Snacks auf Anfrage bestellbar</p>
      </section>

      {/* ZITAT */}
      <section style={{ height: 'clamp(280px,38vw,500px)', position: 'relative', overflow: 'hidden' }}>
        <img src="/spa2.jpeg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(30,28,22,0.4)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <blockquote style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
            color: CREAM, fontSize: 'clamp(20px,3vw,38px)', textAlign: 'center',
            maxWidth: 680, lineHeight: 1.5, padding: '0 32px',
          }}>„Euer privates Paradies — nur 20 Minuten von Berlin."</blockquote>
        </div>
      </section>

      {/* AUSSTATTUNG */}
      <section id="ausstattung" style={{ padding: 'clamp(60px,8vw,110px) clamp(24px,6vw,80px)', background: WARM }}>
        <SectionHeader label="Was euch erwartet" title="Ausstattung" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 40, marginTop: 56 }}>
          {features.map(f => (
            <div key={f.title} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: SAGE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: '#fff' }}>{f.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 500 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: MID, lineHeight: 1.8 }}>{f.text}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 56, padding: '32px 36px', background: CREAM, borderRadius: 4, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {['🅿️ Parkplätze vorhanden','🛒 Edeka 3 Min','🍾 Alles bestellbar','🕙 Täglich 10–22 Uhr','👥 Bis 4 Personen'].map(tag => (
            <span key={tag} style={{ background: WARM, padding: '7px 14px', borderRadius: 2, fontSize: 12, color: MID }}>{tag}</span>
          ))}
        </div>
      </section>

      {/* GALERIE */}
      <section style={{ padding: 'clamp(60px,8vw,110px) clamp(24px,6vw,80px)' }}>
        <SectionHeader label="Atmosphäre" title="Euer Raum" />
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gridTemplateRows: '280px 280px', gap: 8, marginTop: 48 }}>
          <div style={{ gridRow: '1/3', overflow: 'hidden', borderRadius: 4 }}>
            <img src="/spa1.jpeg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', display: 'block' }}
              onMouseEnter={e => e.currentTarget.style.transform='scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform='scale(1)'} />
          </div>
          <div style={{ overflow: 'hidden', borderRadius: 4 }}>
            <img src="/spa2.jpeg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', display: 'block' }}
              onMouseEnter={e => e.currentTarget.style.transform='scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform='scale(1)'} />
          </div>
          <div style={{ overflow: 'hidden', borderRadius: 4 }}>
            <img src="/spa3.jpeg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', display: 'block' }}
              onMouseEnter={e => e.currentTarget.style.transform='scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform='scale(1)'} />
          </div>
        </div>
      </section>

      {/* ANFAHRT */}
      <section id="anfahrt" style={{ padding: 'clamp(60px,8vw,110px) clamp(24px,6vw,80px)', background: WARM }}>
        <SectionHeader label="Standort" title="So findet ihr uns" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 48, marginTop: 52, alignItems: 'start' }}>
          <div>
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: SAGE_LIGHT, marginBottom: 8 }}>Adresse</p>
              <p style={{ fontSize: 18, fontFamily: "'Playfair Display', serif" }}>Ruppiner Chaussee 19a</p>
              <p style={{ fontSize: 18, fontFamily: "'Playfair Display', serif" }}>16761 Henningsdorf</p>
              <p style={{ fontSize: 13, color: MID, marginTop: 6 }}>~20 Min. von Berlin Mitte</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                ['Öffnungszeiten','Täglich 10:00 – 22:00 Uhr'],
                ['Parken','Kostenlose Parkplätze direkt vor Ort'],
                ['Einkaufen','Edeka in 3 Minuten Fahrtzeit'],
                ['E-Mail','info@ae-spa.de'],
              ].map(([k,v]) => (
                <div key={k}>
                  <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: SAGE_LIGHT, marginBottom: 4 }}>{k}</p>
                  <p style={{ fontSize: 13, color: DARK }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderRadius: 4, overflow: 'hidden', height: 300, border: '1px solid rgba(138,143,106,0.2)' }}>
            <iframe
              title="ae SPA Standort"
              src="https://maps.google.com/maps?q=Ruppiner+Chaussee+19a,+16761+Henningsdorf&output=embed&z=15"
              width="100%" height="100%" style={{ border: 0, display: 'block' }}
              allowFullScreen loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="buchen" style={{ padding: 'clamp(60px,8vw,110px) clamp(24px,6vw,80px)', background: DARK }}>
        <SectionHeader label="Reservierung" title="Termin anfragen" light />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 64, marginTop: 52, alignItems: 'start' }}>
          <div>
            <p style={{ color: 'rgba(247,245,240,0.65)', lineHeight: 1.85, fontSize: 14, marginBottom: 36 }}>
              Schickt uns eine Anfrage und wir melden uns innerhalb weniger Stunden. Bitte gebt euren Wunschtermin und die Personenanzahl an.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              {[
                ['Adresse','Ruppiner Chaussee 19a · 16761 Henningsdorf'],
                ['Öffnungszeiten','Täglich 10:00 – 22:00 Uhr'],
                ['Kapazität','Bis zu 4 Personen'],
                ['E-Mail','info@ae-spa.de'],
              ].map(([k,v]) => (
                <div key={k}>
                  <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: SAGE_LIGHT, marginBottom: 4 }}>{k}</div>
                  <div style={{ color: CREAM, fontSize: 13 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {sent ? (
            <div style={{ textAlign: 'center', padding: '60px 24px' }}>
              <div style={{ fontSize: 44, marginBottom: 20, color: SAGE }}>✦</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: CREAM, fontSize: 22, marginBottom: 12 }}>Danke für eure Anfrage!</h3>
              <p style={{ color: 'rgba(247,245,240,0.6)', fontSize: 13, lineHeight: 1.8 }}>Wir melden uns in Kürze zur Bestätigung eures Termins.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Field label="Name" value={form.name} onChange={v => setForm(f=>({...f,name:v}))} required />
                <Field label="Telefon" value={form.phone} onChange={v => setForm(f=>({...f,phone:v}))} type="tel" />
              </div>
              <Field label="E-Mail" value={form.email} onChange={v => setForm(f=>({...f,email:v}))} type="email" required />
              <div>
                <label style={labelStyle}>Paket</label>
                <select value={selectedPkg} onChange={e => setSelectedPkg(e.target.value)} style={selectStyle}>
                  <option value="">Bitte wählen …</option>
                  {packages.map(p => <option key={p.name} value={p.name}>{p.name} · {p.persons} – {p.price}</option>)}
                  <option value="shuttle">+ Shuttle Service (50 € + 1 €/km)</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <Field label="Datum" value={form.date} onChange={v => setForm(f=>({...f,date:v}))} type="date" required />
                <div>
                  <label style={labelStyle}>Uhrzeit</label>
                  <select value={selectedTime} onChange={e => setSelectedTime(e.target.value)} style={selectStyle}>
                    <option value="">Wählen …</option>
                    {times.map(t => <option key={t} value={t}>{t} Uhr</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Personen</label>
                  <select value={form.persons} onChange={e => setForm(f=>({...f,persons:e.target.value}))} style={selectStyle}>
                    {['1','2','3','4'].map(n => <option key={n} value={n}>{n} {n==='1'?'Person':'Personen'}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Anmerkungen</label>
                <textarea rows={3} value={form.notes} onChange={e => setForm(f=>({...f,notes:e.target.value}))}
                  placeholder="Besonderer Anlass, Getränkewünsche, sonstige Fragen …"
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }} />
              </div>
              <button type="submit" style={{
                marginTop: 8, background: SAGE, color: '#fff', border: 'none',
                padding: '15px 40px', letterSpacing: '0.14em', fontSize: 12,
                textTransform: 'uppercase', cursor: 'pointer', borderRadius: 2, alignSelf: 'flex-start',
              }}>Anfrage senden</button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#1a1813', padding: '28px clamp(24px,5vw,56px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <AeLogo size={38} light />
        <p style={{ color: 'rgba(247,245,240,0.3)', fontSize: 11 }}>© 2025 ae SPA · Ruppiner Chaussee 19a · 16761 Henningsdorf</p>
        <div style={{ display: 'flex', gap: 24, fontSize: 11, color: 'rgba(247,245,240,0.35)' }}>
          <a href="/impressum" style={{ color: 'inherit', textDecoration: 'none' }}>Impressum</a>
          <a href="/datenschutz" style={{ color: 'inherit', textDecoration: 'none' }}>Datenschutz</a>
        </div>
      </footer>
    </div>
  )
}

function AeLogo({ size = 80, light = false }) {
  if (light) {
    return (
      <div style={{
        background: 'rgba(247,245,240,0.12)',
        backdropFilter: 'blur(8px)',
        borderRadius: 8,
        padding: '6px 12px',
        display: 'inline-flex',
      }}>
        <img src="/ae-spa-logo.jpeg" alt="ae SPA" style={{ height: size, width: 'auto', display: 'block', borderRadius: 4 }} />
      </div>
    )
  }
  return (
    <img src="/ae-spa-logo.jpeg" alt="ae SPA" style={{ height: size, width: 'auto', display: 'block' }} />
  )
}

function SectionHeader({ label, title, light = false }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: SAGE_LIGHT, marginBottom: 14 }}>{label}</p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 'clamp(28px,4vw,44px)', color: light ? CREAM : DARK, lineHeight: 1.2 }}>{title}</h2>
      <div style={{ width: 36, height: 1, background: SAGE, margin: '18px auto 0' }} />
    </div>
  )
}

function Field({ label, value, onChange, type = 'text', required = false }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input type={type} required={required} value={value} onChange={e => onChange(e.target.value)} style={inputStyle} />
    </div>
  )
}

const inputStyle = {
  width: '100%', boxSizing: 'border-box',
  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(138,143,106,0.28)',
  color: '#f7f5f0', padding: '12px 14px', fontSize: 13, borderRadius: 2,
  outline: 'none', fontFamily: "'Jost', sans-serif",
}

const selectStyle = {
  ...inputStyle,
  appearance: 'none', WebkitAppearance: 'none',
  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8'><path d='M0 0l6 8 6-8z' fill='%238a8f6a'/></svg>")`,
  backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
  paddingRight: 34, cursor: 'pointer',
}

const labelStyle = {
  display: 'block', fontSize: 10, letterSpacing: '0.2em',
  textTransform: 'uppercase', color: '#b5b98f', marginBottom: 7,
}
