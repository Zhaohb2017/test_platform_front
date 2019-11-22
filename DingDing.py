#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2019/10/31 15:28
# @Author  : Hubery
# @Site    :
# @File    : dingTalkRobot.py
# @description: 钉钉机器人
"""
设置步骤:
    1. 建立钉钉群
    2. 在群设置-智能群助手中添加机器人，选择自定义
    3. 添加过程中安全设置只设置自定义关键词为：报告
    4. 添加完毕，将钉钉Webhook接口复制即可用
"""

import json
import requests
import dateutil.parser
import pytz
import pymysql
import time
from datetime import datetime
import calendar
import datetime
import random
from datetime import timedelta
dingtalk_webhook_url = "https://oapi.dingtalk.com/robot/send?access_token" \
                       "=a75a368f3c94ad1147255317a2d85b2be16e1efe073530446a17a2ebf72fa613 "

# dingtalk_webhook_url = 'https://oapi.dingtalk.com/robot/send?access_token=78ff89439bae639312477b90e66f22f07c767ccf865886495fd8b3d8a6ec8f75'

headers = {
    "Content-Type": "application/json"
}

#   文本格式
send_text_data = {
    "msgtype": "text",
    "text": {
        "content": "自动化测试报告，报告链接为： http://192.168.1.161:8080/api/report/%E9%82%B5%E9%98%B3%E5%AD%97%E7%89"
                   "%8C1571904706.html \n "
    },
    "at": {
        "isAtAll": True
    }
}
#   错误原因翻译解析
def translate(msg):
    MsgSwitcher = {
        "keywords not in content": "消息内容中不包含任何关键词",
        "invalid timestamp": "timestamp 无效",
        "sign not match": "签名不匹配",
        "not in whitelist": "IP地址不在白名单"
    }
    if 'not in whitelist' in msg:
        msg = 'not in whitelist'
    try:
        return MsgSwitcher[msg]
    except Exception as e:
        print("DingTalk - 钉钉机器人通知发送失败！转换原因查找不到, 错误原因为: %s, 系统报错: %s" % (msg, e))

#提醒发周报
def dingWeekly(content):
    send_data = ranDom().format(",".join(content))
    send_text_data['text']['content'] = f"{send_data}"
    print("send_text_data", send_text_data)
    res = requests.post(url=dingtalk_webhook_url, headers=headers, data=json.dumps(send_text_data))
    res_data = json.loads(res.text)
    print("The response ：{}".format(res_data))
    if res_data['errcode'] != 0:
        print("DingTalk - 钉钉机器人通知发送失败， 错误码：%s, 错误原因为: %s" % (res_data['errcode'], translate(res_data['errmsg'])))
    else:
        print("DingTalk - 钉钉机器人通知发送成功！")




class MSSQL:
    def __init__(self, host='192.168.1.161', user='root', pwd='root', db='trdb'):
        self.host = host
        self.user = user
        self.pwd = pwd
        self.db = db

    def GetConnect(self):
        if not self.db:
            raise (NameError, '没有设置数据库信息')
        self.conn = pymysql.connect(host=self.host, user=self.user, password=self.pwd, database=self.db, charset='utf8')
        cur = self.conn.cursor(cursor=pymysql.cursors.DictCursor)
        if not cur:
            raise (NameError, '连接数据库失败')
        else:
            return cur

    def ExecQuery(self, sql):
        cur = self.GetConnect()
        cur.execute(sql)
        resList = cur.fetchall()
        self.conn.close()
        return resList


def get_weekly_info():
    complete = []
    users = ["黄小娇", '刘金金', '汪衍', '王雄', '杨佳茵', '张祖立', '郑润生', 'zhaohuabing', '张仲寅', "张瑞"]
    _mysql = MSSQL()
    sql = "SELECT user FROM testReport_weekly WHERE create_date LIKE '%{}%';"
    time_list = yesterday_today()
    for date in  time_list:
        query = sql.format(date)
        all_sql = _mysql.ExecQuery(query)
        print('sql query -->>{}'.format(all_sql))
        if len(all_sql) != 0:
            for user in all_sql:
                complete.append(user['user'])
    print('完成人员: {}'.format(complete))

    if len(complete) != 0:
        for i in complete:
            if i in users:
                users.remove(i)
    return users






def ranDom():
    random_data = [ "万水千山总是情，{},写个周报报告行不行？",
                    "{},这几个沙雕们，快些周报报告啦！",
                    "就你{}这几个二货了，快写周报报告啦！",
                    "{}还不写周报报告是吧,李佳的十米长刀∝╬▅▅▆▅▆▅▆▅▆▅▆▅▆▇◤朝你们砍过来了！",
                    "有一种默契叫做心照不宣，有一种感觉叫做妙不可言，有一种报告叫周报！{}沙雕≧◔◡◔≦，还不写吗？"]

    return random.choice(random_data)


# 固定间隔interval秒时间，执行一个方法
class Loop_Run:
    '''
    interval:间隔的时间
    exec_fun:执行的方法
    '''
    def loop_start(self, exec_fun):
        while True:
            try:
                now = datetime.datetime.now()
                pm = ["13:30:00", "15:30:00", "16:30:00", "17:30:00", "18:00:00", "14:12:00"]
                hours = str(now)[10:19].replace(" ", "")
                today = get_today()
                year = int(str(today)[:4])
                Friday = 5
                all = get_Thursday(year, Friday)
                today = str(today)
                if today in all:
                    if hours in pm:
                        print("{}. yes ! today: {}".format(today, Friday))
                        exec_fun()
                        print("It will be sent today at {}.".format(now))
                        time.sleep(1)
            except Exception as e:
                print(e)

def exec_fun():
    users =  get_weekly_info()
    if len(users) != 0:
        dingWeekly(users)
    else:
        print("全部人员已完成! ")





def getAllDayList(year):
    '''获取指定年份的所有日期，返回一个二维列表'''
    cal = calendar.Calendar()
    alldaylist = []
    for month in list(range(1, 13)):
        listday = []
        for day in cal.itermonthdays(year, month):

            if day != 0:
                listday.append(day)
        alldaylist.append(listday)
    return alldaylist

def getdaydate(year,alldaylist,zj):
    '''获取指定周几的所有日期'''
    filterdate = []
    for month in list(range(1,13)):
        for day in alldaylist[month - 1]:
            date = datetime.date(year,month,day) #调用datetime类的isoweekday()方法，过滤出指定周几的日期
            if date.isoweekday() == zj:
                tmpstr = str(date.year) + "-" + str(date.month) + "-" + str(date.day)
                filterdate.append(tmpstr)
    return filterdate

def get_Thursday(year, day):
    '''选择周四'''
    zjdate = getdaydate(year, getAllDayList(year), day)
    return zjdate



def get_local_time(date):
    '''出掉日期日补0数字'''
    local_time = list(date)

    if local_time[-2] == "0":
        local_time.pop(-2)
        return ''.join(local_time)
    else:
        return ''.join(local_time)


def get_today():
    today = datetime.date.today()
    return today


def yesterday_today():
    '''获取今天，明天时间 '''
    day_list = []
    now = datetime.datetime.now()
    yesterday = now - timedelta(days=1)
    day_list.append(str(now)[:10])
    day_list.append(str(yesterday)[:10])
    return day_list



def main():
    Loop_Run().loop_start(exec_fun)

if __name__ == '__main__':
    main()








