markdown# 📔 Personal Diary App by Sven Sieber - Student of WBS Coding School

A modern, beautiful diary application built with React, Vite, and Tailwind CSS v4.

![Personal Diary App](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Personal+Diary+App)

## ✨ Features

- 📝 **Create Diary Entries** - Document your daily experiences with title, date, image, and content
- 🔒 **One Entry Per Day** - Maintains diary integrity by allowing only one entry per date
- 💾 **Local Storage** - All entries are persisted in your browser's localStorage
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS v4
- 🖼️ **Image Support** - Add images to your entries via URL
- 📱 **Responsive** - Works perfectly on desktop, tablet, and mobile devices
- ✅ **Form Validation** - Ensures all required fields are filled before submission

## 🚀 Tech Stack

- **React 19** - UI Framework
- **Vite 7** - Build tool and dev server
- **Tailwind CSS v4** - Styling
- **LocalStorage API** - Data persistence

## 📋 Requirements Implemented

- ✅ FR001: Public GitHub Repository
- ✅ FR002: Incremental Development with PRs
- ✅ FR003: React + Vite Setup
- ✅ FR004: TailwindCSS via npm
- ✅ FR005: State & Effects Management
- ✅ FR006: Add Entry Button
- ✅ FR007: Add Entry Form Fields
- ✅ FR008: LocalStorage Persistence
- ✅ FR009: One-Entry-Per-Day Check
- ✅ FR010: Form Validation
- ✅ FR011: Homepage List
- ✅ FR012: Load Entries on Startup
- ✅ FR013: Card Layout
- ✅ FR014: Entry Detail Modal
- ✅ FR015: Static-Site Deployment

## 🛠️ Installation

### Prerequisites

- Node.js 16+
- npm or yarn

### Setup

1. Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/personal-diary-app.git
cd personal-diary-app

Install dependencies:

bashnpm install

Start the development server:

bashnpm run dev

Open your browser and visit http://localhost:5173

📦 Build for Production
bashnpm run build
The build output will be in the dist/ folder.
🎯 Usage

Add Entry: Click the "Add Entry" button in the top right
Fill Form: Enter title, select date, provide image URL, and write your content
View Entries: All entries are displayed as cards on the homepage
Read Entry: Click on any card to view the full entry details
Validation: The app ensures all fields are filled and prevents duplicate entries for the same day

📁 Project Structure
src/
├── components/
│   ├── AddEntryModal.jsx      # Modal for adding new entries
│   └── EntryDetailModal.jsx   # Modal for viewing entry details
├── utils/
│   └── localStorage.js        # LocalStorage utility functions
├── App.jsx                    # Main application component
├── index.css                  # Global styles and Tailwind imports
└── main.jsx                   # Application entry point
🎨 Styling
This project uses Tailwind CSS v4 with custom animations:

Fade in effects for modals
Slide up animations for content
Shake animation for error alerts
Smooth hover transitions

🔧 Development
Available Scripts

npm run dev - Start development server
npm run build - Build for production
npm run preview - Preview production build locally
npm run lint - Run ESLint

📝 License
This project is open source and available under the MIT License.
👨‍💻 Author
Created as part of a Web App Development project.
🙏 Acknowledgments

React Team for the amazing framework
Tailwind CSS for the utility-first CSS framework
Vite for the lightning-fast build tool
```
