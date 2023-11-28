import json
import os

with open('data/JSON Files/all-stats.json', 'r') as f:
    stats = json.load(f)

dir_path = '/Users/rishabnarayana/Documents/Coding Projects/IPL Immaculate Grid/data/ipl_json'

for file in os.listdir(dir_path):
    if file.endswith('.json'):
        with open(os.path.join(dir_path, file), 'r') as f:
            match = json.load(f)
            innings = match['innings']
            for inning in innings:
                for over in inning['overs']:
                    for delivery in over['deliveries']:
                        try:
                            playerOut = delivery['wickets'][0]['player_out']
                            stats[playerOut]['outs'] += 1
                        except KeyError:
                            continue

for player in stats:
    try:
        stats[player]['batting_avg'] = stats[player]['runs']/stats[player]['outs']
    except ZeroDivisionError:
        stats[player]['batting_avg'] = stats[player]['runs']

    stats[player]['batting_avg'] = round(stats[player]['batting_avg'], 2)

with open('data/JSON Files/all-stats.json', 'w') as f:
    json.dump(stats, f, indent=4)