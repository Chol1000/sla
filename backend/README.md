# St. Lawrence Academy Backend

Django REST API backend for St. Lawrence Academy website.

## Setup Instructions

1. Create and activate virtual environment:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

4. Create superuser for admin access:
```bash
python manage.py createsuperuser
```

5. Run development server:
```bash
python manage.py runserver
```

## API Endpoints

- Admin Dashboard: http://localhost:8000/admin/
- Blog Posts API: http://localhost:8000/api/blog/posts/
- Recent Posts: http://localhost:8000/api/blog/posts/recent/
- Posts by Category: http://localhost:8000/api/blog/posts/by_category/?category=Academic
- Single Post: http://localhost:8000/api/blog/posts/{slug}/

## Admin Dashboard

Access the admin dashboard at http://localhost:8000/admin/ to:
- Create, edit, and delete blog posts
- Manage categories
- Publish/unpublish posts
- View all posts with filtering and search

## Blog Post Fields

- Title: Post title
- Slug: URL-friendly version (auto-generated)
- Author: Post author name
- Excerpt: Short description (max 300 chars)
- Content: Full post content
- Image URL: Featured image URL
- Category: Post category
- Is Published: Publish status
- Created At: Auto-generated timestamp
- Updated At: Auto-updated timestamp
