# Saral Mitti - Crop Disease Analysis App

A modern, full-stack web application that enables users to upload images of crops and receive AI-powered disease analysis. Built with Next.js (frontend) and Django (backend).

## 🌟 Features

- **User Authentication**: Secure JWT-based registration and login system
- **Image Upload**: Drag-and-drop or file selection interface for crop images
- **AI Disease Detection**: Machine learning model integration for crop disease analysis
- **Results Display**: Clear, actionable insights with confidence scores and suggested actions
- **Responsive Design**: Modern, mobile-friendly interface built with Tailwind CSS
- **Protected Routes**: Secure dashboard accessible only to authenticated users

## 🏗️ Technology Stack

### Frontend
- **Next.js 15** with TypeScript
- **React 18**
- **Tailwind CSS** for styling
- **Axios** for API communication
- **Context API** for state management

### Backend
- **Django 4.2**
- **Django REST Framework** for API endpoints
- **SimpleJWT** for token-based authentication
- **PostgreSQL/SQLite** for database
- **Pillow** for image processing
- **TensorFlow/Keras** (placeholder for ML model integration)

## 📋 Prerequisites

- Python 3.8+
- Node.js 18+
- npm or yarn
- pip

## 🚀 Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create environment file:
```bash
cp .env.example .env
```

5. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

6. Create a superuser (optional):
```bash
python manage.py createsuperuser
```

7. Start the development server:
```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.local.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/users/register/` - Register a new user
- `POST /api/users/token/` - Login and get JWT tokens
- `POST /api/users/token/refresh/` - Refresh access token
- `GET /api/users/me/` - Get current user details (protected)

### Analysis
- `POST /api/analysis/upload/` - Upload crop image for analysis (protected)
- `GET /api/analysis/history/` - Get user's analysis history (protected)

## 🧪 Testing the Application

1. Start both backend and frontend servers
2. Visit `http://localhost:3000`
3. Register a new account
4. Login with your credentials
5. Upload a crop image on the dashboard
6. View the analysis results

## 🤖 ML Model Integration

The application includes a placeholder for ML model integration. To integrate your pre-trained model:

1. Place your model file (e.g., `model.h5`, `model.pth`) in `backend/models/`
2. Update `backend/analysis/ml_model.py`:
   - Load your model in the `load_model()` function
   - Adjust image preprocessing in `preprocess_image()` to match your model's requirements
   - Update the `predict_disease()` function to use your model's prediction logic

Example:
```python
def load_model():
    global MODEL
    if MODEL is None:
        MODEL = tf.keras.models.load_model('models/crop_disease_model.h5')
    return MODEL
```

## 🗂️ Project Structure

```
Saral-Mitti/
├── backend/
│   ├── saral_mitti/          # Django project settings
│   ├── users/                # User authentication app
│   ├── analysis/             # Crop analysis app
│   │   ├── models.py         # Database models
│   │   ├── views.py          # API views
│   │   ├── serializers.py    # DRF serializers
│   │   └── ml_model.py       # ML model integration
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── app/                  # Next.js app directory
│   │   ├── page.tsx         # Home page
│   │   ├── login/           # Login page
│   │   ├── register/        # Register page
│   │   └── dashboard/       # Dashboard page
│   ├── components/          # React components
│   ├── contexts/            # React contexts
│   ├── lib/                 # API client
│   └── package.json
└── Readme.md
```

## 🔒 Security Features

- JWT token-based authentication
- Password validation and hashing
- CORS configuration for frontend-backend communication
- Protected API endpoints
- Secure file upload handling

## 🌐 Environment Variables

### Backend (.env)
- `DEBUG` - Debug mode (True/False)
- `SECRET_KEY` - Django secret key
- `DATABASE_URL` - Database connection string
- `ALLOWED_HOSTS` - Allowed host domains
- `CORS_ALLOWED_ORIGINS` - Allowed CORS origins

### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL` - Backend API base URL

## 📝 Future Enhancements

- Analysis history page with detailed records
- Multiple disease detection per image
- Export analysis reports as PDF
- Real-time notifications
- Mobile app version
- Multi-language support
- Advanced user profile management

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

Saral Mitti Development Team

## 🆘 Support

For support, please open an issue in the GitHub repository.
