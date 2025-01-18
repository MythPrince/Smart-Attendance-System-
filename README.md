# Smart Attendance System

The *Smart Attendance System* is an automated attendance tracking solution using face recognition technology. The system captures real-time video feeds, detects faces, and matches them with predefined student records to automatically mark attendance. It integrates a web-based interface for administrators to monitor and manage attendance data.

### Key Features
- Real-time face detection and recognition for automatic attendance.
- Web-based interface for administrators to manage and view attendance records.
- Data storage in both MongoDB database and CSV files for easy access and reporting.
- Seamless integration between frontend and backend technologies.
- User-friendly and scalable solution for educational institutions, businesses, and event.

---

### Technologies Used

- *Frontend*: React.js
- *Backend*: Django
- *Database*: MongoDB
- *Computer Vision*: OpenCV and Face Recognition Libraries
- *Others*: HTML, CSS, JavaScript, Python

---

### Project Overview

The Smart Attendance System automates the entire attendance process, eliminating the need for manual entry or RFID cards. By using computer vision (OpenCV) and machine learning (face recognition libraries), the system detects and matches faces from a video feed, recording attendance once a match is found. The system supports both CSV and MongoDB for data storage, making it flexible and scalable.

---

### Features

1. *Video Feed Input*: The system accepts a live camera stream or recorded video feed for analysis.
2. *Face Detection*: OpenCV detects faces in the video feed.
3. *Face Recognition*: Detected faces are matched with a predefined list of students using face recognition algorithms.
4. *Attendance Recording*: Once a match is found, the individual's attendance is automatically recorded.
5. *Data Storage*: Attendance data is stored in both CSV files and MongoDB for later retrieval and reporting.
6. *Admin Dashboard*: The Django-based dashboard provides an easy-to-use interface for administrators to view and manage attendance records.
7. *Report Generation*: Administrators can export attendance data and generate reports.

---

### Project Setup

To set up and run the Smart Attendance System on your local machine, follow these steps:

#### 1. Clone the Repository

```bash
git clone https://github.com/MythPrince/Smart-Attendance-System.git 
