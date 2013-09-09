from django.db import models
from datetime import datetime
from django.contrib.auth.signals import user_logged_in, user_logged_out  

class Message(models.Model):
	user = models.CharField(max_length=200)
	message = models.TextField(max_length=200)
	time = models.DateTimeField(auto_now_add=True)
	def __unicode__(self):
		return self.user
	# def save(self):
	# 	if self.time == None:
	# 		self.time = datetime.now()
	# 	super(Message, self).save()




class LoggedUser(models.Model):
	username = models.CharField(max_length=30, primary_key=True)

	def __unicode__(self):
		return self.username

def login_user(sender, request, user, **kwargs):
	LoggedUser(username=user.username).save()

def logout_user(sender, request, user, **kwargs):
	try:
		u = LoggedUser.objects.get(pk=user.username)
		u.delete()
	except LoggedUser.DoesNotExist:
		pass

user_logged_in.connect(login_user)
user_logged_out.connect(logout_user)
