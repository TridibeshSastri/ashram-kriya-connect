
import { Link } from 'react-router-dom';

const Kriyayoga = () => {
  // Steps for initiation process
  const initiationSteps = [
    {
      title: "Step 1: Application",
      description: "Complete the online application form or visit the ashram to request initiation. Basic information and your spiritual background will be collected."
    },
    {
      title: "Step 2: Preliminary Study",
      description: "Attend introductory sessions where the philosophy and commitment of Kriyayoga practice are explained. Reading materials will be provided."
    },
    {
      title: "Step 3: Personal Interview",
      description: "Meet with an experienced teacher who will assess your readiness and answer any questions about the spiritual path."
    },
    {
      title: "Step 4: Preparation Period",
      description: "A 40-day preparation period involving vegetarian diet, daily meditation practice, and self-reflection."
    },
    {
      title: "Step 5: Initiation Ceremony",
      description: "Formal initiation by Guruji or authorized acharyas where the sacred techniques will be imparted along with personal mantra."
    },
    {
      title: "Step 6: Ongoing Guidance",
      description: "Regular follow-up sessions to ensure proper practice and address spiritual questions as they arise."
    }
  ];

  return (
    <main>
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-cream relative overflow-hidden">
        <div className="absolute inset-0 bg-om-pattern bg-repeat opacity-5"></div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-maroon mb-4">Kriyayoga</h1>
          <div className="divider w-1/2 max-w-md mx-auto">
            <span className="om-symbol">ॐ</span>
          </div>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
            The ancient science of energy control that accelerates spiritual evolution and leads to self-realization.
          </p>
        </div>
      </section>
      
      {/* What Is Kriyayoga Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-maroon mb-6">What Is Kriyayoga</h2>
              <div className="divider divider-saffron w-24 mb-6">
                <span className="om-symbol">ॐ</span>
              </div>
              <p className="mb-4 text-gray-700">
                Kriyayoga is an ancient meditation technique revived for the modern age by Mahavatar Babaji and brought to householders by Lahiri Mahasaya in the 19th century. The word "Kriya" means "action" or "effort," and "yoga" means "union." Together, Kriyayoga refers to the systematic practice of specific techniques that purify the body, mind, and spirit to achieve union with the divine.
              </p>
              <p className="mb-6 text-gray-700">
                Unlike many other spiritual paths, Kriyayoga is a scientific method that works directly with the energy (prana) in the spine and brain. Through proper breath control, concentration, and specific meditative techniques, the practitioner accelerates their spiritual evolution and awakens the dormant spiritual faculties.
              </p>
              <p className="text-gray-700">
                Regular practice of Kriyayoga leads to heightened awareness, emotional balance, mental clarity, and ultimately, self-realization—the direct experience of one's true nature as pure consciousness.
              </p>
            </div>
            <div className="relative">
              <img
                src="/images/kriya-meditation.jpg"
                alt="Kriyayoga Meditation"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Initiation Process Section */}
      <section className="py-16 bg-cream">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-maroon mb-4">Initiation Process</h2>
            <div className="divider w-1/2 max-w-md mx-auto">
              <span className="om-symbol">ॐ</span>
            </div>
            <p className="mt-6 text-gray-700 max-w-2xl mx-auto">
              Receiving Kriyayoga initiation (Diksha) is a sacred commitment between guru and disciple. Below are the steps to prepare for and receive this spiritual transmission.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              {initiationSteps.map((step, index) => (
                <div key={index} className={`flex ${index < initiationSteps.length - 1 ? 'mb-8 pb-8 border-b border-gray-200' : ''}`}>
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-saffron text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-maroon mb-2">{step.title}</h3>
                    <p className="text-gray-700">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Link to="/contact" className="btn-primary">
                Request Initiation Information
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Guidelines & Practices */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-maroon mb-4">Guidelines & Practices</h2>
            <div className="divider w-1/2 max-w-md mx-auto">
              <span className="om-symbol">ॐ</span>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-cream p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-xl text-maroon mb-4">For Successful Practice</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-saffron mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-700">Practice daily at the same time and place to establish a strong routine.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-saffron mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-700">Begin with shorter sessions (15-30 minutes) and gradually increase duration.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-saffron mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-700">Maintain a vegetarian diet to support purification of the body and mind.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-saffron mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-700">Keep a spiritual journal to track your experiences and progress.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-saffron mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-700">Attend group meditations at least once a month for reinforcement and guidance.</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-cream p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-xl text-maroon mb-4">Important Guidelines</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-maroon mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-700">Keep your Kriya techniques confidential as instructed during initiation.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-maroon mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-700">Do not attempt to teach the techniques to others without proper authorization.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-maroon mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-700">Consult with your teacher before combining Kriyayoga with other intensive spiritual practices.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-maroon mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-700">Approach the practice with reverence and respect for the sacred tradition.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-maroon mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-gray-700">Inform your teacher about any unusual experiences during meditation for proper guidance.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-10 bg-maroon/10 p-6 rounded-lg">
              <h3 className="font-bold text-xl text-maroon mb-4 text-center">Download Guidelines</h3>
              <p className="text-center mb-4 text-gray-700">
                For a complete guide to Kriyayoga preparation and practice, download our free PDF resource.
              </p>
              <div className="text-center">
                <button className="bg-maroon hover:bg-maroon/90 text-white py-2 px-6 rounded-md font-medium transition-colors flex items-center mx-auto">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                  Download Guidelines (PDF)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-maroon to-maroon/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-om-pattern bg-repeat opacity-5"></div>
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Begin Your Kriyayoga Journey?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Take the first step toward self-realization and inner transformation through the sacred practice of Kriyayoga.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/events" className="btn-primary">
              View Upcoming Initiations
            </Link>
            <Link to="/contact" className="bg-white text-maroon hover:bg-white/90 py-2 px-6 rounded-md font-medium transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Kriyayoga;
