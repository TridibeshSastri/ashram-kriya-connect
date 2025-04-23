
import { Link } from 'react-router-dom';
import GuruCard from '../components/GuruCard';

const About = () => {
  // Guru lineage complete data
  const guruLineage = [
    {
      name: "Mahavatar Babaji",
      image: "/images/babaji.jpg",
      period: "Ageless Master",
      description: "The immortal guru who revived the ancient science of Kriyayoga for this modern age. Babaji's divine presence continues to guide sincere seekers on the path of self-realization. Though few have physically met him, his spiritual influence extends throughout the world, and he remains the supreme guru of the Kriyayoga tradition."
    },
    {
      name: "Shyamacharan Lahiri",
      image: "/images/lahiri.jpg",
      period: "1828-1895",
      description: "Known as Lahiri Mahasaya, he was a householder and government accountant who was initiated into Kriyayoga by Mahavatar Babaji. As the first to bring these sacred teachings to the general public, Lahiri Mahasaya made the transformative practice of Kriyayoga accessible to people of all castes and backgrounds, emphasizing that spiritual awakening is possible while fulfilling one's worldly duties."
    },
    {
      name: "Yukteswar Giri",
      image: "/images/yukteswar.jpg",
      period: "1855-1936",
      description: "A Jyotisha master, educator, and scholar, Sri Yukteswar systematized Kriyayoga teachings for the modern era. His rigorous approach to spiritual practice emphasized both devotion and intellectual understanding. He established ashrams in Serampore and Puri, where he trained disciples in the profound techniques of Kriyayoga meditation, preparing them to share these teachings worldwide."
    },
    {
      name: "Paramananda Giri",
      image: "/images/paramananda.jpg",
      period: "1893-1971",
      description: "A direct disciple of Sri Yukteswar Giri, Paramananda Giri dedicated his life to carrying forward the spiritual legacy of the Kriyayoga tradition. His deep meditative practices and humble service to humanity exemplified the transformative power of Kriyayoga. He established several ashrams in Eastern India, providing sanctuaries for sincere spiritual seekers."
    },
    {
      name: "Krishnananda Giri",
      image: "/images/krishnananda.jpg",
      period: "1917-1992",
      description: "The beloved guru who expanded the reach of Kriyayoga throughout India and beyond. Known for his profound compassion and spiritual wisdom, Krishnananda Giri founded the original Aukhanda Shri Ashram in 1978, establishing a center for spiritual practice, education, and service to humanity. His teachings emphasized the practical application of Kriyayoga principles in daily life."
    },
    {
      name: "Acharya Devananda Sastri",
      image: "/images/devananda.jpg",
      period: "Current Guruji",
      description: "Our present spiritual leader, Guruji Acharya Devananda Sastri, continues the sacred lineage with unwavering dedication. After years of intensive spiritual practice under Krishnananda Giri, he was appointed as his successor. Guruji combines deep spiritual insight with practical wisdom, making ancient teachings relevant for contemporary seekers. Under his guidance, the ashram has expanded its spiritual and humanitarian services, reaching thousands across India and around the world."
    }
  ];
  
  return (
    <main>
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-cream relative overflow-hidden">
        <div className="absolute inset-0 bg-om-pattern bg-repeat opacity-5"></div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-maroon mb-4">About Our Ashram</h1>
          <div className="divider w-1/2 max-w-md mx-auto">
            <span className="om-symbol">ॐ</span>
          </div>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
            Discover our spiritual heritage, mission, and the sacred lineage that guides our path.
          </p>
        </div>
      </section>
      
      {/* Mission & Vision Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-maroon mb-6">Our Mission & Vision</h2>
              <div className="divider divider-saffron w-24 mb-6">
                <span className="om-symbol">ॐ</span>
              </div>
              <p className="mb-5 text-gray-700">
                <strong>Our Mission:</strong> To preserve, practice, and propagate the authentic teachings of Kriyayoga as passed down through our sacred lineage, while serving humanity through spiritual education and compassionate action.
              </p>
              <p className="mb-6 text-gray-700">
                <strong>Our Vision:</strong> To create a world where individuals discover their divine potential through Kriyayoga practices, leading to personal transformation and global harmony. We envision our ashram as a beacon of spiritual wisdom that illuminates the path of self-realization for seekers worldwide.
              </p>
              <p className="text-gray-700">
                Through meditation, service, and community, we strive to embody the timeless principles of Kriyayoga in every aspect of our lives and share these transformative practices with all who are drawn to this path.
              </p>
            </div>
            <div className="relative">
              <img
                src="/images/ashram-panorama.jpg"
                alt="Ashram Panoramic View"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* History Section */}
      <section className="py-16 bg-cream">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-maroon mb-4">History of the Ashram</h2>
            <div className="divider w-1/2 max-w-md mx-auto">
              <span className="om-symbol">ॐ</span>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="mb-4 text-gray-700">
                Aukhanda Shri Kriyayog Sadhan Mandir Sevashram was established in 1978 by Swami Krishnananda Giri, a revered master in the lineage of Mahavatar Babaji. The ashram began as a small meditation hut on the outskirts of Kolkata, where Swami Krishnananda would instruct a handful of dedicated disciples in the sacred techniques of Kriyayoga.
              </p>
              
              <p className="mb-4 text-gray-700">
                As word spread of the profound spiritual transformations experienced by practitioners, the ashram gradually expanded. In 1985, the main temple was constructed, featuring traditional architecture designed to enhance meditation and spiritual practices. This was followed by residential quarters for monks and facilities to accommodate visiting seekers.
              </p>
              
              <p className="mb-4 text-gray-700">
                Following Swami Krishnananda's mahasamadhi (conscious exit from the body) in 1992, leadership passed to his foremost disciple, Acharya Devananda Sastri, our current Guruji. Under his guidance, the ashram has flourished, expanding both its spiritual offerings and humanitarian services.
              </p>
              
              <p className="text-gray-700">
                Today, our ashram stands as a beacon of spiritual wisdom and service, with regular Kriyayoga initiations, daily meditation sessions, extensive charitable activities, and educational programs that reach thousands across India and beyond. Throughout its evolution, the ashram has remained true to its founding principles: to preserve the authentic teachings of Kriyayoga and to serve humanity with compassion and love.
              </p>
            </div>
            
            <div className="mt-10 text-center">
              <Link to="/kriyayoga" className="btn-primary">
                Learn About Kriyayoga
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Guru Lineage Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-maroon mb-4">Our Guru Paramparā</h2>
            <div className="divider w-1/2 max-w-md mx-auto">
              <span className="om-symbol">ॐ</span>
            </div>
            <p className="mt-6 text-gray-700 max-w-2xl mx-auto">
              We honor the unbroken lineage of enlightened masters who have preserved and transmitted the sacred science of Kriyayoga throughout generations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guruLineage.map((guru, index) => (
              <GuruCard
                key={index}
                name={guru.name}
                image={guru.image}
                period={guru.period}
                description={guru.description}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
