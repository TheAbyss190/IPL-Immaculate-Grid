import json
import os

with open('data/JSON Files/all-stats.json', 'r') as f:
    stats = json.load(f)

script_dir = os.path.dirname(os.path.abspath(__file__))
dir_path = os.path.join(script_dir, "..", "ipl_json")

for file in os.listdir(dir_path):
    if file.endswith('.json'):
        with open(os.path.join(dir_path, file), 'r') as f:
            match = json.load(f)
            innings = match['innings']
            for inning in innings:
                for over in inning['overs']:
                    for delivery in over['deliveries']:
                        try:
                            if not (delivery['wickets'][0]['kind'] == 'run out'):
                                bowler = delivery['bowler']
                                stats[bowler]['wickets'] += 1
                        except KeyError:
                            continue

with open('data/JSON Files/all-stats.json', 'w') as f:
    json.dump(stats, f, indent=4)