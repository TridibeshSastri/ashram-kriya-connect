
import { HandHeart, DollarSign, Users, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const DonateOption = ({ title, description, amount, icon: Icon }: {
  title: string;
  description: string;
  amount: string;
  icon: React.ElementType;
}) => (
  <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-cream rounded-full">
        <Icon className="h-6 w-6 text-saffron" />
      </div>
      <h3 className="text-xl font-semibold text-maroon">{title}</h3>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="flex items-center justify-between">
      <span className="text-lg font-semibold text-maroon">{amount}</span>
      <Button variant="outline" className="border-saffron text-saffron hover:bg-saffron hover:text-white">
        Donate Now
      </Button>
    </div>
  </div>
);

const Donate = () => {
  const donationOptions = [
    {
      title: "Temple Maintenance",
      description: "Support the upkeep and preservation of our sacred temple spaces and meditation halls.",
      amount: "₹1,100",
      icon: HandHeart
    },
    {
      title: "Anna Dānam Service",
      description: "Help us provide daily meals to devotees, visitors, and those in need through our food service program.",
      amount: "₹5,100",
      icon: Users
    },
    {
      title: "Spiritual Education",
      description: "Fund our spiritual education programs, workshops, and the publication of sacred texts.",
      amount: "₹2,100",
      icon: BookOpen
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container-custom">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <DollarSign className="h-12 w-12 text-saffron" />
          </div>
          <h1 className="text-4xl font-bold text-maroon mb-4">Support Our Mission</h1>
          <div className="w-24 h-1 bg-saffron mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-700">
            Your generous contributions help us maintain our spiritual practices, support our community services, 
            and continue spreading the teachings of Kriyayoga.
          </p>
        </div>

        {/* Donation Options */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {donationOptions.map((option, index) => (
            <DonateOption key={index} {...option} />
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-cream rounded-lg p-8 text-center">
          <h3 className="text-2xl font-semibold text-maroon mb-4">Other Ways to Contribute</h3>
          <p className="text-gray-700 mb-6">
            For larger donations, international wire transfers, or to discuss specific donation purposes, 
            please contact our office directly.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-maroon hover:bg-maroon/90 text-white px-8 py-3 rounded-md font-medium transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Donate;
