/**
 * AttendanceForm component for checking in and out
 */
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Clock, Calendar, LogIn, LogOut } from 'lucide-react';

interface AttendanceFormProps {
  onCheckIn: (time: string, date: string) => void;
  onCheckOut: (time: string, date: string) => void;
  isCheckedIn: boolean;
  todayCheckIn?: string;
}

export default function AttendanceForm({ 
  onCheckIn, 
  onCheckOut, 
  isCheckedIn, 
  todayCheckIn 
}: AttendanceFormProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useState(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCheckIn = () => {
    const now = new Date();
    onCheckIn(formatTime(now), formatDate(now));
  };

  const handleCheckOut = () => {
    const now = new Date();
    onCheckOut(formatTime(now), formatDate(now));
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <span>Teacher Attendance</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span className="text-lg font-medium text-gray-900">
              {formatDate(currentTime)}
            </span>
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-4">
            {formatTime(currentTime)}
          </div>
          
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Badge variant={isCheckedIn ? "default" : "secondary"}>
              {isCheckedIn ? 'Checked In' : 'Not Checked In'}
            </Badge>
            {todayCheckIn && (
              <span className="text-sm text-gray-600">
                Since {todayCheckIn}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          {!isCheckedIn ? (
            <Button 
              onClick={handleCheckIn}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
              size="lg"
            >
              <LogIn className="w-5 h-5" />
              <span>Check In</span>
            </Button>
          ) : (
            <Button 
              onClick={handleCheckOut}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700"
              size="lg"
            >
              <LogOut className="w-5 h-5" />
              <span>Check Out</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}