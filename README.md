## Features

- Create, edit, and delete tasks  
- Drag and drop tasks between columns  
- Multiple board columns (Today / Now / This Week / Next Week)  
- Persistent state using Local Storage  
- Task detail modal for editing tasks  
- Column management (add, edit, resize, delete)  
- Smooth and responsive UI experience  

---
## 📁 Project Structure

```bash
TRELLO-CLONE/
│
├── client/                     # Frontend application
│   ├── public/
│   ├── screenshots/           # UI preview images
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Optional backend (future)
│
├── README.md
└── .gitignore
```
---
##  Getting Started

Follow these steps to run the project locally.

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/trello-clone.git
```

### 2. Navigate to project
   ```bash 
   cd trello-clone/client
```
### 3. Install dependencies
   ```bash
   npm install
```
### 4. Start development server
   ```bash 
   npm run dev
```
### 5. Open in browser
   ```bash 
   http://localhost:5173
```

---

## 📸 Preview

###  Dashboard View
A full overview of the task board interface.

![Dashboard](./client/screenshots/dashboard.png)

---

###  Board Interactions
Column-level actions including add, edit, resize, and move functionality.

![Board View](./client/screenshots/board-view.png)

![Column Actions](./client/screenshots/column-actions.png)

---

### ✏️ Task Management
Create, edit, and manage tasks using modal-based interactions.

![Task Modal](./client/screenshots/task-modal-1.png)
![Task Modal](./client/screenshots/task-modal-2.png)
![Task Modal](./client/screenshots/task-modal-3.png)

---

### 🔄 Drag & Drop System
Tasks can be moved dynamically between columns.

![Drag Drop](./client/screenshots/drag-drop.png)
