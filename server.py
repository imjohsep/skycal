import json
import os
import time
from flask import Flask, Response, request

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
    with open(os.path.join(APP_STATIC, 'events/2016.json'), 'r') as file:
        events = json.loads(file.read())

    return Response(json.dumps(events), mimetype='application/json',
                    headers={'Cache-Control': 'no-cache',
                             'Access-Control-Allow-Origin': '*'})

if __name__ == '__main__':
    app.run(port=int(os.environ.get("PORT", 3000)))
