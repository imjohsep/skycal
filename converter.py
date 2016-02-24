# import json
# import time

# with open('events.json', 'r') as file:
        # events = json.loads(file.read())
# for i in events['eventList']:
#     # Jan 02 05:30
#     t = '2016 ' + i['date']
#     x = time.strptime(t, "%Y %b %d %H:%M")
#     y = time.strftime("%d %b %Y %H:%M", x)
#     i['date'] = y

# with open('newEvents.json', 'w') as f:
    # f.write(json.dumps(events, indent=4, separators=(',', ': ')))


# with open('newEvents.json', 'r') as f:
    # events = json.loads(f.read())

# for i in events['eventList']:
        # print(i['event'])