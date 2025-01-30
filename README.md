# CosmicShare 🌌

A modern, secure file sharing platform with a cosmic-themed UI and auto-expiring links. Share files at light speed through an intuitive interface with a space-inspired design.
ou can view the live version of the website here: [CosmicShare](https://cosmic-share.vercel.app/about)
## ✨ Features

- **Secure File Sharing**: Upload and share files with automatically expiring links.
- **Multiple Expiration Options**: Choose from 30 seconds up to 1 week for link expiration.
- **Cosmic UI**: Beautiful space-themed interface with an animated vortex background.
- **Auto Cleanup**: Automatic deletion of expired files to maintain system efficiency.
- **File Support**: Handles various file types including documents, images, audio, and video.
- **Size Limit**: Up to 50MB per file.
- **Responsive Design**: Works seamlessly across all devices.

## 🚀 Tech Stack

### Frontend
- Next.js 15.0
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Axios
- shadcn/ui components

### Backend
- FastAPI
- Python
- Appwrite Storage
- APScheduler

## 🛠️ Installation

### Prerequisites
- Node.js (v18 or higher)
- Python 3.8+
- Appwrite instance

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```

## Environment Variables

### Frontend (.env)
```env
NEXT_PUBLIC_API_URL=your_backend_url
```

### Backend (.env)
```env
APPWRITE_ENDPOINT=your_appwrite_endpoint
APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_api_key
APPWRITE_BUCKET_ID=your_bucket_id
```

## 🌟 Usage
1. Visit the homepage.
2. Select a file (up to 50MB).
3. Choose an expiration time.
4. Click "Generate Share Link."
5. Copy and share the generated link.

## 🔒 Supported File Types

### Documents
- `.pdf`, `.doc`, `.docx`, `.txt`

### Images
- `.jpg`, `.jpeg`, `.png`, `.gif`

### Media
- `.mp3`, `.mp4`, `.mov`

### Archives
- `.zip`, `.rar`

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
