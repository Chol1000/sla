"""
URL configuration for school_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings as django_settings
import school_backend.user_admin  # registers custom User admin with email field + welcome email
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import render
from django.http import HttpResponse
from django.views.static import serve
import os

def serve_react(request):
    # build/ sits one level above backend/ in the repo root
    possible_paths = [
        os.path.join(settings.BASE_DIR, 'build', 'index.html'),           # backend/build/
        os.path.join(settings.BASE_DIR, '..', 'build', 'index.html'),     # repo_root/build/
    ]
    for path in possible_paths:
        try:
            with open(path) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            continue
    return HttpResponse('<h1>St. Lawrence Academy</h1><p>React app not built yet.</p>')

ADMIN_URL = getattr(django_settings, 'ADMIN_URL', 'sla-management/')

urlpatterns = [
    path(ADMIN_URL, admin.site.urls),
    path('api/blog/', include('blog.urls')),
    path('api/campus/', include('campus.urls')),
    path('api/hero/', include('hero.urls')),
    path('api/staff/', include('staff.urls')),
    path('api/alumni/', include('alumni.urls')),
    path('api/leadership/', include('leadership.urls')),
    path('api/admissions/', include('admissions.urls')),
    path('api/contact/', include('contact.urls')),
    path('api/reviews/', include('reviews.urls')),
]

# Add static/media file serving
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
else:
    # Serve media files in production
    urlpatterns += [
        re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
        re_path(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}),
    ]

# Catch all other routes and serve React app (MUST be last)
# Exclude API, admin, media, and static paths
urlpatterns += [
    re_path(r'^(?!api/|admin/|media/|static/).*$', serve_react, name='react_app'),
]
