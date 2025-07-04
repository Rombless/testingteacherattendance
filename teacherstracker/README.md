# 🎓 Teacher Attendance Management System

A comprehensive web application for tracking teacher attendance in educational institutions. Built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

### 👥 Multi-Teacher Management
- ➕ Add new teachers with complete profiles
- ✏️ Edit existing teacher information
- 🗑️ Remove inactive teachers
- 🔍 Search and filter teachers by name, department, or ID
- 📊 View teacher statistics and status

### ⏰ Attendance Tracking
- 📅 Real-time check-in/check-out system
- 🕐 Automatic timestamp recording
- ⏱️ Working hours calculation
- 📈 Attendance rate monitoring
- 📊 Daily, weekly, and monthly reports

### 📋 Daily Overview
- 📆 Calendar-based date selection
- 👥 View all teachers' status for any day
- 📊 Daily attendance statistics
- 📤 Export daily reports to CSV
- 🔄 Real-time status updates

### 📊 Analytics & Reports
- 📈 Individual teacher performance tracking
- 📊 Attendance rate calculations
- 📅 Monthly and yearly summaries
- 💼 Working hours analysis
- 📤 Data export capabilities

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)

1. **Fork or Clone this repository**
   ```bash
   git clone https://github.com/yourusername/teacher-attendance-system.git
   cd teacher-attendance-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the application**
   ```bash
   npm run build
   ```

4. **Deploy to GitHub Pages**
   - Push all files to your GitHub repository
   - Go to repository **Settings** → **Pages**
   - Select **"Deploy from a branch"**
   - Choose **"main"** branch and **"/ (root)"** folder
   - Your app will be live at: `https://yourusername.github.io/your-repo-name`

### Option 2: Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   - Open `index.html` in your browser
   - Or use a local server like `Live Server` extension in VS Code

### Option 3: Quick Deploy Script

1. **Make deploy script executable**
   ```bash
   chmod +x deploy.sh
   ```

2. **Run deploy script**
   ```bash
   ./deploy.sh
   ```

## 🎯 How to Use

### 1. **Adding Teachers**
- Go to **Teachers** page
- Click **"Add New Teacher"**
- Fill in teacher details (Name, ID, Department, etc.)
- Save the teacher profile

### 2. **Daily Attendance**
- Navigate to **Daily Attendance** page
- Select the date you want to view
- See all teachers and their attendance status
- Use check-in/check-out buttons for each teacher

### 3. **Individual Tracking**
- Go to **Individual Tracking** page
- Select a specific teacher
- View their complete attendance history
- Check statistics and performance metrics

### 4. **Dashboard Overview**
- Main dashboard shows today's summary
- View recent attendance activities
- Check overall system statistics
- Quick access to all features

## 📁 Project Structure

```
teacher-attendance-system/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Main application pages
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript type definitions
│   └── main.tsx            # Application entry point
├── dist/                   # Built files (generated)
├── scripts/                # Build scripts
├── .github/workflows/      # GitHub Actions
├── index.html              # Main HTML file
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## 🛠️ Technical Details

### Built With
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **Lucide React** - Beautiful icon library
- **Zustand** - Lightweight state management
- **date-fns** - Date utility library

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Performance Features
- ⚡ Fast loading with optimized bundles
- 💾 Local storage for data persistence
- 📱 Responsive design for all devices
- 🔄 Real-time updates and synchronization

## 🎨 Customization

### Branding
- Update the title and meta tags in `index.html`
- Modify the color scheme in the CSS variables
- Replace the favicon with your institution's logo

### Features
- Add new teacher fields in `src/types/index.ts`
- Customize attendance statuses
- Add new report types
- Integrate with external APIs

## 🔧 Configuration

### Environment Variables
```bash
# Optional: Set your GitHub Pages URL
REACT_APP_BASE_URL=https://yourusername.github.io/your-repo-name
```

### Build Configuration
- Modify `scripts/build.mjs` for custom build settings
- Update `package.json` for deployment configuration
- Customize `tailwind.config.js` for design system

## 🚀 Deployment Options

### GitHub Pages
1. Enable GitHub Pages in repository settings
2. Select source: Deploy from a branch
3. Choose: main branch / (root)
4. Wait for deployment (usually 5-10 minutes)

### Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy automatically on push

### Vercel
1. Import project from GitHub
2. Framework preset: React
3. Build command: `npm run build`
4. Output directory: `dist`

## 📞 Support

### Common Issues

**404 Error on GitHub Pages:**
- Make sure `index.html` is in the root directory
- Check that GitHub Pages is enabled in repository settings
- Verify the build completed successfully

**Application won't load:**
- Check browser console for errors
- Ensure JavaScript is enabled
- Try hard refresh (Ctrl+F5 or Cmd+Shift+R)

**Data not saving:**
- Check if local storage is enabled
- Verify browser permissions
- Clear browser cache and reload

### Getting Help
- Check the browser console for error messages
- Review the GitHub Issues for common problems
- Ensure all dependencies are installed correctly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📈 Version History

- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added multi-teacher support
- **v1.2.0** - Enhanced reporting and analytics
- **v1.3.0** - GitHub Pages deployment support

---

## 🎯 Perfect for:
- 🏫 Schools and Colleges
- 🎓 Educational Institutions
- 👨‍🏫 Private Tutoring Centers
- 📚 Training Organizations
- 🏢 Corporate Training Departments

**Built with ❤️ for educators and administrators who need reliable attendance tracking.**
