/**
 * Teachers page component - Manage all teachers
 */
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import TeacherForm from '../components/TeacherForm';
import TeacherCard from '../components/TeacherCard';
import { useTeachers } from '../hooks/useTeachers';
import { useMultiAttendance } from '../hooks/useMultiAttendance';
import { Teacher } from '../types';
import { Users, UserPlus, Search } from 'lucide-react';

export default function Teachers() {
  const { teachers, addTeacher, updateTeacher, deleteTeacher } = useTeachers();
  const { checkInTeacher, checkOutTeacher, getTeacherTodayStatus } = useMultiAttendance();
  const [showForm, setShowForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const handleAddTeacher = (teacherData: Omit<Teacher, 'id'>) => {
    addTeacher(teacherData);
    setShowForm(false);
  };

  const handleEditTeacher = (teacherData: Teacher) => {
    updateTeacher(teacherData.id, teacherData);
    setEditingTeacher(null);
  };

  const handleDeleteTeacher = (id: string) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      deleteTeacher(id);
    }
  };

  const handleCheckIn = (teacher: Teacher) => {
    const now = new Date();
    checkInTeacher(teacher, formatTime(now), today);
  };

  const handleCheckOut = (teacher: Teacher) => {
    const now = new Date();
    checkOutTeacher(teacher.id, formatTime(now), today);
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeTeachers = filteredTeachers.filter(teacher => teacher.isActive);
  const inactiveTeachers = filteredTeachers.filter(teacher => !teacher.isActive);

  if (showForm || editingTeacher) {
    return (
      <div className="container mx-auto px-4 py-8">
        <TeacherForm
          teacher={editingTeacher || undefined}
          isEditing={!!editingTeacher}
          onSave={editingTeacher ? handleEditTeacher : handleAddTeacher}
          onCancel={() => {
            setShowForm(false);
            setEditingTeacher(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Teacher Management</h1>
              <p className="text-gray-600">Manage teachers and their attendance</p>
            </div>
          </div>
          <Button onClick={() => setShowForm(true)} className="flex items-center space-x-2">
            <UserPlus className="w-5 h-5" />
            <span>Add Teacher</span>
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search teachers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Teachers</p>
                <p className="text-2xl font-bold text-gray-900">{teachers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Active Teachers</p>
                <p className="text-2xl font-bold text-gray-900">{activeTeachers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Departments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(teachers.map(t => t.department)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Teachers */}
      {activeTeachers.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-600" />
              <span>Active Teachers ({activeTeachers.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeTeachers.map(teacher => (
                <TeacherCard
                  key={teacher.id}
                  teacher={teacher}
                  onEdit={setEditingTeacher}
                  onDelete={handleDeleteTeacher}
                  onCheckIn={handleCheckIn}
                  onCheckOut={handleCheckOut}
                  attendanceStatus={getTeacherTodayStatus(teacher.id, today)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Inactive Teachers */}
      {inactiveTeachers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-gray-600" />
              <span>Inactive Teachers ({inactiveTeachers.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {inactiveTeachers.map(teacher => (
                <TeacherCard
                  key={teacher.id}
                  teacher={teacher}
                  onEdit={setEditingTeacher}
                  onDelete={handleDeleteTeacher}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {teachers.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No teachers added yet</h3>
            <p className="text-gray-500 mb-4">Get started by adding your first teacher</p>
            <Button onClick={() => setShowForm(true)} className="flex items-center space-x-2">
              <UserPlus className="w-5 h-5" />
              <span>Add First Teacher</span>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* No Search Results */}
      {teachers.length > 0 && filteredTeachers.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No teachers found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}