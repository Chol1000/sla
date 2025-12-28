# St. Lawrence Academy - Deployment Guide

## Quick Setup

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 0.0.0.0:8000
```

### Frontend Setup
```bash
npm install
npm start
```

## Environment Configuration

### Frontend (.env)
Update `REACT_APP_API_URL` to your backend URL:
```
REACT_APP_API_URL=http://your-backend-url:8000
```

### Backend
Update `ALLOWED_HOSTS` in settings.py with your domain

## Admin Access
- URL: http://your-backend-url:8000/admin
- Create superuser with: `python manage.py createsuperuser`

## Important Notes
- This is a SAMPLE deployment
- Update all placeholder content (emails, phone numbers, addresses)
- Add actual campus tour video in admin
- Configure registration status in admin
- Upload hero section images/videos
- Add blog posts, alumni, and leadership data
