
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Download, FileText, FileSpreadsheet, ImageIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const departmentData = [
  { name: 'CSE', value: 35 },
  { name: 'ECE', value: 25 },
  { name: 'EEE', value: 15 },
  { name: 'ME', value: 10 },
  { name: 'CE', value: 8 },
  { name: 'IT', value: 7 },
];

const placementPercentageData = [
  { department: 'CSE', percentage: 92 },
  { department: 'ECE', percentage: 85 },
  { department: 'IT', percentage: 88 },
  { department: 'ME', percentage: 70 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B'];

const QueryResults = () => {
  const { toast } = useToast();
  
  const handleExport = (format: string) => {
    toast({
      title: `Exported as ${format}`,
      description: `Your results have been exported as ${format}.`,
    });
  };

  return (
    <DashboardLayout title="Query Results">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">Department Distribution</h3>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">Percentage of Placements</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={placementPercentageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="percentage" fill="#0070FF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Export Options */}
        <div className="flex flex-wrap justify-center gap-4 pt-6">
          <Button
            onClick={() => handleExport('PDF')}
            variant="default"
            className="bg-black hover:bg-gray-800"
          >
            <FileText className="mr-2 h-4 w-4" /> Export as PDF
          </Button>
          
          <Button
            onClick={() => handleExport('Excel')}
            variant="default"
            className="bg-black hover:bg-gray-800"
          >
            <FileSpreadsheet className="mr-2 h-4 w-4" /> Export as Excel
          </Button>
          
          <Button
            onClick={() => handleExport('PNG')}
            variant="default"
            className="bg-black hover:bg-gray-800"
          >
            <ImageIcon className="mr-2 h-4 w-4" /> Export as PNG
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default QueryResults;
