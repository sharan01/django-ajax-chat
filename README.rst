=====
Django Chat
=====

DjangoChat is a simple Django Chat app



Quick start
-----------

1. Add "djangoChat" to your INSTALLED_APPS setting like this::

      INSTALLED_APPS = (
          ...
          'djangoChat',
      )

2. Include the polls URLconf in your project urls.py like this::

      url(r'^chat/', include('djangoChat.urls')),

3. Run `python manage.py migrate` to create the djangoChat models.

4. Start the development server and visit http://127.0.0.1:8000/chat/



