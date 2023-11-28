import json

with open('all-players.json', 'r') as f:
    all_players = json.load(f)

all_players_dict = {}

for player in all_players:
    all_players_dict[player] = {
        'teams': [],
        'matches': 0,
        'runs': 0,
        'batting_avg': 0,
        'batting_strike_rate': 0,
        'wickets': 0,
        'bowling_economy': 0,
        'bowling_avg': 0
    }

with open('all-stats.json', 'w') as f:
    json.dump(all_players_dict, f, indent=4)