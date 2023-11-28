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
                        bowler = delivery['bowler']
                        try:
                            if 'wides' in delivery['extras'].keys() or 'noballs' in delivery['extras'].keys():
                                stats[bowler]['balls_bowled'] += 0
                            else:
                                stats[bowler]['balls_bowled'] += 1
                        except KeyError:
                            stats[bowler]['balls_bowled'] += 1

                        try:
                            if 'byes' in delivery['extras'].keys():
                                stats[bowler]['bye_runs'] += delivery['extras']['byes']
                            
                            if 'legbyes' in delivery['extras'].keys():
                                stats[bowler]['legbye_runs'] += delivery['extras']['legbyes']
                        except KeyError:
                            continue
                        finally:
                            stats[bowler]['runs_conceded'] += delivery['runs']['total']
                            
for player in stats:
    stats[player]['runs_conceded'] = stats[player]['runs_conceded'] - (stats[player]['bye_runs'] + stats[player]['legbye_runs'])
    try:
        econ = (stats[player]['runs_conceded']/stats[player]['balls_bowled'])*6
    except ZeroDivisionError:
        econ = stats[player]['runs_conceded']

    stats[player]['bowling_economy'] = round(econ, 2)


with open('data/JSON Files/all-stats.json', 'w') as f:
    json.dump(stats, f, indent=4)