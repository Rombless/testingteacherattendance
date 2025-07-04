/**
 * DailyAttendance page component - View all teachers' attendance for a specific day
 */
import DailyAttendanceView from '../components/DailyAttendanceView';
import { useTeachers } from '../hooks/useTeachers';
import { useMultiAttendance } from '../hooks/useMultiAttendance';

export default function DailyAttendance() {
  const { teachers } = useTeachers();
  const { attendanceRecords } = useMultiAttendance();

  return (
    <div className="container mx-auto px-4 py-8">
      <DailyAttendanceView 
        teachers={teachers} 
        attendanceRecords={attendanceRecords} 
      />
    </div>
  );
}