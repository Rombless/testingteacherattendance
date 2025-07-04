/**
 * Custom hook for managing multi-teacher attendance data
 */
import { useState, useEffect } from 'react';
import { AttendanceRecord, Teacher } from '../types';

export function useMultiAttendance() {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  // Load attendance records from localStorage on mount
  useEffect(() => {
    const savedRecords = localStorage.getItem('multiTeacherAttendance');
    if (savedRecords) {
      setAttendanceRecords(JSON.parse(savedRecords));
    }
  }, []);

  // Save attendance records to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('multiTeacherAttendance', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  const checkInTeacher = (teacher: Teacher, time: string, date: string) => {
    const newRecord: AttendanceRecord = {
      id: `${teacher.id}-${Date.now()}`,
      teacherId: teacher.id,
      teacherName: teacher.name,
      date,
      checkIn: time,
      status: 'partial'
    };
    
    setAttendanceRecords(prev => [newRecord, ...prev]);
  };

  const checkOutTeacher = (teacherId: string, time: string, date: string) => {
    setAttendanceRecords(prev =>
      prev.map(record => {
        if (record.teacherId === teacherId && record.date === date && !record.checkOut) {
          const checkInTime = new Date(`${date} ${record.checkIn}`);
          const checkOutTime = new Date(`${date} ${time}`);
          const totalHours = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);
          
          return {
            ...record,
            checkOut: time,
            status: 'present' as const,
            totalHours
          };
        }
        return record;
      })
    );
  };

  const getTeacherTodayStatus = (teacherId: string, date: string) => {
    const todayRecord = attendanceRecords.find(
      record => record.teacherId === teacherId && record.date === date && !record.checkOut
    );
    
    return {
      isCheckedIn: !!todayRecord,
      checkInTime: todayRecord?.checkIn || ''
    };
  };

  const getTeacherRecords = (teacherId: string) => {
    return attendanceRecords.filter(record => record.teacherId === teacherId);
  };

  const getDailyAttendance = (date: string) => {
    return attendanceRecords.filter(record => record.date === date);
  };

  const getTeacherStats = (teacherId: string) => {
    const records = getTeacherRecords(teacherId);
    const totalDays = records.length;
    const presentDays = records.filter(r => r.status === 'present').length;
    const totalHours = records.reduce((sum, r) => sum + (r.totalHours || 0), 0);
    const averageHours = presentDays > 0 ? totalHours / presentDays : 0;

    return {
      totalDays,
      presentDays,
      totalHours,
      averageHours
    };
  };

  return {
    attendanceRecords,
    checkInTeacher,
    checkOutTeacher,
    getTeacherTodayStatus,
    getTeacherRecords,
    getDailyAttendance,
    getTeacherStats
  };
}