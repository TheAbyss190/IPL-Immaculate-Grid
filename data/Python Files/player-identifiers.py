import os
import json

with open('test.json', 'r') as f:
    originalNames = json.load(f)

with open('data/JSON Files/player-identifiers.json', 'r') as f:
    newNames = json.load(f)

for identifier in originalNames.keys():
    try:
        originalNames[identifier]['name'] = newNames[identifier]['name']
    except KeyError:
        continue


with open('test2.json', 'w') as f:
    json.dump(originalNames, f, indent=4)