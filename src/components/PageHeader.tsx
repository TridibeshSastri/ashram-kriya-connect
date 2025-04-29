
interface PageHeaderProps {
  title: string;
  description: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <section className="pt-32 pb-16 bg-cream relative overflow-hidden">
      <div className="absolute inset-0 bg-om-pattern bg-repeat opacity-5"></div>
      <div className="container-custom relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-maroon mb-4">{title}</h1>
        <div className="divider w-1/2 max-w-md mx-auto">
          <span className="om-symbol">ॐ</span>
        </div>
        <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
          {description}
        </p>
      </div>
    </section>
  );
};

export default PageHeader;
