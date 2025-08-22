
import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  instagram?: string;
  location: string;
  languages: string;
  category: string;
  title: string;
  description: string;
  files?: FileList | null;
};

const CATEGORIES = [
  'Adventure & Nature',
  'Homestays & Farmstays',
  'Food & Street Experiences',
  'Wellness & Spirituality',
  'Culture & Arts',
];

const JURY = [
  { name: 'Ananya Sharma', role: 'Travel Creator & Trek Leader', handle: '@ananya.treks' },
  { name: 'Ravi Menon', role: 'Tourism Consultant & Storyteller', handle: '@ravimenon' },
  { name: 'Meera Kapoor', role: 'Culinary Entrepreneur', handle: '@meeracooks' },
];

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [saving, setSaving] = useState(false);
  const [ok, setOk] = useState<string>('');
  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '', instagram: '',
    location: '', languages: '',
    category: CATEGORIES[0], title: '', description: '', files: null
  });

  useEffect(() => {
    // Restore draft
    const saved = localStorage.getItem('hoststar_draft');
    if (saved) setForm(JSON.parse(saved));
  }, []);

  useEffect(() => {
    // Persist draft
    localStorage.setItem('hoststar_draft', JSON.stringify({ ...form, files: undefined }));
  }, [form]);

  const charCount = form.description.length;
  const charLeft = 600 - charCount;
  const canSubmit = useMemo(() => {
    return form.name && form.email && form.phone && form.location && form.languages && form.title && form.description.length >= 50;
  }, [form]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      // Prepare payload (file names for demo)
      const fileNames = Array.from(form.files ?? []).map(f => f.name);
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, fileNames }),
      });
      const data = await res.json();
      if (data?.ok) {
        setOk('✅ Application submitted! (Demo) — Check console logs on the serverless function.');
        localStorage.removeItem('hoststar_draft');
        // reset (keep email for quick re-try during demo)
        setForm({ ...form, title: '', description: '', files: null });
      } else {
        setOk('Something went wrong. Please try again.');
      }
    } catch (err) {
      setOk('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <Head>
        <title>AARNA HostStar India — Become a SuperHost</title>
        <meta name="description" content="Showcase your host experience and get featured on the AARNA app. Enter the HostStar India awards — cash prizes, mentorship and national recognition." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Hero */}
      <header className="hero">
        <div className="container inner">
          <div>
            <div className="badge">AARNA PRESENTS</div>
            <h1 className="h1">HostStar India <span style={{color:'var(--accent)'}}>2025</span></h1>
            <p className="p" style={{maxWidth:560}}>A national search for India’s most compelling <b>hosts</b>. Win cash prizes, get featured on the AARNA app, and take your experience to the world.</p>
            <div className="kpis">
              <div className="kpi"><b>₹1.5L</b><div className="small">Prize Pool per Region</div></div>
              <div className="kpi"><b>3,000+</b><div className="small">Hosts Onboarded (Pilot)</div></div>
              <div className="kpi"><b>4</b><div className="small">Weeks to Win</div></div>
            </div>
            <div style={{marginTop:18, display:'flex', gap:10}}>
              <a href="#apply" className="btn">Apply Now</a>
              <a href="#faq" className="btn" style={{background:'rgba(255,255,255,.08)', boxShadow:'none', color:'var(--text)'}}>Read FAQs</a>
            </div>
          </div>
          <img className="hero-img" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop" alt="Hero"/>
        </div>
      </header>

      {/* Why join */}
      <section className="section light">
        <div className="container">
          <h2 className="h2">Why join <span style={{color:'var(--accent)'}}>HostStar</span>?</h2>
          <div className="grid grid-3">
            {[
              {t:'National recognition', d:'Be discovered by travelers & partners across India.'},
              {t:'Guaranteed onboarding', d:'All valid entries get a listing on the AARNA app.'},
              {t:'Mentorship & media', d:'Professional shoots, creator collabs & PR features.'},
              {t:'Zero entry fee', d:'We want talent, not paywalls. Enter free.'},
              {t:'Jury + Public voting', d:'Fair scoring with expert jurors & community love.'},
              {t:'Fast timeline', d:'4 weeks from entry to winners and onboarding.'},
            ].map((c,i)=>(
              <div key={i} className="card">
                <h3 className="h3">{c.t}</h3>
                <p className="p">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container grid grid-2" style={{alignItems:'center'}}>
          <div>
            <h2 className="h2">Mark your calendar</h2>
            <p className="p">Here’s how the 4-week pilot rolls out for Himachal + Upper North.</p>
            <div className="timeline">
              {[
                {d:'1 Sept', t:'Entries open'},
                {d:'15 Sept', t:'Entries close'},
                {d:'20 Sept', t:'Jury + Public Voting'},
                {d:'22 Sept', t:'Winners announced & Onboarding starts'},
              ].map((row,i)=>(
                <div className="tl-item" key={i}>
                  <div className="dot" />
                  <div className="small" style={{color:'var(--accent-2)'}}>{row.d}</div>
                  <div className="h3" style={{margin:0}}>{row.t}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <h3 className="h3">Categories</h3>
            <div className="grid" style={{gridTemplateColumns:'repeat(2,minmax(0,1fr))'}}>
              {CATEGORIES.map((c,i)=>(<div key={i} className="badge" style={{textAlign:'center'}}>{c}</div>))}
            </div>
            <div style={{marginTop:12}} className="small">Tip: You can enter more than one category if the experiences are distinct.</div>
          </div>
        </div>
      </section>

      {/* Jury */}
      <section className="section light">
        <div className="container">
          <h2 className="h2">Meet the panel</h2>
          <div className="grid grid-3">
            {JURY.map((j, i) => (
              <div key={i} className="card" style={{textAlign:'center'}}>
                <img src={`https://source.unsplash.com/collection/190727/3${i}0x340`} alt={j.name} style={{width:'100%',height:220,objectFit:'cover',borderRadius:12,marginBottom:12}}/>
                <div className="h3">{j.name}</div>
                <div className="small">{j.role}</div>
                <div className="badge" style={{marginTop:8}}>{j.handle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section className="section">
        <div className="container grid grid-3">
          {[
            {t:'₹25,000', d:'Per category winner'},
            {t:'₹10,000', d:'Per runner-up'},
            {t:'Pro Shoot', d:'Winners get a professional photo/video shoot'},
          ].map((p,i)=>(
            <div key={i} className="card" style={{textAlign:'center'}}>
              <div className="h1" style={{margin:0,color:'var(--accent)'}}>{p.t}</div>
              <div className="p">{p.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Apply Form */}
      <section id="apply" className="section light">
        <div className="container">
          <h2 className="h2">Apply now</h2>
          <p className="p" style={{marginBottom:16}}>Show us your experience. Your story matters more than production value. Keep the video natural and real.</p>
          <form className="form card" onSubmit={handleSubmit}>
            <div className="grid grid-2">
              <div>
                <label>Full Name</label>
                <input className="input" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} placeholder="e.g., Renu Thakur" required />
              </div>
              <div>
                <label>Phone</label>
                <input className="input" value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} placeholder="+91…" required />
              </div>
              <div>
                <label>Email</label>
                <input type="email" className="input" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} placeholder="you@example.com" required />
              </div>
              <div>
                <label>Instagram (optional)</label>
                <input className="input" value={form.instagram} onChange={e=>setForm({...form, instagram: e.target.value})} placeholder="@handle" />
              </div>
              <div>
                <label>Location (City, State)</label>
                <input className="input" value={form.location} onChange={e=>setForm({...form, location: e.target.value})} placeholder="Manali, Himachal Pradesh" required />
              </div>
              <div>
                <label>Languages</label>
                <input className="input" value={form.languages} onChange={e=>setForm({...form, languages: e.target.value})} placeholder="Hindi, English, Pahari" required />
              </div>
              <div>
                <label>Category</label>
                <select value={form.category} onChange={e=>setForm({...form, category: e.target.value})}>
                  {CATEGORIES.map((c)=> (<option key={c} value={c}>{c}</option>))}
                </select>
              </div>
              <div>
                <label>Experience Title</label>
                <input className="input" value={form.title} onChange={e=>setForm({...form, title: e.target.value})} placeholder="Dharamshala Tea Garden Walk" required />
              </div>
            </div>
            <div>
              <label>Describe your experience (50–600 chars)</label>
              <textarea className="input" rows={5} maxLength={600} value={form.description} onChange={e=>setForm({...form, description: e.target.value})} placeholder="What makes it special? Who is it for? Safety, capacity, timings…"></textarea>
              <div className="small" style={{textAlign:'right'}}>{charLeft} characters left</div>
            </div>
            <div>
              <label>Upload 3–5 photos or a 60–120s video (demo)</label>
              <input className="input" type="file" multiple onChange={e=>setForm({...form, files: e.target.files})} />
              {form.files && <div className="small">Files: {Array.from(form.files).map(f=>f.name).join(', ')}</div>}
            </div>
            <div style={{display:'flex',gap:12, alignItems:'center'}}>
              <button className="btn" disabled={!canSubmit || saving} type="submit">{saving ? 'Submitting…' : 'Submit Application'}</button>
              <div className="small">This is a demo form. Files aren’t uploaded; API echoes metadata for your presentation.</div>
            </div>
            {ok && <div className="small" style={{marginTop:10}}>{ok}</div>}
          </form>
        </div>
      </section>

      {/* FAQs */}
      <section id="faq" className="section">
        <div className="container">
          <h2 className="h2">Questions?</h2>
          <div className="accordion">
            {[
              {q:'Who can apply?', a:'Any adult (18+) running or planning to run a host-led experience in India: homestays, treks, food walks, workshops, wellness, culture, etc.'},
              {q:'Is the entry really free?', a:'Yes. We want to remove barriers. There are no fees to submit.'},
              {q:'What should the video/photos include?', a:'Show your face, the experience location, and a quick walkthrough. Keep it honest; phone-shot is fine. Mention safety practices and capacity.'},
              {q:'Can I apply in multiple categories?', a:'Yes, if your experiences are distinct. Submit a separate application per category.'},
              {q:'How are winners selected?', a:'Weighted scoring: Jury (70%) + Public voting on microsite (30%). Criteria: authenticity, storytelling, community impact, and experience quality.'},
              {q:'What do winners get?', a:'₹25,000 each per category + professional shoots + PR + guaranteed onboarding to the AARNA app.'},
              {q:'What if I don’t win?', a:'All valid entries are still onboarded to AARNA with guidance to improve listings.'},
              {q:'Do I keep my content rights?', a:'You retain ownership but grant us a license to use submitted material for promotion.'},
              {q:'When will I hear back?', a:'Shortlisting begins as soon as entries close. We announce winners by 22 Sept and start onboarding the same day.'},
              {q:'How will my data be used?', a:'Only to evaluate your application and set up your listing. Read our privacy notice in the app.'},
            ].map((f, i)=>(
              <div key={i} className={'acc-item ' + (openFAQ===i ? 'open' : '')}>
                <button className="acc-btn" onClick={()=> setOpenFAQ(openFAQ===i ? null : i)}>
                  {f.q} <span style={{color:'var(--accent)'}}>{openFAQ===i? '–':'+'}</span>
                </button>
                <div className="acc-content">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="container small">© {new Date().getFullYear()} AARNA • HostStar India. Made with ❤️ for local hosts.</div>
      </footer>
    </>
  );
}
