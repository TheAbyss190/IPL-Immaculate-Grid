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
                        batter = delivery['batter']
                        try:
                            if 'wides' in delivery['extras'].keys():
                                stats[batter]['balls_faced'] += 0
                            else:
                                stats[batter]['balls_faced'] += 1
                        except KeyError:
                            stats[batter]['balls_faced'] += 1

                        

for player in stats:
    try:
        str_rate = (stats[player]['runs']/stats[player]['balls_faced'])*100
    except ZeroDivisionError:
        str_rate = stats[player]['runs']

    stats[player]['batting_strike_rate'] = round(str_rate, 2)

with open('data/JSON Files/all-stats.json', 'w') as f:
    json.dump(stats, f, indent=4)

