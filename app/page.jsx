'use client'
import { useState } from 'react'

const SAGE = '#8a8f6a'
const SAGE_LIGHT = '#b5b98f'
const CREAM = '#f7f5f0'
const WARM = '#ede9e0'
const DARK = '#2a2820'
const MID = '#5a5748'

const packages = [
  {
    name: 'Halbtag',
    duration: '4 Stunden',
    price: '250 €',
    highlight: false,
    desc: 'Perfekt für einen entspannten Nachmittag oder Abend. Whirlpool, Sauna & Outdoor Pool exklusiv für euch.',
    includes: ['Whirlpool', 'Sauna', 'Outdoor Pool', 'Sitzbereich & Kamin', 'Bis zu 4 Personen'],
  },
  {
    name: 'Ganztag',
    duration: '12 Stunden',
    price: '300 €',
    highlight: true,
    desc: 'Das volle ae SPA Erlebnis. Den ganzen Tag nur für euch — entspannt, ungestört, unvergesslich.',
    includes: ['Whirlpool', 'Sauna', 'Outdoor Pool', 'Sitzbereich & Kamin', 'Liegen', 'Bis zu 4 Personen', 'Alles bestellbar'],
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

export default function SpaPage() {
  const [selectedPkg, setSelectedPkg] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', persons: '2', notes: '' })
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div style={{ fontFamily: "'Jost', sans-serif", background: CREAM, color: DARK }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '18px clamp(20px,5vw,56px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(247,245,240,0.93)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(138,143,106,0.15)',
      }}>
        <AeLogo size={52} />
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

      {/* HERO */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 640, overflow: 'hidden' }}>
        <img src="/spa1.jpeg" alt="ae SPA Henningsdorf"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(30,28,22,0.3) 0%, rgba(30,28,22,0.5) 60%, rgba(30,28,22,0.8) 100%)' }} />
        <div style={{
          position: 'relative', zIndex: 2, height: '100%',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '0 24px',
        }}>
          <p style={{ color: SAGE_LIGHT, letterSpacing: '0.25em', fontSize: 11, textTransform: 'uppercase', marginBottom: 24 }}>Privates Luxus-Spa · Henningsdorf bei Berlin</p>
          <AeLogo size={120} light />
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
            color: 'rgba(247,245,240,0.85)', fontSize: 'clamp(18px,2.5vw,28px)',
            marginTop: 28, maxWidth: 560, lineHeight: 1.6,
          }}>Euer Spa. Nur für euch. Bis zu 4 Personen, ganztags buchbar.</p>
          <div style={{ marginTop: 16, display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            {occasions.map(o => (
              <span key={o.label} style={{ color: 'rgba(247,245,240,0.7)', fontSize: 13 }}>{o.emoji} {o.label}</span>
            ))}
          </div>
          <div style={{ marginTop: 40, display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
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
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', opacity: 0.45 }}>
          <svg width="18" height="30" viewBox="0 0 18 30" fill="none">
            <rect x="8" y="0" width="2" height="18" fill={CREAM} rx="1"/>
            <path d="M2 12 L9 20 L16 12" stroke={CREAM} strokeWidth="1.5" fill="none"/>
          </svg>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: SAGE, padding: '26px clamp(24px,5vw,80px)', display: 'flex', justifyContent: 'center', gap: 'clamp(28px,6vw,100px)', flexWrap: 'wrap' }}>
        {[['Personen','bis zu 4'],['Whirlpool','✓'],['Sauna','✓'],['Outdoor Pool','✓'],['Ab','250 €']].map(([label,val]) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ color: '#fff', fontSize: 'clamp(20px,2.5vw,30px)', fontWeight: 300, fontFamily: "'Cormorant Garamond', serif" }}>{val}</div>
            <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </section>

      {/* PAKETE */}
      <section id="angebot" style={{ padding: 'clamp(60px,8vw,110px) clamp(24px,6vw,80px)' }}>
        <SectionHeader label="Preise & Pakete" title="Euer Spa-Erlebnis" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 24, marginTop: 52, maxWidth: 800, margin: '52px auto 0' }}>
          {packages.map(p => (
            <div key={p.name} style={{
              background: p.highlight ? DARK : WARM, padding: '44px 36px', borderRadius: 4,
              position: 'relative', border: p.highlight ? `2px solid ${SAGE}` : '2px solid transparent',
            }}>
              {p.highlight && (
                <div style={{
                  position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                  background: SAGE, color: '#fff', fontSize: 10, letterSpacing: '0.18em',
                  textTransform: 'uppercase', padding: '4px 16px', borderRadius: 2,
                }}>Empfehlung</div>
              )}
              <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: SAGE_LIGHT, marginBottom: 8 }}>{p.duration}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 400, color: p.highlight ? CREAM : DARK, marginBottom: 8 }}>{p.name}</h3>
              <div style={{ fontSize: 38, fontWeight: 300, fontFamily: "'Cormorant Garamond', serif", color: SAGE, marginBottom: 20 }}>{p.price}</div>
              <p style={{ fontSize: 13, color: p.highlight ? 'rgba(247,245,240,0.7)' : MID, lineHeight: 1.75, marginBottom: 24 }}>{p.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {p.includes.map(item => (
                  <li key={item} style={{ fontSize: 13, color: p.highlight ? 'rgba(247,245,240,0.8)' : MID, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: SAGE, fontSize: 16 }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <a href="#buchen" style={{
                display: 'inline-block', marginTop: 32,
                background: p.highlight ? SAGE : 'transparent',
                border: `1px solid ${p.highlight ? SAGE : 'rgba(138,143,106,0.5)'}`,
                color: p.highlight ? '#fff' : SAGE,
                padding: '12px 28px', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
                textDecoration: 'none', borderRadius: 2,
              }}>Buchen</a>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', fontSize: 12, color: MID, marginTop: 28 }}>Alle Preise inkl. MwSt. · Getränke & Snacks auf Anfrage bestellbar</p>
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
                  {packages.map(p => <option key={p.name} value={p.name}>{p.name} ({p.duration}) – {p.price}</option>)}
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
  const color = light ? '#f7f5f0' : '#8a8f6a'
  const textColor = light ? 'rgba(247,245,240,0.7)' : '#8a8f6a'
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 120 132" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="8" y="80" fontFamily="Playfair Display, Georgia, serif" fontSize="72" fontStyle="italic" fontWeight="400" fill={color}>ae</text>
      <line x1="8" y1="98" x2="34" y2="98" stroke={color} strokeWidth="0.8"/>
      <line x1="82" y1="98" x2="112" y2="98" stroke={color} strokeWidth="0.8"/>
      <text x="60" y="103" fontFamily="Jost, sans-serif" fontSize="11" letterSpacing="4" textAnchor="middle" fill={textColor} fontWeight="400">SPA</text>
      <g transform="translate(60,120) scale(0.9)">
        <path d="M0,-10 C-5,-5 -5,0 0,2 C5,0 5,-5 0,-10Z" stroke={color} strokeWidth="1" fill="none"/>
        <path d="M-8,-6 C-10,0 -7,3 0,2 C-3,-1 -5,-5 -8,-6Z" stroke={color} strokeWidth="1" fill="none"/>
        <path d="M8,-6 C10,0 7,3 0,2 C3,-1 5,-5 8,-6Z" stroke={color} strokeWidth="1" fill="none"/>
      </g>
    </svg>
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
