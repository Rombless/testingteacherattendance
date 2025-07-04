/**
 * TeacherCard component for displaying teacher information
 */
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Teacher } from '../types';
import { User, Mail, Phone, Building, Calendar, Edit, Trash2, UserCheck, UserX } from 'lucide-react';

interface TeacherCardProps {
  teacher: Teacher;
  onEdit: (teacher: Teacher) => void;
  onDelete: (id: string) => void;
  onCheckIn?: (teacher: Teacher) => void;
  onCheckOut?: (teacher: Teacher) => void;
  attendanceStatus?: {
    isCheckedIn: boolean;
    checkInTime: string;
  };
}

export default function TeacherCard({ 
  teacher, 
  onEdit, 
  onDelete, 
  onCheckIn, 
  onCheckOut, 
  attendanceStatus 
}: TeacherCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{teacher.name}</h3>
              <p className="text-sm text-gray-600">ID: {teacher.employeeId}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={teacher.isActive ? "default" : "secondary"}>
              {teacher.isActive ? 'Active' : 'Inactive'}
            </Badge>
            {attendanceStatus && (
              <Badge variant={attendanceStatus.isCheckedIn ? "default" : "outline"}>
                {attendanceStatus.isCheckedIn ? 'Checked In' : 'Not Checked In'}
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Building className="w-4 h-4" />
            <span>{teacher.department}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Mail className="w-4 h-4" />
            <span>{teacher.email}</span>
          </div>
          {teacher.phoneNumber && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{teacher.phoneNumber}</span>
            </div>
          )}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Joined: {new Date(teacher.joinDate).toLocaleDateString()}</span>
          </div>
        </div>

        {attendanceStatus?.isCheckedIn && (
          <div className="mb-4 p-2 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700">
              Checked in at {attendanceStatus.checkInTime}
            </p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(teacher)}>
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button variant="outline" size="sm" onClick={() => onDelete(teacher.id)}>
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </div>
          
          {onCheckIn && onCheckOut && teacher.isActive && (
            <div>
              {!attendanceStatus?.isCheckedIn ? (
                <Button size="sm" onClick={() => onCheckIn(teacher)} className="bg-green-600 hover:bg-green-700">
                  <UserCheck className="w-4 h-4 mr-1" />
                  Check In
                </Button>
              ) : (
                <Button size="sm" onClick={() => onCheckOut(teacher)} className="bg-red-600 hover:bg-red-700">
                  <UserX className="w-4 h-4 mr-1" />
                  Check Out
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}