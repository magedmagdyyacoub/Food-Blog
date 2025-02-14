// src/pages/Contact.js
function Contact() {
  return (
    <div className="contact-page">
      <h2>Contact Us</h2>
      <p>We'd love to hear from you! Fill out the form below to get in touch.</p>
      
      <form className="contact-form">
        <div>
          <label>Name:</label>
          <input type="text" placeholder="Your Name" required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" placeholder="Your Email" required />
        </div>
        <div>
          <label>Message:</label>
          <textarea placeholder="Your Message" rows="5" required></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
