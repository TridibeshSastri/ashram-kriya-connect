
export interface Event {
  title: string;
  date: string;
  image: string;
  location: string;
  category: string;
  category2?: string;
  description: string;
  link?: string;
  availableSeats?: number;
}

export const getEvents = (): Event[] => {
  return [
    {
      title: "Kriyayoga Initiation",
      date: "May 15, 2025",
      image: "/images/initiation.jpg",
      location: "Main Temple Hall",
      category: "Initiations",
      description: "Sacred initiation ceremony for new seekers guided by our Guruji. Learn the powerful techniques of Kriyayoga meditation.",
      link: "/events/kriyayoga-initiation",
      availableSeats: 35
    },
    {
      title: "Guru Pūrṇimā Celebration",
      date: "July 21, 2025",
      image: "/images/guru-purnima.jpg",
      location: "Ashram Grounds",
      category: "Festivals",
      description: "Annual celebration honoring the Guru lineage with special pujas, bhajans, and spiritual discourses throughout the day.",
      link: "/events/guru-purnima",
      availableSeats: 120
    },
    {
      title: "Monthly Yajna",
      date: "April 30, 2025",
      image: "/images/yajna.jpg",
      location: "Yajna Shala",
      category: "Yajnas",
      category2: "Monthly",
      description: "Sacred fire ceremony for purification and spiritual upliftment, followed by prasad distribution.",
      link: "/events/monthly-yajna",
      availableSeats: 50
    },
    {
      title: "Janmāṣṭamī Celebration",
      date: "August 15, 2025",
      image: "/images/janmashtami.jpg",
      location: "Krishna Temple",
      category: "Festivals",
      description: "Celebrate the divine birth of Lord Krishna with all-night bhajans, readings from the Bhagavad Gita, and special prasad.",
      link: "/events/janmashtami",
      availableSeats: 80
    },
    {
      title: "Advanced Kriyayoga Retreat",
      date: "June 1-7, 2025",
      image: "/images/retreat.jpg",
      location: "Meditation Hall & Grounds",
      category: "Initiations",
      description: "A week-long intensive retreat for initiated Kriyayoga practitioners to deepen their practice under Guruji's guidance.",
      link: "/events/advanced-retreat",
      availableSeats: 25
    },
    {
      title: "Monthly Kumbhabhiṣeka",
      date: "May 1, 2025",
      image: "/images/kumbhabhisheka.jpg",
      location: "Main Temple",
      category: "Kumbhabhiṣeka",
      category2: "Monthly",
      description: "Sacred ritual of bathing the temple deities with sanctified water, milk, honey, and other auspicious substances.",
      link: "/events/kumbhabhisheka-may",
      availableSeats: 40
    },
    {
      title: "Kali Pūjā",
      date: "October 31, 2025",
      image: "/images/kali-puja.jpg",
      location: "Kali Temple",
      category: "Festivals",
      description: "Special night-long worship of Divine Mother Kali, representing the cosmic power of transformation.",
      link: "/events/kali-puja",
      availableSeats: 60
    },
    {
      title: "Monthly Spiritual Discourse",
      date: "May 10, 2025",
      image: "/images/discourse.jpg",
      location: "Lecture Hall",
      category: "Monthly",
      description: "Guruji shares wisdom from sacred texts and answers spiritual questions from devotees and seekers.",
      link: "/events/may-discourse",
      availableSeats: 75
    },
    {
      title: "Annual Yajna for World Peace",
      date: "September 21, 2025",
      image: "/images/world-peace-yajna.jpg",
      location: "Main Yajna Shala",
      category: "Yajnas",
      description: "A grand ceremonial fire ritual performed for universal harmony and peace, with participation from all devotees.",
      link: "/events/world-peace-yajna",
      availableSeats: 100
    }
  ];
};

export const getEventCategories = (): string[] => {
  return ['All', 'Initiations', 'Yajnas', 'Festivals', 'Kumbhabhiṣeka', 'Monthly'];
};
