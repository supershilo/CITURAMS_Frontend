import { ArrowPathIcon, MapPinIcon, ClipboardDocumentListIcon, HandThumbUpIcon} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Efficient Request Management',
    description:
      'Streamline the process of submitting maintenance and repair requests with our user-friendly interface.',
    icon: ClipboardDocumentListIcon,
  },
  {
    name: 'Transparent Status Tracking',
    description:
      'Stay informed about the status of your requests from submission to resolution, ensuring transparency and accountability.',
    icon: MapPinIcon,
  },
  {
    name: 'Equipment Inventory Management',
    description:
      'Effectively manage and update equipment details to maintain an organized inventory.',
    icon: ArrowPathIcon,
  },
  {
    name: 'User-Friendly Interface',
    description:
      'Enjoy a hassle-free user experience with our intuitive and easy-to-navigate design.',
    icon: HandThumbUpIcon,
  },
];

const FeatureSection = () => {
  return (
    <div className="bg-white pb-24 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto lg:text-center">
          <p className="text-3xl font-bold tracking-tight text-gray-900">
            Discover the comprehensive services offered by us
          </p>
          <p className="mx-auto max-w-2xl mt-6 text-lg leading-8 lg:text-center text-gray-600">
          Explore these services to optimize your equipment maintenance and repair workflow, making this the ideal solution for our school community.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg" style={{backgroundColor: "#FC3031"}}>
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
