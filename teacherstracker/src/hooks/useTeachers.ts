/**
 * Custom hook for managing teacher data
 */
import { useState, useEffect } from 'react';
import { Teacher } from '../types';

export function useTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  // Load teachers from localStorage on mount
  useEffect(() => {
    const savedTeachers = localStorage.getItem('teachers');
    if (savedTeachers) {
      setTeachers(JSON.parse(savedTeachers));
    }
  }, []);

  // Save teachers to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('teachers', JSON.stringify(teachers));
  }, [teachers]);

  const addTeacher = (teacher: Omit<Teacher, 'id'>) => {
    const newTeacher: Teacher = {
      ...teacher,
      id: Date.now().toString(),
    };
    setTeachers(prev => [...prev, newTeacher]);
    return newTeacher;
  };

  const updateTeacher = (id: string, updates: Partial<Teacher>) => {
    setTeachers(prev =>
      prev.map(teacher =>
        teacher.id === id ? { ...teacher, ...updates } : teacher
      )
    );
  };

  const deleteTeacher = (id: string) => {
    setTeachers(prev => prev.filter(teacher => teacher.id !== id));
  };

  const getTeacherById = (id: string) => {
    return teachers.find(teacher => teacher.id === id);
  };

  const getActiveTeachers = () => {
    return teachers.filter(teacher => teacher.isActive);
  };

  return {
    teachers,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    getTeacherById,
    getActiveTeachers,
  };
}