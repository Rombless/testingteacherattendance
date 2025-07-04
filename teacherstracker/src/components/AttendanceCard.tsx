/**
 * AttendanceCard component for displaying individual attendance records
 */
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, Calendar, CheckCircle, XCircle } from 'lucide-react';

interface AttendanceRecord {
  id: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'partial';
  totalHours?: number;
}

interface AttendanceCardProps {
  record: AttendanceRecord;
}

export default function AttendanceCard({ record }: AttendanceCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'absent': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="font-medium text-gray-900">{record.date}</span>
          </div>
          <Badge className={getStatusColor(record.status)}>
            <div className="flex items-center space-x-1">
              {getStatusIcon(record.status)}
              <span className="capitalize">{record.status}</span>
            </div>
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <div>
              <p className="text-gray-500">Check In</p>
              <p className="font-medium">{record.checkIn}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-orange-500" />
            <div>
              <p className="text-gray-500">Check Out</p>
              <p className="font-medium">{record.checkOut || 'Not recorded'}</p>
            </div>
          </div>
        </div>
        
        {record.totalHours && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-sm text-gray-600">
              Total Hours: <span className="font-medium text-gray-900">{record.totalHours.toFixed(1)}h</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}