/**
 * DailyAttendanceView component for viewing all teachers' attendance for a specific day
 */
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Teacher, AttendanceRecord } from '../types';
import { Calendar, Users, Clock, Download, Search } from 'lucide-react';

interface DailyAttendanceViewProps {
  teachers: Teacher[];
  attendanceRecords: AttendanceRecord[];
}

export default function DailyAttendanceView({ teachers, attendanceRecords }: DailyAttendanceViewProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDailyAttendanceData = () => {
    const dateFormatted = formatDate(selectedDate);
    
    return teachers
      .filter(teacher => 
        teacher.isActive && 
        (teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         teacher.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
         teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .map(teacher => {
        const attendance = attendanceRecords.find(
          record => record.teacherId === teacher.id && record.date === dateFormatted
        );
        
        return {
          teacher,
          attendance
        };
      });
  };

  const dailyData = getDailyAttendanceData();
  const presentCount = dailyData.filter(item => item.attendance?.status === 'present').length;
  const partialCount = dailyData.filter(item => item.attendance?.status === 'partial').length;
  const absentCount = dailyData.filter(item => !item.attendance).length;

  const exportDailyReport = () => {
    const csvContent = [
      ['Teacher Name', 'Employee ID', 'Department', 'Check In', 'Check Out', 'Status', 'Total Hours'],
      ...dailyData.map(item => [
        item.teacher.name,
        item.teacher.employeeId,
        item.teacher.department,
        item.attendance?.checkIn || 'Not recorded',
        item.attendance?.checkOut || 'Not recorded',
        item.attendance?.status || 'Absent',
        item.attendance?.totalHours?.toFixed(2) || '0'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `daily-attendance-${selectedDate}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>Daily Attendance Overview</span>
            </CardTitle>
            <Button onClick={exportDailyReport} variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="max-w-xs"
              />
            </div>
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search teachers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-blue-600">Total Teachers</p>
                    <p className="text-2xl font-bold text-blue-700">{dailyData.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-green-600">Present</p>
                    <p className="text-2xl font-bold text-green-700">{presentCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-sm text-yellow-600">Partial</p>
                    <p className="text-2xl font-bold text-yellow-700">{partialCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-sm text-red-600">Absent</p>
                    <p className="text-2xl font-bold text-red-700">{absentCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Attendance for {formatDate(selectedDate)}
            </h3>
            
            {dailyData.length > 0 ? (
              <div className="grid gap-4">
                {dailyData.map(({ teacher, attendance }) => (
                  <Card key={teacher.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{teacher.name}</h4>
                            <p className="text-sm text-gray-600">
                              {teacher.employeeId} • {teacher.department}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          {attendance ? (
                            <>
                              <div className="text-sm">
                                <p className="text-gray-600">Check In: <span className="font-medium">{attendance.checkIn}</span></p>
                                {attendance.checkOut && (
                                  <p className="text-gray-600">Check Out: <span className="font-medium">{attendance.checkOut}</span></p>
                                )}
                                {attendance.totalHours && (
                                  <p className="text-gray-600">Hours: <span className="font-medium">{attendance.totalHours.toFixed(1)}h</span></p>
                                )}
                              </div>
                              <Badge 
                                variant={attendance.status === 'present' ? 'default' : 
                                        attendance.status === 'partial' ? 'secondary' : 'destructive'}
                              >
                                {attendance.status === 'present' ? 'Present' : 
                                 attendance.status === 'partial' ? 'Checked In' : 'Absent'}
                              </Badge>
                            </>
                          ) : (
                            <Badge variant="outline">Absent</Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No teachers found</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}