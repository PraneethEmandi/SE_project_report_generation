
import { Calendar, Users, Briefcase } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/StatCard';
import ChartCard from '@/components/ChartCard';
import TableCard from '@/components/TableCard';
import FilterBar from '@/components/FilterBar';
import {
  LineChart,
  Line,
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

const eventsLineData = [
  { month: 'Jan', technical: 15, cultural: 10, professional: 8 },
  { month: 'Feb', technical: 12, cultural: 18, professional: 11 },
  { month: 'Mar', technical: 18, cultural: 14, professional: 9 },
  { month: 'Apr', technical: 20, cultural: 12, professional: 7 },
  { month: 'May', technical: 25, cultural: 16, professional: 12 },
  { month: 'Jun', technical: 22, cultural: 20, professional: 14 },
];

const departmentData = [
  { name: 'CSE', value: 35 },
  { name: 'ECE', value: 25 },
  { name: 'EEE', value: 15 },
  { name: 'ME', value: 10 },
  { name: 'CE', value: 8 },
  { name: 'IT', value: 7 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B'];

const eventTimeline = [
  { id: 1, date: '03-01-2025', type: 'Technical', name: 'CodeJam' },
  { id: 2, date: '26-10-2024', type: 'Cultural', name: 'Ragam' },
  { id: 3, date: '01-01-2024', type: 'Technical', name: 'Tathva' },
  { id: 4, date: '31-12-2024', type: 'Cultural', name: 'Navarangam' },
];

const filters = [
  { label: 'Events', options: ['All', 'Technical', 'Cultural', 'Professional'] },
  { label: 'Department', options: ['All', 'CSE', 'ECE', 'EEE', 'Mechanical', 'Civil'] },
  { label: 'Year', options: ['2023', '2022', '2021', '2020'] },
  { label: 'Visualisation', options: ['Bar Chart', 'Line Chart', 'Pie Chart'] },
];

const EventsData = () => {
  return (
    <DashboardLayout title="Participation Metrics">
      <div className="space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Technical Events"
            value="200"
            icon={<Briefcase size={24} />}
            className="bg-gray-200"
          />
          <StatCard
            title="Cultural Events"
            value="120"
            icon={<Calendar size={24} />}
            className="bg-gray-200"
          />
          <StatCard
            title="Professional Events"
            value="100"
            icon={<Users size={24} />}
            className="bg-gray-200"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard title="Events Trends Line Chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={eventsLineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="technical"
                  stroke="#0070FF"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="cultural" stroke="#FF6B6B" />
                <Line type="monotone" dataKey="professional" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <TableCard title="Event Timeline">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event Name
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {eventTimeline.map((event) => (
                    <tr key={event.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {event.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            event.type === 'Technical'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {event.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TableCard>
        </div>

        {/* Department Participation */}
        <div>
          <h3 className="text-lg font-medium mb-4">Department-wise Participation</h3>
          <ChartCard title="">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Trends & Filters */}
        <div>
          <h3 className="text-lg font-medium mb-4">Trends</h3>
          <FilterBar filters={filters} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EventsData;
