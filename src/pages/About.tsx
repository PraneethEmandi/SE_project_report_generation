
import Header from '@/components/Header';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">About Us</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              Our mission is to empower educational institutions with data-driven insights that help improve student outcomes.
              We believe that by making data accessible and understandable, we can help educators make better decisions and provide better support to students.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
            <p className="text-gray-700 mb-6">
              The Student Reporting and Visualization Platform was built by a team of educators and developers who understand the unique needs of educational institutions.
              Our platform is designed to be intuitive, powerful, and flexible, allowing you to customize it to your specific needs.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-semibold text-lg">Comprehensive Data Analytics</h3>
                <p className="text-gray-700">Access comprehensive analytics about student performance, placement data, and event participation.</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-semibold text-lg">Customizable Reports</h3>
                <p className="text-gray-700">Create and customize reports that matter to your institution, from accreditation reports to department-wise analysis.</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-semibold text-lg">Interactive Visualizations</h3>
                <p className="text-gray-700">Transform complex data into clear, actionable insights with our interactive visualization tools.</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-semibold text-lg">Query Builder</h3>
                <p className="text-gray-700">Build custom queries to extract exactly the data you need, no technical knowledge required.</p>
              </div>
            </div>
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

export default About;
