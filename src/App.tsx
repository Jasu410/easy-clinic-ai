import { useState } from 'react';
import {
  ArrowRight,
  Baby,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  HeartPulse,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRound,
  X,
} from 'lucide-react';

const clinicImage = 'https://images.pexels.com/photos/7108324/pexels-photo-7108324.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const services = [
  { icon: Stethoscope, title: 'General Practice', text: 'Whole-person care for every stage of life, from everyday concerns to ongoing health plans.', tone: 'mint' },
  { icon: HeartPulse, title: 'Women’s Health', text: 'Thoughtful, confidential support for your health, wellbeing, and changing needs.', tone: 'peach' },
  { icon: Baby, title: 'Children’s Care', text: 'A gentle, welcoming environment for your child’s check-ups, growth, and development.', tone: 'blue' },
];

const doctors = [
  { initials: 'PM', name: 'Dr Priya Menon', role: 'General Practitioner', color: 'sage' },
  { initials: 'JL', name: 'Dr James Lee', role: 'Family Medicine', color: 'sand' },
  { initials: 'AS', name: 'Dr Anika Shah', role: 'Women’s Health', color: 'rose' },
];

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'assistant' | 'user'; text: string }[]>([{ role: 'assistant', text: 'Hi! I can explain the sample clinic services and help you prepare questions for a healthcare professional. I cannot diagnose conditions or provide emergency care.' }]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const sendChat = async (message: string) => {
    const trimmed = message.trim();
    if (!trimmed || chatLoading) return;
    setChatMessages((items) => [...items, { role: 'user', text: trimmed }]);
    setChatInput('');
    setChatLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history: chatMessages.slice(-6) }),
      });
      if (!response.ok) throw new Error('AI service unavailable');
      const data = await response.json() as { reply?: string };
      if (!data.reply) throw new Error('Empty AI response');
      setChatMessages((items) => [...items, { role: 'assistant', text: data.reply! }]);
    } catch {
      const lower = trimmed.toLowerCase();
      let reply = 'This demo assistant could not reach its AI service. Add a GEMINI_API_KEY environment variable to enable AI responses. You can still explore the sample services: General Practice, Women’s Health, and Children’s Care.';
      if (/emergency|chest pain|cannot breathe|can't breathe|severe bleeding|suicid/i.test(lower)) reply = 'If this may be an emergency, contact your local emergency number or go to the nearest emergency department now. This demo cannot assess symptoms or provide emergency care.';
      else if (/service|offer|general practice|women|children|child/i.test(lower)) reply = 'This sample site lists three example services: General Practice, Women’s Health, and Children’s Care. These are demo descriptions, not confirmation that a real clinic provides them.';
      else if (/appointment|book|booking/i.test(lower)) reply = 'The appointment form is a prototype only. It does not send a booking to a clinic. Please contact your actual healthcare provider directly to arrange an appointment.';
      else if (/bring|prepare|visit/i.test(lower)) reply = 'For a real appointment, consider bringing your ID, a list of current medicines, relevant records, and questions you want to ask. Check with your clinic about its specific requirements.';
      setChatMessages((items) => [...items, { role: 'assistant', text: reply }]);
    } finally { setChatLoading(false); }
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="clinic-site">
      <div className="announcement"><span>Healthcare website prototype</span><span className="announcement-separator">•</span><span>Sample content — not a live clinic</span><a href="#contact">Find out more <ArrowRight size={13} /></a></div>
      <header className="site-header">
        <a className="clinic-brand" href="#home" aria-label="Easy Clinic home">
          <span className="brand-symbol"><HeartPulse size={20} strokeWidth={2.7} /></span>
          <span><strong>Easy</strong><small>CLINIC</small></span>
        </a>
        <button className="mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={22} /></button>
        <nav className={`site-nav ${mobileOpen ? 'nav-open' : ''}`}>
          <button className="mobile-nav-close" onClick={closeMobile} aria-label="Close navigation"><X size={21} /></button>
          <a className="active" href="#home" onClick={closeMobile}>Home</a>
          <a href="#services" onClick={closeMobile}>Services</a>
          <a href="#doctors" onClick={closeMobile}>Doctors</a>
          <a href="#about" onClick={closeMobile}>About</a>
          <a href="#contact" onClick={closeMobile}>Contact</a>
          <button className="nav-book-button" onClick={() => { setBookingOpen(true); closeMobile(); }}>Book an appointment <ArrowRight size={15} /></button>
        </nav>
        <button className="header-book-button" onClick={() => setBookingOpen(true)}>Book an appointment <ArrowRight size={15} /></button>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-copy-block">
            <div className="eyebrow"><span /> CARE THAT LISTENS</div>
            <h1>Your health,<br /><em>our priority.</em></h1>
            <p>Explore a healthcare website prototype with sample services, an AI information assistant, and an appointment-request demo.</p>
            <div className="hero-actions"><button className="primary-button" onClick={() => setChatOpen(true)}><Sparkles size={17} /> Chat with AI assistant</button><a className="secondary-button" href="#doctors"> <UserRound size={17} /> Meet our doctors</a></div>
            <div className="hero-stats"><div><strong>3</strong><small>Example services</small></div><div><strong>AI</strong><small>Information assistant</small></div><div><strong>Demo</strong><small>Appointment request</small></div></div>
          </div>
          <div className="hero-visual"><div className="image-frame"><img src={clinicImage} alt="Bright modern Easy Clinic waiting room" /><div className="image-badge"><span className="badge-check"><Check size={14} /></span><div><strong>Here when you need us</strong><small>Care that feels personal</small></div></div></div><div className="hero-shape" /></div>
        </section>

        <section className="trust-row"><div><ShieldCheck size={20} /><span><strong>Trusted care</strong><small>Accredited & compassionate</small></span></div><div><Clock3 size={20} /><span><strong>Flexible hours</strong><small>Sample hours only</small></span></div><div><MessageCircle size={20} /><span><strong>Easy communication</strong><small>Demo assistant available</small></span></div></section>

        <section className="section services-section" id="services"><div className="section-intro"><div><div className="eyebrow">WHAT WE OFFER</div><h2>Care designed around <em>you.</em></h2></div><p>From preventive care to specialist support, we make looking after your health feel simple and personal.</p></div><div className="service-grid">{services.map(({ icon: Icon, title, text, tone }) => <article className="service-card" key={title}><div className={`service-icon ${tone}`}><Icon size={24} /></div><h3>{title}</h3><p>{text}</p><a href="#contact">Learn more <ChevronRight size={15} /></a></article>)}</div></section>

        <section className="about-section" id="about"><div className="about-art"><div className="about-circle circle-one" /><div className="about-circle circle-two" /><div className="about-note"><HeartPulse size={19} /><span>Health is a conversation,<br /><strong>not a checklist.</strong></span></div></div><div className="about-copy"><div className="eyebrow">THE EASY DIFFERENCE</div><h2>Modern medicine.<br /><em>Human connection.</em></h2><p>We believe great healthcare starts with feeling heard. Our doctors take the time to understand your story, explain your options, and partner with you for the long term.</p><ul><li><Check size={15} /> Unhurried appointments</li><li><Check size={15} /> Clear, honest advice</li><li><Check size={15} /> Care for the whole family</li></ul><a className="text-link" href="#contact">Discover our approach <ArrowRight size={16} /></a></div></section>

        <section className="doctors-section section" id="doctors"><div className="section-intro"><div><div className="eyebrow">SAMPLE DOCTOR PROFILES</div><h2>People who put <em>you first.</em></h2></div><a className="text-link" href="#contact">View all doctors <ArrowRight size={16} /></a></div><div className="doctor-grid">{doctors.map((doctor) => <article className="doctor-card" key={doctor.name}><div className={`doctor-portrait ${doctor.color}`}><span>{doctor.initials}</span><div className="doctor-online"><span /> Accepting patients</div></div><div className="doctor-info"><div><h3>{doctor.name}</h3><p>{doctor.role}</p></div><button aria-label={`View ${doctor.name}`}><ArrowRight size={16} /></button></div></article>)}</div></section>

        <section className="contact-section" id="contact"><div><div className="eyebrow light">COME AND SEE US</div><h2>Good health is<br /><em>worth the visit.</em></h2><p>Our friendly team is ready to help you and your family feel your best.</p></div><div className="contact-details"><div><MapPin size={19} /><span><strong>Example clinic address</strong><small>Sample address for demonstration only<br />Not a verified healthcare location</small></span></div><div><Phone size={19} /><span><strong>Sample contact details</strong><small>Phone number and hours are placeholders</small></span></div><button className="light-button" onClick={() => setBookingOpen(true)}>Book your visit <ArrowRight size={16} /></button></div></section>
      </main>

      <footer className="site-footer"><a className="clinic-brand footer-brand" href="#home"><span className="brand-symbol"><HeartPulse size={18} /></span><span><strong>Easy</strong><small>CLINIC</small></span></a><p>Care that sees the whole you.</p><div className="footer-links"><a href="#services">Services</a><a href="#about">About</a><a href="#contact">Contact</a><a href="#contact">Privacy</a></div><span className="copyright">© 2026 Easy Clinic</span></footer>

      <button className="floating-chat" onClick={() => setChatOpen(true)} aria-label="Open AI assistant"><Sparkles size={21} /></button>
      {chatOpen && <div className="modal-backdrop" onClick={() => setChatOpen(false)}><div className="chat-modal" onClick={(event) => event.stopPropagation()}><div className="modal-header"><div className="modal-icon"><Sparkles size={18} /></div><div><strong>Easy AI assistant</strong><span>Here to help you get started</span></div><button onClick={() => setChatOpen(false)} aria-label="Close assistant"><X size={18} /></button></div><div className="chat-thread" aria-live="polite">{chatMessages.map((item, index) => <div className={item.role === 'user' ? 'chat-message user-message' : 'chat-message'} key={`${item.role}-${index}`}>{item.text}</div>)}{chatLoading && <div className="chat-message">Thinking…</div>}</div><div className="chat-suggestions"><button onClick={() => sendChat('What services are listed?')}>What services are listed?</button><button onClick={() => sendChat('How can I prepare for a visit?')}>How can I prepare for a visit?</button></div><form className="chat-input-form" onSubmit={(event) => { event.preventDefault(); void sendChat(chatInput); }}><input aria-label="Ask the assistant" value={chatInput} onChange={(event) => setChatInput(event.target.value)} placeholder="Ask a general question…" maxLength={1000} /><button type="submit" disabled={chatLoading || !chatInput.trim()} aria-label="Send message"><ArrowRight size={17} /></button></form><p className="modal-disclaimer">Demo only. Not medical advice or a substitute for a clinician. For emergencies, contact local emergency services.</p></div></div>}
      {bookingOpen && <div className="modal-backdrop" onClick={() => setBookingOpen(false)}><div className="booking-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setBookingOpen(false)} aria-label="Close booking"><X size={18} /></button>{sent ? <div className="success-state"><div className="success-icon"><Check size={25} /></div><h2>Demo complete.</h2><p>This prototype does not send or store your request. No appointment has been booked. Contact your real healthcare provider directly to arrange a visit.</p><button className="primary-button" onClick={() => setBookingOpen(false)}>Done <ArrowRight size={16} /></button></div> : <><div className="eyebrow">MAKE TIME FOR YOUR HEALTH</div><h2>Book an appointment</h2><p className="modal-intro">Try the form interaction. This demo does not send personal information or create a real booking.</p><form onSubmit={(event) => { event.preventDefault(); setSent(true); }}><label>Your name<input required placeholder="Example: Alex Demo" /></label><label>Phone number<input required type="tel" placeholder="Example: 0000000000" /></label><label>What can we help with?<div className="select-wrap"><select defaultValue=""><option value="" disabled>Select a service</option><option>General Practice</option><option>Women’s Health</option><option>Children’s Care</option></select><ChevronDown size={16} /></div></label><button className="primary-button" type="submit">Test demo form <ArrowRight size={16} /></button></form></>}</div></div>}
    </div>
  );
}

export default App;
