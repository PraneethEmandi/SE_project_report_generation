
import { BarChart3, PieChart, Eye, Presentation, LineChart, AlertCircle, Code, FileBarChart2, Search, BookOpen } from 'lucide-react';
import Header from '@/components/Header';

const FeatureCard = ({ title, description, icon }: { title: string; description: string; icon: JSX.Element }) => (
  <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
    <div className="w-12 h-12 rounded-full bg-student-100 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      title: "Data Visualization",
      description: "Transform complex data sets into clear, actionable visualizations.",
      icon: <Eye className="h-6 w-6 text-student-600" />
    },
    {
      title: "Placement Analytics",
      description: "Track and analyze student placements with detailed metrics and trends.",
      icon: <BarChart3 className="h-6 w-6 text-student-600" />
    },
    {
      title: "Event Tracking",
      description: "Monitor student participation across various events and activities.",
      icon: <PieChart className="h-6 w-6 text-student-600" />
    },
    {
      title: "Interactive Reports",
      description: "Generate customizable reports for different departments and stakeholders.",
      icon: <FileBarChart2 className="h-6 w-6 text-student-600" />
    },
    {
      title: "Query Builder",
      description: "Create custom queries without technical knowledge to extract specific data.",
      icon: <Code className="h-6 w-6 text-student-600" />
    },
    {
      title: "Real-time Updates",
      description: "Get instant notifications about important changes and developments.",
      icon: <AlertCircle className="h-6 w-6 text-student-600" />
    },
    {
      title: "Trend Analysis",
      description: "Identify patterns and trends in student data over time.",
      icon: <LineChart className="h-6 w-6 text-student-600" />
    },
    {
      title: "Administrative Tools",
      description: "Comprehensive tools for academic administrators and decision makers.",
      icon: <Presentation className="h-6 w-6 text-student-600" />
    },
    {
      title: "Advanced Search",
      description: "Find specific information quickly with our powerful search capabilities.",
      icon: <Search className="h-6 w-6 text-student-600" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Our Features</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how our platform can transform your institution's data management and reporting capabilities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
          
          <div className="mt-16 bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to transform your data experience?</h2>
            <p className="text-gray-600 mb-6">
              Join thousands of educational institutions already benefiting from our platform.
            </p>
            <button className="bg-student-600 hover:bg-student-700 text-white font-medium py-2 px-6 rounded-md transition-colors">
              Get Started Today
            </button>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <p className="text-center">© 2023 Student Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Features;
