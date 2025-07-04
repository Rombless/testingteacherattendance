/**
 * TeacherForm component for adding and editing teachers
 */
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Teacher } from '../types';
import { UserPlus, Save, X } from 'lucide-react';

interface TeacherFormProps {
  teacher?: Teacher;
  onSave: (teacher: Omit<Teacher, 'id'> | Teacher) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export default function TeacherForm({ teacher, onSave, onCancel, isEditing = false }: TeacherFormProps) {
  const [formData, setFormData] = useState({
    name: teacher?.name || '',
    email: teacher?.email || '',
    department: teacher?.department || '',
    employeeId: teacher?.employeeId || '',
    phoneNumber: teacher?.phoneNumber || '',
    joinDate: teacher?.joinDate || new Date().toISOString().split('T')[0],
    isActive: teacher?.isActive ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && teacher) {
      onSave({ ...teacher, ...formData });
    } else {
      onSave(formData);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <UserPlus className="w-5 h-5 text-blue-600" />
          <span>{isEditing ? 'Edit Teacher' : 'Add New Teacher'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter teacher's full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID *</Label>
              <Input
                id="employeeId"
                value={formData.employeeId}
                onChange={(e) => handleInputChange('employeeId', e.target.value)}
                placeholder="Enter employee ID"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                placeholder="Enter department"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                placeholder="Enter phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="joinDate">Join Date *</Label>
              <Input
                id="joinDate"
                type="date"
                value={formData.joinDate}
                onChange={(e) => handleInputChange('joinDate', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => handleInputChange('isActive', checked)}
            />
            <Label htmlFor="isActive">Active Status</Label>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              {isEditing ? 'Update Teacher' : 'Add Teacher'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}