/**
 * Custom hook for managing attendance data
 */
import { useState, useEffect } from 'react';

interface AttendanceRecord {
  id: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'partial';
  totalHours?: number;
}

export function useAttendance() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [todayCheckIn, setTodayCheckIn] = useState<string>('');

  // Load data from localStorage on mount
  useEffect(() => {
    const savedRecords = localStorage.getItem('teacherAttendance');
    const savedCheckedIn = localStorage.getItem('isCheckedIn');
    const savedTodayCheckIn = localStorage.getItem('todayCheckIn');
    
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }
    
    if (savedCheckedIn) {
      setIsCheckedIn(JSON.parse(savedCheckedIn));
    }
    
    if (savedTodayCheckIn) {
      setTodayCheckIn(savedTodayCheckIn);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('teacherAttendance', JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem('isCheckedIn', JSON.stringify(isCheckedIn));
  }, [isCheckedIn]);

  useEffect(() => {
    localStorage.setItem('todayCheckIn', todayCheckIn);
  }, [todayCheckIn]);

  const checkIn = (time: string, date: string) => {
    const newRecord: AttendanceRecord = {
      id: Date.now().toString(),
      date,
      checkIn: time,
      status: 'partial'
    };
    
    setRecords(prev => [newRecord, ...prev]);
    setIsCheckedIn(true);
    setTodayCheckIn(time);
  };

  const checkOut = (time: string, date: string) => {
    setRecords(prev => 
      prev.map(record => {
        if (record.date === date && !record.checkOut) {
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
    
    setIsCheckedIn(false);
    setTodayCheckIn('');
  };

  const getStats = () => {
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
    records,
    isCheckedIn,
    todayCheckIn,
    checkIn,
    checkOut,
    getStats
  };
}