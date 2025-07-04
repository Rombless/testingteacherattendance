/**
 * Home page component - Main teacher attendance dashboard
 */
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import AttendanceForm from '../components/AttendanceForm';
import AttendanceCard from '../components/AttendanceCard';
import AttendanceStats from '../components/AttendanceStats';
import { useAttendance } from '../hooks/useAttendance';
import { Search, Download, BarChart3, History, Home as HomeIcon } from 'lucide-react';

export default function Home() {
  const { records, isCheckedIn, todayCheckIn, checkIn, checkOut, getStats } = useAttendance();
  const [searchTerm, setSearchTerm] = useState('');
  const stats = getStats();

  const filteredRecords = records.filter(record =>
    record.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportData = () => {
    const csvContent = [
      ['Date', 'Check In', 'Check Out', 'Status', 'Total Hours'],
      ...records.map(record => [
        record.date,
        record.checkIn,
        record.checkOut || 'N/A',
        record.status,
        record.totalHours?.toFixed(2) || 'N/A'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'teacher-attendance.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <HomeIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Teacher Attendance System</h1>
          </div>
          <p className="text-gray-600">Track your daily attendance and monitor your teaching schedule</p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <HomeIcon className="w-4 h-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <History className="w-4 h-4" />
              <span>History</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <AttendanceForm
              onCheckIn={checkIn}
              onCheckOut={checkOut}
              isCheckedIn={isCheckedIn}
              todayCheckIn={todayCheckIn}
            />
            
            <AttendanceStats {...stats} />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <History className="w-5 h-5 text-blue-600" />
                  <span>Recent Attendance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {records.length > 0 ? (
                  <div className="grid gap-4">
                    {records.slice(0, 5).map(record => (
                      <AttendanceCard key={record.id} record={record} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <History className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No attendance records yet</h3>
                    <p className="text-gray-500">Check in to start tracking your attendance</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <History className="w-5 h-5 text-blue-600" />
                    <span>Attendance History</span>
                  </CardTitle>
                  <Button onClick={exportData} variant="outline" className="flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export CSV</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search by date or status..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {filteredRecords.length > 0 ? (
                  <div className="grid gap-4">
                    {filteredRecords.map(record => (
                      <AttendanceCard key={record.id} record={record} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <Search className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No records found</h3>
                    <p className="text-gray-500">Try adjusting your search criteria</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <AttendanceStats {...stats} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Days Present</span>
                      <span className="font-medium">{stats.presentDays}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Hours</span>
                      <span className="font-medium">{stats.totalHours.toFixed(1)}h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Attendance Rate</span>
                      <span className="font-medium">
                        {stats.totalDays > 0 ? ((stats.presentDays / stats.totalDays) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-1">Average Working Hours</h4>
                      <p className="text-sm text-green-600">
                        {stats.averageHours.toFixed(1)} hours per day
                      </p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-1">Consistency Score</h4>
                      <p className="text-sm text-blue-600">
                        {stats.totalDays > 0 ? ((stats.presentDays / stats.totalDays) * 100).toFixed(0) : 0}% attendance rate
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}