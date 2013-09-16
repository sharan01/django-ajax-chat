from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.contrib import auth
from django.core.context_processors import csrf
from django.core.urlresolvers import reverse
from django.views.decorators.csrf import csrf_exempt
import json
from djangoChat.models import Message, ChatUser
from django.contrib.auth.models import User
import datetime
from django.utils.timezone import now as utcnow


def index(request):
	if request.method == 'POST':
		print request.POST
	logged_users = []
	if request.user.username and request.user.profile.is_chat_user:
		context = {'logged_users':logged_users}
		return render(request, 'djangoChat/index.html', context)
	else:
		return HttpResponseRedirect(reverse('login'))

def login(request):
	if request.user.username and request.user.profile.is_chat_user:
		return HttpResponseRedirect(reverse('index'))
	context = {'error':''}	

	if request.method == 'POST':
		username = request.POST.get('username','') #retunr '' if no username
		password = request.POST.get('password','')

		user = auth.authenticate(username=username,password=password)

		if user is not None:
			auth.login(request,user)
			cu = request.user.profile
			cu.is_chat_user = True
			cu.last_accessed = utcnow()
			cu.save()
			


			return HttpResponseRedirect(reverse('index'))
		else:
			context['error'] = ' wrong credentials try again'
			return render(request,'djangoChat/login.html',context)


	context.update(csrf(request))		
	return render(request,'djangoChat/login.html',context)


def logout(request):
	cu = request.user.profile
	cu.is_chat_user = False
	cu.save()
	return HttpResponse('succesfully logged out of chat')

@csrf_exempt
def chat_api(request):
	if request.method == 'POST':
		d = json.loads(request.body)
		msg =  d.get('msg')
		user = request.user.username
		gravatar = request.user.profile.gravatar_url
		m = Message(user=user,message=msg,gravatar=gravatar)
		m.save()


		res = {'id':m.id,'msg':m.message,'user':m.user,'time':m.time.strftime('%I:%M:%S %p').lstrip('0'),'gravatar':m.gravatar}
		data = json.dumps(res)
		return HttpResponse(data,content_type="application/json")


	# get request
	r = Message.objects.order_by('-time')[:70]
	res = []
	for msgs in reversed(r) :
		res.append({'id':msgs.id,'user':msgs.user,'msg':msgs.message,'time':msgs.time.strftime('%I:%M:%S %p').lstrip('0'),'gravatar':msgs.gravatar})
	
	data = json.dumps(res)

	
	return HttpResponse(data,content_type="application/json")


def logged_chat_users(request):

	u = ChatUser.objects.filter(is_chat_user=True)

	for j in u:
		elapsed = utcnow() - j.last_accessed
		if elapsed > datetime.timedelta(seconds=35):

			j.is_chat_user = False
			j.save()

	uu = ChatUser.objects.filter(is_chat_user=True)
	

	d = []
	for i in uu:
		d.append({'username': i.username,'gravatar':i.gravatar_url,'id':i.userID})
	data = json.dumps(d)
	 

	return HttpResponse(data,content_type="application/json")


def update_time(request):
	if request.user.username:
		u = request.user.profile


		u.last_accessed = utcnow()
		u.is_chat_user = True
		u.save()

		return HttpResponse('updated')
	return HttpResponse('who are you?')
