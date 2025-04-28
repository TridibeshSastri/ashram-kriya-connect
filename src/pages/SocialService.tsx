
import { Link } from 'react-router-dom';
import { HandHeart } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  impact: string;
  image: string;
}

const ServiceCard = ({ title, description, impact, image }: ServiceCardProps) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold text-maroon mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="bg-cream p-4 rounded-md">
        <p className="text-sm font-medium text-maroon">Impact</p>
        <p className="text-gray-700">{impact}</p>
      </div>
    </div>
  </div>
);

const SocialService = () => {
  const services = [
    {
      title: "Bāstra Dānam (Clothing Distribution)",
      description: "Providing clothing to those in need, ensuring dignity and comfort through the distribution of new garments to underprivileged communities.",
      impact: "Over 10,000 families supported annually with new clothing",
      image: "/images/world-peace-yajna.jpg"
    },
    {
      title: "Anna Dānam (Food Service)",
      description: "Daily food distribution program serving nutritious meals to the needy, including prasadam distribution during festivals.",
      impact: "Serving 500+ meals daily to those in need",
      image: "/images/retreat.jpg"
    },
    {
      title: "Kambal Dānam (Blanket Distribution)",
      description: "Winter relief initiative providing warm blankets to homeless and underprivileged families during cold months.",
      impact: "2,000+ blankets distributed every winter season",
      image: "/images/janmashtami.jpg"
    },
    {
      title: "Medical Camps",
      description: "Regular health camps offering free medical check-ups, medicines, and health awareness programs to local communities.",
      impact: "Monthly camps serving 200+ patients per session",
      image: "/images/kumbhabhisheka.jpg"
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container-custom">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <HandHeart className="text-saffron w-12 h-12" />
          </div>
          <h1 className="text-4xl font-bold text-maroon mb-4">Social Service Initiatives</h1>
          <div className="w-24 h-1 bg-saffron mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-700">
            Service to humanity is service to the Divine. Our social service initiatives aim to uplift and support communities in need through various sustainable programs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-cream rounded-lg p-8 text-center">
          <h3 className="text-2xl font-semibold text-maroon mb-4">Support Our Initiatives</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Your contribution can make a significant difference in the lives of those in need. Join us in our mission to serve humanity.
          </p>
          <Link
            to="/donate"
            className="inline-block bg-saffron hover:bg-saffron/90 text-white px-8 py-3 rounded-md font-medium transition-colors"
          >
            Donate Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SocialService;
