/**
 * AttendanceStats component for displaying attendance statistics
 */
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { CalendarDays, Clock, TrendingUp, Users } from 'lucide-react';

interface AttendanceStatsProps {
  totalDays: number;
  presentDays: number;
  totalHours: number;
  averageHours: number;
}

export default function AttendanceStats({ 
  totalDays, 
  presentDays, 
  totalHours, 
  averageHours 
}: AttendanceStatsProps) {
  const attendanceRate = totalDays > 0 ? (presentDays / totalDays) * 100 : 0;

  const stats = [
    {
      title: 'Total Days Reported',
      value: presentDays,
      icon: CalendarDays,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Attendance Rate',
      value: `${attendanceRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Total Hours',
      value: `${totalHours.toFixed(1)}h`,
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Average Hours/Day',
      value: `${averageHours.toFixed(1)}h`,
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {stat.value}
            </div>
            {stat.title === 'Attendance Rate' && (
              <Progress value={attendanceRate} className="h-2" />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}