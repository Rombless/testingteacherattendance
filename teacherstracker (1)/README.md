# Teacher Attendance Management System

A comprehensive web application for managing teacher attendance in educational institutions. Built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

### 👥 Multi-Teacher Management
- Add, edit, and delete teacher profiles
- Complete teacher information management (name, ID, department, contact)
- Active/inactive status tracking
- Department-wise organization

### ⏰ Attendance Tracking
- Real-time check-in/check-out functionality
- Automatic timestamp recording
- Working hours calculation
- Status tracking (Present, Partial, Absent)

### 📊 Analytics & Reports
- Daily attendance overview
- Individual teacher statistics
- Monthly summaries and trends
- CSV export functionality
- Attendance rate calculations

### 📱 User Interface
- Responsive design (desktop, tablet, mobile)
- Clean, professional interface
- Real-time clock display
- Intuitive navigation

## 🚀 Live Demo

Visit the live application: [Teacher Attendance System](https://yourusername.github.io/teacher-attendance)

## 🛠️ Technologies Used

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Icons**: Lucide React
- **Build Tool**: esbuild
- **Hosting**: GitHub Pages
- **Data Storage**: Browser LocalStorage

## 📦 Installation & Setup

### Option 1: GitHub Pages Hosting (Recommended)

1. **Fork this repository**
   ```bash
   git clone https://github.com/yourusername/teacher-attendance.git
   cd teacher-attendance
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Save settings

3. **Access your app**
   - Your app will be available at: `https://yourusername.github.io/teacher-attendance`

### Option 2: Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/teacher-attendance.git
   cd teacher-attendance
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Option 3: Build for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to any static hosting service

## 📁 Project Structure

```
teacher-attendance/
├── index.html              # Main HTML file
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── AttendanceForm.tsx
│   │   ├── TeacherCard.tsx
│   │   └── ...
│   ├── pages/             # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Teachers.tsx
│   │   ├── DailyAttendance.tsx
│   │   └── Home.tsx
│   ├── hooks/             # Custom React hooks
│   │   ├── useAttendance.ts
│   │   ├── useTeachers.ts
│   │   └── useMultiAttendance.ts
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Main App component
│   └── main.tsx           # Entry point
├── package.json
└── README.md
```

## 🎯 Usage Guide

### Adding Teachers

1. Navigate to the "Teachers" page
2. Click "Add Teacher" button
3. Fill in teacher information:
   - Full name
   - Employee ID
   - Email address
   - Department
   - Phone number (optional)
   - Join date
   - Active status

### Recording Attendance

**Method 1: Individual Teacher Dashboard**
1. Go to "Individual Tracking" page
2. Use the check-in/check-out buttons
3. View personal attendance history

**Method 2: Teacher Management Page**
1. Go to "Teachers" page
2. Use check-in/check-out buttons on teacher cards
3. Monitor real-time attendance status

### Viewing Daily Attendance

1. Navigate to "Daily Attendance" page
2. Select desired date using date picker
3. View all teachers' attendance for that day
4. Export daily reports as CSV

### Generating Reports

1. **Individual Reports**: Go to Individual Tracking → Analytics tab
2. **Daily Reports**: Use "Export Report" button on Daily Attendance page
3. **Dashboard Overview**: View summary statistics on main Dashboard

## 🔧 Configuration

### Customizing the App

1. **School Information**: Edit the title and branding in `index.html`
2. **Color Scheme**: Modify Tailwind colors in the HTML file
3. **Default Settings**: Adjust initial values in hook files

### Data Storage

- All data is stored in browser's LocalStorage
- Data persists between sessions
- No external database required
- Export functionality available for backup

## 🎨 Features Overview

### Dashboard
- Real-time attendance statistics
- Today's attendance summary
- Recent activity feed
- Quick action shortcuts

### Teacher Management
- Complete CRUD operations
- Search and filter functionality
- Department organization
- Active/inactive status management

### Attendance Tracking
- Automatic timestamp recording
- Working hours calculation
- Multiple attendance states
- Real-time status updates

### Reports & Analytics
- Daily attendance summaries
- Individual performance metrics
- Monthly statistics
- CSV export capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

For support, questions, or feature requests:
- Create an issue in this repository
- Contact your system administrator
- Check the documentation above

---

**Made with ❤️ for educational institutions**