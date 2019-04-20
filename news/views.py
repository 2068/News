from django.shortcuts import render, HttpResponse
from news.models import News
from django.core.paginator import Paginator


# Create your views here.


def index(request):
    total = News.objects.count()
    w = News.objects.filter(kinds=1).count()
    w = round(w / total * 100, 2)
    c = News.objects.filter(kinds=2).count()
    c = round(c / total * 100, 2)
    mil = News.objects.filter(kinds=3).count()
    mil = round(mil / total * 100, 2)
    cul = News.objects.filter(kinds=4).count()
    cul = round(cul / total * 100, 2)
    sports = News.objects.filter(kinds=5).count()
    sports = round(sports / total * 100, 2)
    ent = News.objects.filter(kinds=6).count()
    ent = round(ent / total * 100, 2)
    finance = News.objects.filter(kinds=7).count()
    finance = round(finance / total * 100, 2)
    tech = News.objects.filter(kinds=8).count()
    tech = round(tech / total * 100, 2)
    return render(request, 'index.html', locals())


def list(request, bid,pindex=1):
    curtent_id=bid
    news = News.objects.filter(kinds=bid)
    paginator=Paginator(news,15)
    if pindex=='':
        pindex=1
    else:
        pindex=int(pindex)
    page=paginator.page(pindex)
    return render(request, 'list.html', locals())


def detail(request, bid):
    news = News.objects.filter(id=bid)
    print(news)
    return render(request, 'detail.html', locals())


def about(request):
    return render(request, 'about.html')


def contact(request):
    return render(request, 'contact.html')
