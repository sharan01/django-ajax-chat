=====
Django Chat
=====

DjangoChat is a simple Django Chat app


demo
---------
http://www.sharan.co/chat/
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

----------------------------------------------------------------
todo list
--------------------------------------------------------------
-chat input format options - links images youtube embbed  etc
-escape html
-allow selected tags in input

-admin stuff
----------
-see logs
-private messages ???


