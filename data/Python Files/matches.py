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
            teams = match['info']['players']
            for team in teams.keys():
                for player in teams[team]:
                    stats[player]['matches'] += 1

with open('data/JSON Files/all-stats.json', 'w') as f:
    json.dump(stats, f, indent=4)