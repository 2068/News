# -*- coding: utf-8 -*-
import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
from cctv_news.items import CctvNewsItem


class NewsSpider(CrawlSpider):
    name = 'news'
    allowed_domains = ['news.cctv.com', 'news.sina.com.cn', 'mil.news.sina.com.cn', 'cul.news.sina.com.cn',
                       'sports.sina.com.cn', 'ent.sina.com.cn', 'finance.sina.com.cn', 'tech.sina.com.cn']
    start_urls = ['http://news.cctv.com/china/index.shtml', 'https://news.sina.com.cn/world',
                  'https://news.sina.com.cn/china', 'https://mil.news.sina.com.cn',
                  'https://mil.news.sina.com.cn', 'https://cul.news.sina.com.cn',
                  'http://sports.sina.com.cn', 'https://ent.sina.com.cn/',
                  'https://finance.sina.com.cn', 'https://tech.sina.com.cn']

    rules = (
        Rule(LinkExtractor(allow=r'https://news.sina.com.cn/w/2019-\d{2}-\d{2}/.*\.shtml'), callback='parse_item1',
             follow=True),
        Rule(LinkExtractor(allow=r'https://news.sina.com.cn/c/2019-\d{2}-\d{2}/.*\.shtml'), callback='parse_item2',
             follow=True),
        Rule(LinkExtractor(allow=r'https://mil.news.sina.com.cn/jssd/2019-\d{2}-\d{2}/.*\.shtml'),
             callback='parse_item3', follow=True),
        Rule(LinkExtractor(allow=r'https://cul.news.sina.com.cn/.+/2019-\d{2}-\d{2}/.*\.shtml'), callback='parse_item4',
             follow=True),
        Rule(LinkExtractor(allow=r'http://sports.sina.com.cn/.+/.+/2019-\d{2}-\d{2}/.*\.shtml'), callback='parse_item5',
             follow=True),
        Rule(LinkExtractor(allow=r'https://ent.sina.com.cn/.+/.+/2019-\d{2}-\d{2}/.*\.shtml'), callback='parse_item6',
             follow=True),
        Rule(LinkExtractor(allow=r'https://finance.sina.com.cn/.+/.+/2019-\d{2}-\d{2}/.*\.shtml'),
             callback='parse_item7', follow=True),
        Rule(LinkExtractor(allow=r'https://tech.sina.com.cn/d/.+/2019-\d{2}-\d{2}/.*\.shtml'), callback='parse_item8',
             follow=True),
    )

    # 国际
    def parse_item1(self, response):
        title = response.xpath("//h1[@class='main-title']/text()").get()
        url = response.url
        pub_time = response.xpath("//span[@class='date']/text()").get()
        content = response.xpath("//div[@class='article']").get()
        print(title)
        print(url)
        print(pub_time)
        item = CctvNewsItem(
            title=title,
            pub_time=pub_time,
            url=url,
            content=content,
            kinds=1
        )
        yield item

    # 国内
    def parse_item2(self, response):
        title = response.xpath("//h1[@class='main-title']/text()").get()
        url = response.url
        pub_time = response.xpath("//span[@class='date']/text()").get()
        content = response.xpath("//div[@class='article']").get()
        print(title)
        print(url)
        print(pub_time)
        item = CctvNewsItem(
            title=title,
            pub_time=pub_time,
            url=url,
            content=content,
            kinds=2
        )
        yield item

    # 军事
    def parse_item3(self, response):
        title = response.xpath("//h1[@class='main-title']/text()").get()
        url = response.url
        pub_time = response.xpath("//span[@class='date']/text()").get()
        content = response.xpath("//div[@class='article']").get()
        print(title)
        print(url)
        print(pub_time)
        item = CctvNewsItem(
            title=title,
            pub_time=pub_time,
            url=url,
            content=content,
            kinds=3
        )
        yield item

    # 文化
    def parse_item4(self, response):
        title = response.xpath("//h1[@class='main-title']/text()").get()
        url = response.url
        pub_time = response.xpath("//span[@class='date']/text()").get()
        content = response.xpath("//div[@class='article']").get()
        print(title)
        print(url)
        print(pub_time)
        item = CctvNewsItem(
            title=title,
            pub_time=pub_time,
            url=url,
            content=content,
            kinds=4
        )
        yield item

    # 体育
    def parse_item5(self, response):
        title = response.xpath("//h1[@class='main-title']/text()").get()
        url = response.url
        pub_time = response.xpath("//span[@class='date']/text()").get()
        content = response.xpath("//div[@class='article']").get()
        print(title)
        print(url)
        print(pub_time)
        item = CctvNewsItem(
            title=title,
            pub_time=pub_time,
            url=url,
            content=content,
            kinds=5
        )
        yield item

    # 娱乐
    def parse_item6(self, response):
        title = response.xpath("//h1[@class='main-title']/text()").get()
        url = response.url
        pub_time = response.xpath("//span[@class='date']/text()").get()
        content = response.xpath("//div[@class='article']").get()
        print(title)
        print(url)
        print(pub_time)
        item = CctvNewsItem(
            title=title,
            pub_time=pub_time,
            url=url,
            content=content,
            kinds=6
        )
        yield item

    # 财经
    def parse_item7(self, response):
        title = response.xpath("//h1[@class='main-title']/text()").get()
        url = response.url
        pub_time = response.xpath("//span[@class='date']/text()").get()
        content = response.xpath("//div[@class='article']").get()
        print(title)
        print(url)
        print(pub_time)
        item = CctvNewsItem(
            title=title,
            pub_time=pub_time,
            url=url,
            content=content,
            kinds=7
        )
        yield item

    # 科技
    def parse_item8(self, response):
        title = response.xpath("//h1[@class='main-title']/text()").get()
        url = response.url
        pub_time = response.xpath("//span[@class='date']/text()").get()
        content = response.xpath("//div[@class='article']").get()
        print(title)
        print(url)
        print(pub_time)
        item = CctvNewsItem(
            title=title,
            pub_time=pub_time,
            url=url,
            content=content,
            kinds=8
        )
        yield item
