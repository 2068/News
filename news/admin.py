from django.contrib import admin
from news import models


# Register your models here.
class NewsAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'pub_time', 'url', 'kinds')


admin.site.register(models.News, NewsAdmin)
