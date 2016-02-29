import json
import os
import datetime

APP_ROOT = os.path.dirname(os.path.abspath(__file__))
APP_STATIC = os.path.join(APP_ROOT, '../public/static')


class Event:
    def __init__(self):
        with open(os.path.join(APP_STATIC, 'events/2016.json'), 'r') as file:
            self.events = json.loads(file.read())

    def allEvents(self):
        return self.events

    def upcomingEvents(self):
        now = datetime.datetime.now().date()
        eventDate = datetime.date(1900, 1, 1)
        i = 0
        while eventDate < now:
            eventDate = datetime.datetime.strptime(self.events[i]['date'],
                                                   "%d %b %Y %H:%M").date()
            i += 1

        return self.events[i-1:i+3]
