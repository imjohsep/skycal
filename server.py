import json
import os
import time
from flask import Flask, Response, request
from app.provider import Event

app = Flask(__name__, static_url_path='', static_folder='public')
app.add_url_rule('/', 'root', lambda: app.send_static_file('index.html'))
APP_ROOT = os.path.dirname(os.path.abspath(__file__))
APP_STATIC = os.path.join(APP_ROOT, 'public/static')


@app.route('/api/comments', methods=['GET', 'POST'])
def comments_handler():
    with open('comments.json', 'r') as file:
        comments = json.loads(file.read())

    if request.method == 'POST':
        newComment = request.form.to_dict()
        newComment['id'] = int(time.time() * 1000)
        comments.append(newComment)

        with open('comments.json', 'w') as file:
            file.write(json.dumps(comments, indent=4, separators=(',', ': ')))

    return Response(json.dumps(comments), mimetype='application/json',
                    headers={'Cache-Control': 'no-cache',
                             'Access-Control-Allow-Origin': '*'})


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
