# urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('api/client/dashboard', ClientDashboardAPIView.as_view(), name='tutor-list'),
    path('api/client/dashboard/<int:client_id>/client-notifications/', ClientNotificationListView.as_view(), name='tutor-list'),
    path('api/client/<int:tutor_id>/<int:client_id>/booking/', ClientBookingCreateView.as_view(), name='book-tutor'),
    path('api/tutor/dashboard/', TutorDashboardAPIView.as_view(), name='tutor-dashboard'),
    path('api/tutor-profile/update/<int:pk>/', TutorProfileUpdateView.as_view(), name='tutor_profile_update'),
    path('api/tutor/<int:tutor_id>/<int:client_id>/booking/', TutorBookingCreateView.as_view(), name='book-tutor'),
    path('api/tutor/dashboard/<int:tutor_id>/tutor-notifications/', TutorNotificationListView.as_view(), name='notification-list'),
    path('api/tutor/dashboard/<int:tutor_id>/tutor-notifications/<int:pk>/', TutorNotificationDetailView.as_view(), name='notification-detail'),
    path('api/client/dashboard/<int:client_id>/client-notifications/<int:pk>/', ClientNotificationDetailView.as_view(), name='notification-detail'),
    path('api/send-tutor-request/', TutorRequestCreateView.as_view(), name='send-tutor-request'),
    path('api/ongoing-jobs/<int:id>/', OngoingJobListView.as_view(), name='ongoing-job-list'),
    path('api/completed-jobs/<int:id>/', CompletedJobListView.as_view(), name='completed-job-list'),
    path('api/ongoing-jobs/<int:pk>/complete/', OngoingJobCompleteView.as_view(), name='ongoing-job-complete'),
    path('api/tracker/<int:id>/', TrackerApiView.as_view(), name='tracker'),
]  
