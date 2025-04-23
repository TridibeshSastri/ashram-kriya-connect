
import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    submitting: false,
    error: false
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ submitted: false, submitting: true, error: false });
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus({ submitted: true, submitting: false, error: false });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };
  
  return (
    <main>
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-cream relative overflow-hidden">
        <div className="absolute inset-0 bg-om-pattern bg-repeat opacity-5"></div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-maroon mb-4">Contact Us</h1>
          <div className="divider w-1/2 max-w-md mx-auto">
            <span className="om-symbol">ॐ</span>
          </div>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
            Reach out with your questions about the ashram, events, or spiritual guidance.
          </p>
        </div>
      </section>
      
      {/* Contact Info & Form */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-maroon mb-6">Get In Touch</h2>
              <div className="divider divider-saffron w-24 mb-6">
                <span className="om-symbol">ॐ</span>
              </div>
              
              <div className="space-y-6 mb-10">
                <div className="flex">
                  <MapPin size={24} className="text-saffron mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Our Location</h3>
                    <p className="text-gray-700">
                      Aukhanda Shri Kriyayog Sadhan Mandir Sevashram<br />
                      123 Spiritual Path, Ashram District<br />
                      Kolkata, West Bengal 700001, India
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <Phone size={24} className="text-saffron mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Phone</h3>
                    <p className="text-gray-700">
                      Main Office: +91 98765 43210<br />
                      Visitor Information: +91 98765 43211
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <Mail size={24} className="text-saffron mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Email</h3>
                    <p className="text-gray-700">
                      General Inquiries: <a href="mailto:info@aukhandashriaashram.org" className="text-saffron hover:underline">info@aukhandashriaashram.org</a><br />
                      Event Registration: <a href="mailto:events@aukhandashriaashram.org" className="text-saffron hover:underline">events@aukhandashriaashram.org</a>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-cream p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-lg mb-4">Visiting Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Temple:</span>
                    <span className="text-gray-700">5:00 AM - 8:30 PM Daily</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Office:</span>
                    <span className="text-gray-700">9:00 AM - 5:00 PM (Mon-Sat)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Library:</span>
                    <span className="text-gray-700">10:00 AM - 6:00 PM (Mon-Fri)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Meditation Hall:</span>
                    <span className="text-gray-700">4:30 AM - 9:30 PM Daily</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <p className="text-sm text-gray-700 italic">
                      The ashram observes silence from 8:30 PM to 4:30 AM daily.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-maroon mb-6">Send a Message</h2>
              <div className="divider divider-saffron w-24 mb-6">
                <span className="om-symbol">ॐ</span>
              </div>
              
              {formStatus.submitted ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg shadow-md">
                  <h3 className="font-bold text-lg mb-2">Message Received!</h3>
                  <p>Thank you for reaching out to us. We will respond to your inquiry within 48 hours.</p>
                  <button 
                    onClick={() => setFormStatus(prev => ({...prev, submitted: false}))}
                    className="mt-4 text-green-700 hover:text-green-900 font-medium underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-saffron"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-saffron"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-saffron"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject *</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-saffron"
                        required
                      >
                        <option value="">Please select</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Kriyayoga Initiation">Kriyayoga Initiation</option>
                        <option value="Event Information">Event Information</option>
                        <option value="Visiting the Ashram">Visiting the Ashram</option>
                        <option value="Volunteering">Volunteering</option>
                        <option value="Donation">Donation</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-saffron"
                      required
                    />
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={formStatus.submitting}
                      className={`btn-primary w-full ${formStatus.submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {formStatus.submitting ? 'Sending Message...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-0">
        <div className="h-96 w-full">
          {/* This would typically be a Google Maps embed, showing an iframe */}
          {/* For demo purposes we'll use a placeholder */}
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <div className="text-center">
              <h3 className="font-bold text-xl mb-2 text-gray-700">Google Maps Embed</h3>
              <p className="text-gray-600">Interactive map would be displayed here</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
