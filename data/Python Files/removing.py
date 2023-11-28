import json

with open('data/JSON Files/all-stats.json', 'r') as f:
    stats = json.load(f)

for player in stats:
    stats[player].pop('bye_runs')
    stats[player].pop('legbye_runs')

with open('data/JSON Files/all-stats.json', 'w') as f:
    json.dump(stats, f, indent=4)