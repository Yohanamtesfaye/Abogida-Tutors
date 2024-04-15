from django.db import models
from user.models import *

class TutorBooking(models.Model):
    client = models.ForeignKey(Client, related_name='bookings', on_delete=models.CASCADE)
    tutor = models.ForeignKey(Tutor, on_delete=models.CASCADE)
    is_virtual = models.BooleanField(default=False)
    is_in_person = models.BooleanField(default=False)
    date = models.DateTimeField(default=timezone.now)
    created_at = models.DateTimeField(auto_now_add=True)

class TutorNotification(models.Model):
    tutor = models.ForeignKey(Tutor, related_name='notifications_received', on_delete=models.CASCADE)
    client = models.ForeignKey(Client, related_name='notifications_sent', on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_approved = models.BooleanField(default=False)
    is_declined = models.BooleanField(default=False)
    def approve(self):
        self.is_approved = True
        self.save(update_fields=['is_approved'])

    def decline(self):
        self.is_declined = True
        self.save(update_fields=['is_declined'])
        
class ClientNotification(models.Model):
    tutor = models.ForeignKey(Tutor, related_name='notifications_sent', on_delete=models.CASCADE)
    client = models.ForeignKey(Client, related_name='notifications_received', on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class TutorRating(models.Model):
    tutor = models.ForeignKey(Tutor, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()
    date_rated = models.DateTimeField(auto_now_add=True)
    
class CompletedJob(models.Model):
    tutor = models.ForeignKey(Tutor, on_delete=models.CASCADE)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    completed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Completed Job for {self.client} by {self.tutor}"

class OngoingJob(models.Model):
    tutor = models.ForeignKey(Tutor, on_delete=models.CASCADE)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"Ongoing Job for {self.client} by {self.tutor}"

class TutorRequest(models.Model):
    tutor = models.ForeignKey(Tutor, on_delete=models.CASCADE,null=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE,null=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
class Tracker(models.Model):
    ongoingjob = models.IntegerField(null=True,unique=True)
    days = models.JSONField(default=[])
