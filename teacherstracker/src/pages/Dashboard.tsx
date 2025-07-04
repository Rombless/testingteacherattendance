/**
 * Dashboard page component - Overview of attendance system
 */
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useTeachers } from '../hooks/useTeachers';
import { useMultiAttendance } from '../hooks/useMultiAttendance';
import { Users, Calendar, Clock, TrendingUp, UserCheck, UserX } from 'lucide-react';

export default function Dashboard() {
  const { teachers } = useTeachers();
  const { attendanceRecords, getDailyAttendance } = useMultiAttendance();

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const todayAttendance = getDailyAttendance(today);
  const activeTeachers = teachers.filter(t => t.isActive);
  const presentToday = todayAttendance.filter(record => record.status === 'present').length;
  const partialToday = todayAttendance.filter(record => record.status === 'partial').length;
  const totalHoursToday = todayAttendance.reduce((sum, record) => sum + (record.totalHours || 0), 0);

  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthlyRecords = attendanceRecords.filter(record => record.date.includes(thisMonth.replace('-', ' ')));
  const monthlyHours = monthlyRecords.reduce((sum, record) => sum + (record.totalHours || 0), 0);

  const stats = [
    {
      title: 'Total Teachers',
      value: activeTeachers.length,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Present Today',
      value: presentToday + partialToday,
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Today\'s Hours',
      value: `${totalHoursToday.toFixed(1)}h`,
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Monthly Hours',
      value: `${monthlyHours.toFixed(1)}h`,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const recentAttendance = attendanceRecords
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
        <p className="text-gray-600">Overview of teacher attendance system</p>
      </div>

      {/* Statistics */}
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
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Attendance Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>Today's Attendance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Active Teachers</span>
                <span className="font-medium">{activeTeachers.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Present (Completed)</span>
                <span className="font-medium text-green-600">{presentToday}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Checked In</span>
                <span className="font-medium text-yellow-600">{partialToday}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Absent</span>
                <span className="font-medium text-red-600">
                  {activeTeachers.length - presentToday - partialToday}
                </span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Attendance Rate</span>
                  <span className="font-medium">
                    {activeTeachers.length > 0 
                      ? ((presentToday + partialToday) / activeTeachers.length * 100).toFixed(1)
                      : 0}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Attendance Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentAttendance.length > 0 ? (
              <div className="space-y-4">
                {recentAttendance.map(record => (
                  <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{record.teacherName}</p>
                      <p className="text-sm text-gray-600">{record.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        {record.status === 'present' ? (
                          <UserCheck className="w-4 h-4 text-green-600" />
                        ) : record.status === 'partial' ? (
                          <Clock className="w-4 h-4 text-yellow-600" />
                        ) : (
                          <UserX className="w-4 h-4 text-red-600" />
                        )}
                        <span className="text-sm capitalize text-gray-600">
                          {record.status}
                        </span>
                      </div>
                      {record.totalHours && (
                        <p className="text-sm text-gray-500">
                          {record.totalHours.toFixed(1)}h
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">No recent attendance activity</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <Users className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-medium text-gray-900">Manage Teachers</h3>
              <p className="text-sm text-gray-600">Add, edit, or remove teachers</p>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <Calendar className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-medium text-gray-900">Daily Attendance</h3>
              <p className="text-sm text-gray-600">View today's attendance status</p>
            </div>
            
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <TrendingUp className="w-8 h-8 text-purple-600 mb-2" />
              <h3 className="font-medium text-gray-900">Reports</h3>
              <p className="text-sm text-gray-600">Generate attendance reports</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}