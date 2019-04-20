# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html
import pymysql


class CctvNewsPipeline(object):
    def __init__(self):
        dbparms = {
            'host': '127.0.0.1',
            'port': 3306,
            'user': 'root',
            'password': 'root',
            'database': 'news02',
            'charset': 'utf8'
        }
        self.conn = pymysql.connect(**dbparms)
        self.cursor = self.conn.cursor()
        self._sql = None

    def process_item(self, item, spider):
        self.cursor.execute(self.sql,(item['title'],item['pub_time'],
                                      item['url'],item['content'],item['kinds']))
        self.conn.commit()
        return item

    @property
    def sql(self):
        if not self._sql:
            self._sql="""
            insert into news(id,title,pub_time,url,content,kinds) 
            values(null,%s,%s,%s,%s,%s)
            """
            return self._sql
        return self._sql
