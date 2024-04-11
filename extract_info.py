import sys
import os

def option_names(id):
	files = [
		['Biomas:', 'biomes.js'],
		['Montanhas:', 'mountains.js'],
		['Águas:', 'waters.js'],
		['Ilhas:', 'islands.js'],
		['Povoações:', 'villages.js'],
		['Pontos de interesse:', 'poi.js'],
	]

	for f in files:
		print(f[0])
		with open(os.path.join('marker', f[1]), 'r') as file:
			lines = file.readlines()
			for idx, line in enumerate(lines):
				if id in line:
					print("- " + lines[idx+1].strip(" \n\r\t,\"").replace('name": ', '').replace('"', ''))
		print()

def print_help():
	print("Usage: extract_info.py [options] <input_file>")
	print("Options:")
	print("  -h, --help: Print this help message")
	print("  -names [id]: Print region names starting with id")

if len(sys.argv) < 2:
	print_help()
	sys.exit(1)

if sys.argv[1] == "-h" or sys.argv[1] == "--help":
	print_help()
	sys.exit(0)

if sys.argv[1] == "-names":
	if len(sys.argv) < 3:
		print("Error: missing id")
		sys.exit(1)
	id = sys.argv[2]
	option_names(id)
	sys.exit(0)