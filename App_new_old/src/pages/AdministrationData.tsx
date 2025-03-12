
import { FileBarChart2, Download, CheckCircle2 } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import ChartCard from '@/components/ChartCard';
import FilterBar from '@/components/FilterBar';
import { useToast } from '@/components/ui/use-toast';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const gpaData = [
  { department: 'CSE', gpa: 3.8 },
  { department: 'ECE', gpa: 3.6 },
  { department: 'EEE', gpa: 3.5 },
  { department: 'ME', gpa: 3.4 },
  { department: 'CE', gpa: 3.3 },
  { department: 'IT', gpa: 3.7 },
];

const placementData = [
  { department: 'CSE', rate: 92 },
  { department: 'ECE', rate: 85 },
  { department: 'EEE', rate: 78 },
  { department: 'ME', rate: 70 },
  { department: 'CE', rate: 65 },
  { department: 'IT', rate: 88 },
];

const eventParticipationData = [
  { name: 'CSE', value: 35 },
  { name: 'ECE', value: 25 },
  { name: 'EEE', value: 15 },
  { name: 'ME', value: 10 },
  { name: 'CE', value: 8 },
  { name: 'IT', value: 7 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B'];

const filters = [
  { label: 'Department', options: ['All', 'CSE', 'ECE', 'EEE', 'Mechanical', 'Civil'] },
  { label: 'Year', options: ['2023', '2022', '2021', '2020'] },
  { label: 'Visualisation', options: ['Bar Chart', 'Line Chart', 'Pie Chart'] },
];

const AdministrationData = () => {
  const { toast } = useToast();
  
  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Your report has been generated and is ready for download.",
    });
  };

  return (
    <DashboardLayout title="Accreditation Reports">
      <div className="space-y-8">
        {/* Report Generation Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-gray-700 mb-2">
            Generate and download accreditation reports with customizable reports for NAAC, NBA
          </p>
          
          <ul className="list-disc list-inside mb-4 text-gray-600">
            <li className="mb-1">
              Metrics included: Placement rates, Academic performances, Event participation
            </li>
            <li>Export options: PDF, Excel, Powerpoint</li>
          </ul>
          
          <Button 
            onClick={handleGenerateReport}
            className="flex items-center bg-student-600 hover:bg-student-700"
          >
            <FileBarChart2 className="mr-2 h-4 w-4" /> Generate report
          </Button>
        </div>
        
        {/* Department Analysis Section */}
        <div>
          <h3 className="text-xl font-medium mb-6">Department-wise Analysis</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* GPA Trends */}
            <ChartCard title="GPA Trends">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={gpaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis domain={[3, 4]} />
                  <Tooltip />
                  <Bar dataKey="gpa" fill="#FFD700" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            
            {/* Placement Rates */}
            <ChartCard title="Placement Rates">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={placementData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis type="category" dataKey="department" />
                  <Tooltip />
                  <Bar dataKey="rate" fill="#FF7F50">
                    {placementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.rate > 80 ? '#4CAF50' : '#FF7F50'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
            
            {/* Event Participation */}
            <ChartCard title="Event Participation">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={eventParticipationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {eventParticipationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>
        
        {/* Academic Performance Trends */}
        <div>
          <h3 className="text-xl font-medium mb-4">Academic Performance Trends</h3>
          <FilterBar filters={filters} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdministrationData;








/*

import { FileBarChart2, Download, CheckCircle2 } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import ChartCard from '@/components/ChartCard';
import FilterBar from '@/components/FilterBar';
import { useToast } from '@/components/ui/use-toast';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  */

  
/*

import { FileBarChart2, Download, CheckCircle2 } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import ChartCard from '@/components/ChartCard';
import FilterBar from '@/components/FilterBar';
import { useToast } from '@/components/ui/use-toast';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  */
