from django.db import models

# Create your models here.
class News(models.Model):
    title=models.CharField(verbose_name='标题',max_length=100,db_column='title')
    pub_time=models.CharField(verbose_name='发表时间',max_length=100,db_column='pub_time')
    url=models.CharField(verbose_name='链接',max_length=255,db_column='url')
    content=models.TextField(verbose_name='内容',db_column='content')
    kinds=models.CharField(verbose_name='种类',max_length=32,db_column='kinds')

    def __str__(self):
        return self.title

    class Meta:
        db_table='news'
        verbose_name_plural='新闻'
