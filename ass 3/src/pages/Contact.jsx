import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="page-container flex-center">
      <div className="form-card contact-card">
        <h2>Contact Administration</h2>
        <p>Have an inquiry? Drop us a message below.</p>
        
        {submitted && <div className="alert-success">Thank you! Admin will get back to you soon.</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Your Name" 
              required 
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
            />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Your Email Address" 
              required 
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
            />
          </div>
          <div className="form-group">
            <textarea 
              placeholder="Your Query/Message" 
              rows="4" 
              required
              value={form.message}
              onChange={(e) => setForm({...form, message: e.target.value})}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary btn-block">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
