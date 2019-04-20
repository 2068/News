from django.conf.urls import url
from news import views

urlpatterns = [
    url(r'^index$', views.index),
    url(r'^list/(?P<bid>\d+)$', views.list),
    url(r'^list/(?P<bid>\d+)/(?P<pindex>\d*)$', views.list),
    url(r'^detail/(\d+)$', views.detail),
    url(r'^about$', views.about),
    url(r'^contact$', views.contact),
]
