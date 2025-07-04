/**
 * Type definitions for the teacher attendance system
 */

export interface Teacher {
  id: string;
  name: string;
  email: string;
  department: string;
  employeeId: string;
  phoneNumber?: string;
  joinDate: string;
  isActive: boolean;
}

export interface AttendanceRecord {
  id: string;
  teacherId: string;
  teacherName: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'partial';
  totalHours?: number;
  notes?: string;
}

export interface DailyAttendance {
  date: string;
  teachers: {
    teacher: Teacher;
    attendance?: AttendanceRecord;
  }[];
}