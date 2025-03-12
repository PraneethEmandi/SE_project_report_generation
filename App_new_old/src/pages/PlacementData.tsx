
import { Briefcase, TrendingUp } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/StatCard';
import ChartCard from '@/components/ChartCard';
import TableCard from '@/components/TableCard';
import FilterBar from '@/components/FilterBar';
import UpdatesCard from '@/components/UpdatesCard';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts';

const placementLineData = [
  { month: 'Jan', placements: 45, interviews: 62 },
  { month: 'Feb', placements: 52, interviews: 70 },
  { month: 'Mar', placements: 48, interviews: 65 },
  { month: 'Apr', placements: 70, interviews: 85 },
  { month: 'May', placements: 55, interviews: 78 },
  { month: 'Jun', placements: 60, interviews: 82 },
];

const companyData = [
  { name: 'Salesforce', value: 28 },
  { name: 'Google', value: 24 },
  { name: 'Microsoft', value: 20 },
  { name: 'Amazon', value: 18 },
  { name: 'Apple', value: 16 },
  { name: 'Facebook', value: 14 },
  { name: 'Netflix', value: 12 },
  { name: 'Adobe', value: 10 },
];

const placementDetails = [
  { id: 1, name: 'Praneeth', company: 'Salesforce', status: 'Placed' },
  { id: 2, name: 'Abhishek', company: 'TechM', status: 'Placed' },
  { id: 3, name: 'Praval', company: 'NPCI', status: 'Placed' },
  { id: 4, name: 'Jane Smith', company: 'Amazon', status: 'Awaiting' },
];

const updates = [
  { id: '1', text: 'Google offered a package of $150k to Alice Johnson' },
  { id: '2', text: 'The placement rate has increased significantly over last 5 days' },
  { id: '3', text: 'John Smith accepted the offer from Google' },
  { id: '4', text: 'Jane Doe rejected the offer from Amazon' },
];

const filters = [
  { label: 'Company', options: ['All', 'Google', 'Microsoft', 'Amazon', 'Apple'] },
  { label: 'Department', options: ['All', 'CSE', 'ECE', 'EEE', 'Mechanical', 'Civil'] },
  { label: 'Year', options: ['2023', '2022', '2021', '2020'] },
  { label: 'Visualisation', options: ['Bar Chart', 'Line Chart', 'Pie Chart'] },
];

const PlacementData = () => {
  return (
    <DashboardLayout title="Placement Overview">
      <div className="space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            title="Placement Rate"
            value="85%"
            icon={<Briefcase size={24} />}
            className="bg-gray-200"
          />
          <StatCard
            title="Internship Conversion Rate"
            value="65%"
            icon={<TrendingUp size={24} />}
            className="bg-gray-200"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard title="Placements Trends Line Chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={placementLineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="placements"
                  stroke="#0070FF"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="interviews" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <TableCard title="Placement Details">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {placementDetails.map((detail) => (
                    <tr key={detail.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {detail.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {detail.company}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            detail.status === 'Placed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {detail.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TableCard>
        </div>

        {/* Company Analysis */}
        <div>
          <h3 className="text-lg font-medium mb-4">Company-Wise Analysis</h3>
          <ChartCard title="Top recruiters">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={companyData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Bar dataKey="value" fill="#0070FF" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Trends & Filters */}
        <div>
          <h3 className="text-lg font-medium mb-4">Trends</h3>
          <FilterBar filters={filters} />
        </div>

        {/* Real-time Updates */}
        <UpdatesCard title="Real Time Updates" updates={updates} />
      </div>
    </DashboardLayout>
  );
};

export default PlacementData;
