# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy



# print(title)
# print(url)
# print(pub_time)
# print(content)
class CctvNewsItem(scrapy.Item):
    title=scrapy.Field()
    url=scrapy.Field()
    pub_time=scrapy.Field()
    content=scrapy.Field()
    kinds=scrapy.Field()


