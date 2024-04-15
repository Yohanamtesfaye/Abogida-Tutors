from django.shortcuts import get_object_or_404
from rest_framework import generics,status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from .models import *
from .serializers import *

class ClientDashboardAPIView(generics.ListAPIView):
	serializer_class = TutorSerializer
	# permission_classes = [IsAuthenticated]

	def get_queryset(self):
		return Tutor.objects.all()
	
class TutorDashboardAPIView(generics.ListAPIView):
	serializer_class = ClientSerializer
	# permission_classes = [IsAuthenticated]

	def get_queryset(self):
		return Client.objects.all() 
	
class TutorProfileUpdateView(generics.UpdateAPIView):
	queryset = Tutor.objects.all()
	serializer_class = TutorSerializer
	# permission_classes = [IsAuthenticated]

class TutorBookingCreateView(generics.CreateAPIView):
	queryset = TutorBooking.objects.all()
	serializer_class = TutorBookingSerializer
	
	def get_serializer_context(self):
		context = super().get_serializer_context()
		context['tutor_id'] = self.kwargs.get('tutor_id')
		context['client_id'] = self.kwargs.get('client_id')
		return context
	
	def perform_create(self, serializer):
		print(3456789)
		tutor_id = self.kwargs.get('tutor_id')
		client_id = self.kwargs.get('client_id')
		# serializer.save()

		print('qwrqwrqw')
		client = Client.objects.get(user_id=client_id)
		tutor = Tutor.objects.get(user_id=tutor_id)
		print(client)

		
		message = f"A new booking request has been made by {client.user.full_name}."
		TutorNotification.objects.create(tutor=tutor, client=client, message=message)

class ClientBookingCreateView(generics.CreateAPIView):
	queryset = TutorBooking.objects.all()
	serializer_class = TutorBookingSerializer
	
	def get_serializer_context(self):
		context = super().get_serializer_context()
		context['tutor_id'] = self.kwargs.get('tutor_id')
		context['client_id'] = self.kwargs.get('client_id')
		return context
	
	def perform_create(self, serializer):
		
		tutor_id = self.kwargs.get('tutor_id')
		client_id = self.kwargs.get('client_id')



		client = Client.objects.get(user_id=client_id)
		tutor = Tutor.objects.get(user_id=tutor_id)
		print(client)

		
		message = f"A new booking request has been made by {client.user.full_name}."
		ClientNotification.objects.create(tutor=tutor, client=client, message=message)


class TutorNotificationListView(generics.ListAPIView):
	serializer_class = TutorNotificationSerializer

	def get_queryset(self):
		tutor_id = self.kwargs.get('tutor_id')
		tutor = Tutor.objects.get(user_id=tutor_id)
		print(tutor.id)
		return TutorNotification.objects.filter(tutor_id=tutor.id)
	
class ClientNotificationListView(generics.ListAPIView):
	serializer_class = ClientNotificationSerializer

	def get_queryset(self):
		client_id = self.kwargs.get('client_id')
		client = Client.objects.get(user_id=client_id)
		print(client.id)
		return ClientNotification.objects.filter(client_id=client.id)


class ClientNotificationDetailView(generics.UpdateAPIView):
	queryset = ClientNotification.objects.all()
	serializer_class = ClientNotificationSerializer
	lookup_url_kwarg = 'pk'
	
	def put(self, request, *args, **kwargs):
		instance = self.get_object()
		is_approved = request.data.get('is_approved')
		is_declined = request.data.get('is_declined')
		"""print(request.data)
		print("Is Approved:", is_approved)
		print("Is Declined:", is_declined)
"""
		if is_approved == 'true':
			instance.is_approved = True
			instance.is_declined = False 
			instance.save()

			TutorNotification.objects.create(client_id=instance.client_id, tutor_id=instance.tutor_id, message=f"{instance.tutor.user.full_name}'s has approved your request.")
			OngoingJob.objects.create(client_id=instance.client_id, tutor_id=instance.tutor_id,start_date='02-04-2021')
			instance.delete() 
			return Response({'message': 'You have approved the request'}, status=status.HTTP_200_OK)
		
		elif is_declined == 'true':
			instance.is_declined = True
			instance.is_approved = False 
			instance.save()
		
			TutorNotification.objects.create(client_id=instance.client_id, tutor_id=instance.tutor_id, message=f"{instance.tutor.user.full_name}'s has declined your request.")
			instance.delete() 
			return Response({'message': 'You have declined the request'}, status=status.HTTP_200_OK)
		
		else:
			return Response({'error': 'Invalid value for approval or decline status'}, status=status.HTTP_400_BAD_REQUEST)


class TutorNotificationDetailView(generics.UpdateAPIView):
	queryset = TutorNotification.objects.all()
	serializer_class = TutorNotificationDSerializer
	lookup_url_kwarg = 'pk'
	
	def put(self, request, *args, **kwargs):
		instance = self.get_object()
		is_approved = request.data.get('is_approved')
		is_declined = request.data.get('is_declined')
		"""print(request.data)
		print("Is Approved:", is_approved)
		print("Is Declined:", is_declined)
"""
		if is_approved == 'true':
			instance.is_approved = True
			instance.is_declined = False 
			instance.save()

			ClientNotification.objects.create(client_id=instance.client_id, tutor_id=instance.tutor_id, message=f"{instance.tutor.user.full_name}'s has approved your request.")
			OngoingJob.objects.create(client_id=instance.client_id, tutor_id=instance.tutor_id,start_date='02-04-2021')
			instance.delete() 
			return Response({'message': 'You have approved the request'}, status=status.HTTP_200_OK)
		
		elif is_declined == 'true':
			instance.is_declined = True
			instance.is_approved = False 
			instance.save()
		
			ClientNotification.objects.create(client_id=instance.client_id, tutor_id=instance.tutor_id, message=f"{instance.tutor.user.full_name}'s has declined your request.")
			instance.delete() 
			return Response({'message': 'You have declined the request'}, status=status.HTTP_200_OK)
		
		else:
			return Response({'error': 'Invalid value for approval or decline status'}, status=status.HTTP_400_BAD_REQUEST)

class OngoingJobListView(generics.ListAPIView):
	queryset = OngoingJob.objects.all()
	serializer_class = OngoingJobSerializer
	def get(self,request,id):
		tutor = Tutor.objects.get(user_id=id)
		job = OngoingJob.objects.filter(tutor=tutor.id)
		print(job)
		# serializer = OngoingJobSerializer(job,many=True)
		data = []
		for user in job:
			# student = get_object_or_404(Client,id=user.client)
			# print(student)
			serializer = ClientSerializer(user.client)
			data.append({**serializer.data,"job_id":user.id})
		return Response(data)
class OngoingJobCompleteView(generics.UpdateAPIView):
	queryset = OngoingJob.objects.all()
	serializer_class = OngoingJobCompleteSerializer
	lookup_url_kwarg = 'pk'

	def put(self, request, *args, **kwargs):
		instance = self.get_object()
		instance.is_completed = True
		instance.end_date = request.data.get('end_date') 
		instance.save()

		CompletedJob.objects.create(
			tutor=instance.tutor,
			client=instance.client,
			start_date=instance.start_date,
			end_date=instance.end_date,
		)
		instance.delete() 
		return Response({'message': 'Ongoing job marked as completed'}, status=status.HTTP_200_OK)

class CompletedJobListView(generics.ListAPIView):
	queryset = CompletedJob.objects.all()
	serializer_class = CompletedJobSerializer
	
	def get(self,request,id):
		tutor = Tutor.objects.get(user_id=id)
		job = CompletedJob.objects.filter(tutor=tutor.id)
		print(job)
		# serializer = OngoingJobSerializer(job,many=True)
		data = []
		for user in job:
			# student = get_object_or_404(Client,id=user.client)
			# print(student)
			serializer = ClientSerializer(user.client)
			data.append({**serializer.data,"job_id":user.id})
		return Response(data)

class TrackerApiView(generics.ListAPIView):
	queryset = Tracker.objects.all()
	serializer_class = TrackerSerializer
	def get(self,request,id):
		track = Tracker.objects.filter(ongoingjob=id)
		if track.exists():
			first_tracker = track[0]
			serailizer = TrackerSerializer(first_tracker)
			return Response(serailizer.data["days"])
		else:
			print("no id",id)
			days = Tracker.objects.create(ongoingjob=id)
			return Response([])
	
	def put(self,request,id):
		# try:
		track = Tracker.objects.filter(ongoingjob=id)
		if track.exists():
			first_tracker = track[0]
			print(first_tracker.days.append(request.data.get("day")))
			first_tracker.days = first_tracker.days + [request.data.get("day")]
			first_tracker.save()
			serailizer = TrackerSerializer(first_tracker)
			return Response(serailizer.data["days"])
		else:
			print("no id",id)
			days = Tracker.objects.create(ongoingjob=id)
			return Response([])
	
#  {
#     "day": "2024-11-23"
# }
	# def put(self,request,id):
		
 
class TutorRatingCreateView(generics.CreateAPIView):
	queryset = TutorRating.objects.all()
	serializer_class = RatingSerializer

	def perform_create(self, serializer):
		tutor_booking_id = self.kwargs.get('tutor_booking_id')
		tutor_booking = get_object_or_404(TutorBooking, id=tutor_booking_id)

		serializer.save(tutor_booking=tutor_booking)

class TutorRequestCreateView(generics.CreateAPIView):
	serializer_class = TutorRequestSerializer

	def perform_create(self, serializer):
		serializer.save(sender=self.request.user)
