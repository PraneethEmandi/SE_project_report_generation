
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { BarChart3, PieChart, Eye } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to the Student Reporting and Visualisation Platform
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              Dynamic reports and insights at your fingertips.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-student-600 hover:bg-student-700">
                  Get Started
                </Button>
              </Link>
              <Link to="/features">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="text-center p-6">
                <div className="mx-auto w-16 h-16 bg-student-100 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="h-8 w-8 text-student-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Sample Charts</h3>
                <p className="text-gray-600">
                  Visualize data effortlessly with our interactive charts.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="text-center p-6">
                <div className="mx-auto w-16 h-16 bg-student-100 rounded-full flex items-center justify-center mb-4">
                  <PieChart className="h-8 w-8 text-student-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Sample Graphs</h3>
                <p className="text-gray-600">
                  Discover actionable insights through our dynamic graphs.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="text-center p-6">
                <div className="mx-auto w-16 h-16 bg-student-100 rounded-full flex items-center justify-center mb-4">
                  <Eye className="h-8 w-8 text-student-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Visualization</h3>
                <p className="text-gray-600">
                  Transform complex data into clear insights with our advanced visualizations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© 2023 Student Platform. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/about" className="hover:text-student-300">About</Link>
              <Link to="/features" className="hover:text-student-300">Features</Link>
              <Link to="/contact" className="hover:text-student-300">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
