
import { BarChart3, PieChart, BookOpen } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/StatCard';
import ChartCard from '@/components/ChartCard';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';

const placementData = [
  { name: 'Jan', count: 12 },
  { name: 'Feb', count: 18 },
  { name: 'Mar', count: 15 },
  { name: 'Apr', count: 20 },
  { name: 'May', count: 25 },
  { name: 'Jun', count: 17 },
];

const eventData = [
  { name: 'Technical', value: 45 },
  { name: 'Cultural', value: 25 },
  { name: 'Professional', value: 30 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const gpaData = [
  { name: 'CS', gpa: 3.7 },
  { name: 'EE', gpa: 3.5 },
  { name: 'ME', gpa: 3.3 },
  { name: 'CE', gpa: 3.6 },
  { name: 'IT', gpa: 3.4 },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Total Placements" 
          value="120" 
          icon={<BarChart3 size={24} />} 
        />
        <StatCard 
          title="Event Participation" 
          value="300" 
          icon={<PieChart size={24} />} 
        />
        <StatCard 
          title="GPA Trends" 
          value="3.5" 
          icon={<BookOpen size={24} />} 
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ChartCard title="Placement Trends">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={placementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#0070FF" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        
        <ChartCard title="Event Participation">
          <ResponsiveContainer width="100%" height={200}>
            <RePieChart>
              <Pie
                data={eventData}
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {eventData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
        </ChartCard>
        
        <ChartCard title="GPA Distribution">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={gpaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[3, 4]} />
              <Tooltip />
              <Line type="monotone" dataKey="gpa" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
