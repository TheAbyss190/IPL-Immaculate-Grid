import os
import json

script_dir = os.path.dirname(os.path.abspath(__file__))
dir_path = os.path.join(script_dir, "..", "ipl_json")

all_players_obj = {}

for file in os.listdir(dir_path):
    if file.endswith('.json'):
        with open(os.path.join(dir_path, file), 'r') as f:
            match = json.load(f)
            teams = match['info']['players']
            registry = match['info']['registry']['people']
            for team in teams.keys():
                for player in teams[team]:
                    all_players_obj.update({
                        registry[player]: {
                            'name': player
                        }
                    })

with open('test.json', 'w') as f:
    json.dump(all_players_obj, f, indent=4)