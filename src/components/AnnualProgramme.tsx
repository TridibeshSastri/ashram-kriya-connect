
import { ReactNode } from 'react';

interface ProgrammeItem {
  date: string;
  description: string;
}

interface ProgrammeSection {
  title: string;
  items: ProgrammeItem[];
}

const ProgrammeSection = ({ title, items }: ProgrammeSection) => (
  <div>
    <h3 className="font-bold text-xl text-maroon mb-4">{title}</h3>
    <div className="space-y-4">
      {items.map((item, index) => (
        <div className="flex" key={index}>
          <div className="w-36 font-medium text-saffron">{item.date}</div>
          <div>{item.description}</div>
        </div>
      ))}
    </div>
  </div>
);

const AnnualProgramme = () => {
  const programmeSections = [
    {
      title: "January - March",
      items: [
        { date: "January 14", description: "Makar Sankranti Celebration & Khichdi Distribution" },
        { date: "February 18", description: "Maha Shivaratri - All Night Vigil & Meditation" },
        { date: "March 1-7", description: "Spring Kriyayoga Initiation Week" },
        { date: "March 25", description: "Holi Celebrations with Spiritual Music" },
      ]
    },
    {
      title: "April - June",
      items: [
        { date: "April 14", description: "Bengali New Year Celebrations" },
        { date: "May 15-21", description: "Summer Kriyayoga Retreat" },
        { date: "June 1", description: "Anniversary of Ashram Foundation" },
        { date: "June 21", description: "International Yoga Day - Special Sessions" },
      ]
    },
    {
      title: "July - September",
      items: [
        { date: "July 21", description: "Guru Pūrṇimā Celebration" },
        { date: "August 15", description: "Janmāṣṭamī - Lord Krishna's Birthday" },
        { date: "September 9", description: "Ganesh Chaturthi Celebrations" },
        { date: "September 21", description: "Annual World Peace Yajna" },
      ]
    },
    {
      title: "October - December",
      items: [
        { date: "October 12", description: "Navarātri Celebrations Begin" },
        { date: "October 31", description: "Kali Pūjā" },
        { date: "November 12", description: "Diwali Celebrations & Meditation for Inner Light" },
        { date: "December 24-31", description: "Year-End Spiritual Retreat & New Year's Eve Meditation" },
      ]
    },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="space-y-8">
        {programmeSections.map((section, index) => (
          <ProgrammeSection
            key={index}
            title={section.title}
            items={section.items}
          />
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-gray-700 italic">
          <span className="font-medium">Note:</span> Dates may vary slightly based on astronomical calculations. Monthly events like Kumbhabhiṣeka and Yajna are conducted on the first Sunday and last Sunday of each month respectively.
        </p>
      </div>
    </div>
  );
};

export default AnnualProgramme;
