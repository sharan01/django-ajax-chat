from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.contrib import auth
from django.core.context_processors import csrf
from django.core.urlresolvers import reverse
from django.views.decorators.csrf import csrf_exempt
import json
from djangoChat.models import Message, LoggedUser



def index(request):
	if request.method == 'POST':
		print request.POST
	logged_users = LoggedUser.objects.all().order_by('username')
	if request.user.username:
		context = {'logged_users':logged_users}
		return render(request, 'djangoChat/index.html', context)
	else:
		return HttpResponseRedirect(reverse('login'))

def login(request):
	if request.user.username:
		return HttpResponseRedirect(reverse('index'))
	context = {'error':''}	

	if request.method == 'POST':
		username = request.POST.get('username','') #retunr '' if no username
		password = request.POST.get('password','')

		user = auth.authenticate(username=username,password=password)

		if user is not None:
			auth.login(request,user)
			return HttpResponseRedirect(reverse('index'))
		else:
			context['error'] = ' wrong credentials try again'
			return render(request,'djangoChat/login.html',context)


	context.update(csrf(request))		
	return render(request,'djangoChat/login.html',context)


def logout(request):
	auth.logout(request)
	return HttpResponseRedirect(reverse('login'))

@csrf_exempt
def chat_api(request):
	if request.method == 'POST':
		d = json.loads(request.body)
		msg =  d.get('msg')
		user = request.user.username
		m = Message(user=user,message=msg)
		m.save()
		print m.time

		res = {'msg':m.message,'user':m.user,'time':m.time.strftime('%A %H:%M:%S')}
		data = json.dumps(res)
		return HttpResponse(data)


	# get request
	r = Message.objects.order_by('-time')[:20]
	res = []
	for msgs in reversed(r) :
		res.append({'user':msgs.user,'msg':msgs.message,'time':msgs.time.strftime('%A %H:%M:%S')})
	
	data = json.dumps(res)
	return HttpResponse(data)


