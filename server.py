import json
import os
import time
from flask import Flask, Response, request
from app.provider import Event

app = Flask(__name__, static_url_path='', static_folder='public')
app.add_url_rule('/', 'root', lambda: app.send_static_file('index.html'))

APP_ROOT = os.path.dirname(os.path.abspath(__file__))
APP_STATIC = os.path.join(APP_ROOT, 'public/static')


@app.route('/api/calendar', methods=['GET'])
def calendar_handler():
    e = Event()
    events = e.allEvents()
    return Response(json.dumps(events), mimetype='application/json',
                    headers={'Cache-Control': 'no-cache',
                             'Access-Control-Allow-Origin': '*'})


@app.route('/api/calendar/upcoming', methods=['GET'])
def upcoming_calendar_events():
    e = Event()
    events = e.upcomingEvents()
    return Response(json.dumps(events), mimetype='application/json',
                    headers={'Cache-Control': 'no-cache',
                             'Access-Control-Allow-Origin': '*'})

if __name__ == '__main__':
    app.run(port=int(os.environ.get("PORT", 3000)))
