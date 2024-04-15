# serializers.py
from rest_framework import serializers
from .models import *

class TutorSerializer(serializers.ModelSerializer):
    email = serializers.CharField(source='user.email', read_only=True)
    full_name = serializers.CharField(source='user.full_name', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Tutor
        fields = '__all__'
        
class ClientSerializer(serializers.ModelSerializer):
    email = serializers.CharField(source='user.email', read_only=True)
    full_name = serializers.CharField(source='user.full_name', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    role = serializers.CharField(source='user.role', read_only=True) 
    class Meta:
        model = Client
        fields = '__all__'

class TutorBookingSerializer(serializers.ModelSerializer): 
    class Meta:
        model = TutorBooking
        fields = ['is_virtual', 'is_in_person', 'created_at']

    def create(self, validated_data):
        tutor_id = self.context.get('tutor_id')
        client_id = self.context.get('client_id')
        
        client = Client.objects.get(id=client_id)
        return TutorBooking.objects.create(tutor_id=tutor_id, client=client, **validated_data)

class TutorNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TutorNotification
        #fields = ['is_approved','is_declined']
        fields = '__all__'
class TutorNotificationDSerializer(serializers.ModelSerializer):
    class Meta:
        model = TutorNotification
        fields = ['is_approved','is_declined']
        #fields = '__all__'
class ClientNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientNotification
        fields = '__all__'

class TutorRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = TutorRequest
        fields = '__all__'

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = TutorRating
        fields = ('rating', )
        
class OngoingJobSerializer(serializers.ModelSerializer):
    ongoing_jobs_count = serializers.SerializerMethodField()

    class Meta:
        model = OngoingJob
        fields = ['id', 'tutor', 'client', 'start_date', 'end_date', 'ongoing_jobs_count']

    def get_ongoing_jobs_count(self, obj):
        return OngoingJob.objects.filter(tutor=obj.tutor).count()
    
class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = TutorRating
        fields = ('rating', )
        
class OngoingJobSerializer(serializers.ModelSerializer):
    ongoing_jobs_count = serializers.SerializerMethodField()

    class Meta:
        model = OngoingJob
        fields = ['id', 'tutor', 'client', 'start_date', 'end_date', 'ongoing_jobs_count']

    def get_ongoing_jobs_count(self, obj):
        return OngoingJob.objects.filter(tutor=obj.tutor).count()

class OngoingJobCompleteSerializer(serializers.ModelSerializer):
    end_date = serializers.DateField()

    class Meta:
        model = OngoingJob
        fields = ['end_date']

class CompletedJobSerializer(serializers.ModelSerializer):
    completed_jobs_count = serializers.SerializerMethodField()

    class Meta:
        model = CompletedJob
        fields = ['id', 'tutor', 'client', 'start_date', 'end_date', 'completed_at', 'completed_jobs_count']

    def get_completed_jobs_count(self, obj):
        return CompletedJob.objects.filter(tutor=obj.tutor).count()
    
class TrackerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tracker
        fields = '__all__'
