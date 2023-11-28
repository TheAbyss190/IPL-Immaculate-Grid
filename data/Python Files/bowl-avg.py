import json

with open('data/JSON Files/all-stats.json', 'r') as f:
    stats = json.load(f)

for player in stats:
    try:
        avg = stats[player]['runs_conceded']/stats[player]['wickets']
    except ZeroDivisionError:
        avg = stats[player]['runs_conceded']
    finally:
        
        stats[player]['bowling_avg'] = round(avg, 2)

with open('data/JSON Files/all-stats.json', 'w') as f:
    json.dump(stats, f, indent=4)