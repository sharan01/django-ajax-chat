from django.db import models
from datetime import datetime
from django.contrib.auth.signals import user_logged_in, user_logged_out  
from django.contrib.auth.models import User
import urllib, hashlib, binascii

class Message(models.Model):
	user = models.CharField(max_length=200)
	message = models.TextField(max_length=200)
	time = models.DateTimeField(auto_now_add=True)
	gravatar = models.CharField(max_length=300)
	def __unicode__(self):
		return self.user
	# def save(self):
	# 	if self.time == None:
	# 		self.time = datetime.now()
	# 	super(Message, self).save()




def generate_avatar(email):
	a = "http://www.gravatar.com/avatar/"
	a+=hashlib.md5(email.lower()).hexdigest()
	a+='?d=identicon'
	return a
def hash_username(username):
	a = binascii.crc32(username)
	return a
class ChatUser(models.Model):
	user = models.OneToOneField(User)
	userID =  models.IntegerField()
	username = models.CharField(max_length=300)
	is_chat_user = models.BooleanField(default=False)
	gravatar_url = models.CharField(max_length=300)
	last_accessed = models.DateTimeField(auto_now_add=True)
	
User.profile = property(lambda u: ChatUser.objects.get_or_create(user=u,defaults={'gravatar_url':generate_avatar(u.email),'username':u.username,'userID':hash_username(u.username)})[0])
