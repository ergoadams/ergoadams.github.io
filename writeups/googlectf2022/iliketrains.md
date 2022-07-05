## Challenge Name: `iliketrains`

Category: Hardware  
Points: 314  
Solves: 17  

Challenge Description: 
```
I created this special map for all those OpenTTD fans out there, enjoy!

Note: Non-standard flag format, use CTF{bits}
```

The challenge provided us with an OpenTTD save file.

### Approach

"OooOOh... An [OpenTTD](https://www.openttd.org/) challenge!" I thought to myself. Also in the hardware category? What could it be?  
After a quick visit to OpenTTD's webpage to download the latest version I was ready to open up the save file. I was shocked by massive amount of rails. It took me a while to scroll through the map without zooming out the first time.  
![Minimap](https://ergoadams.github.io/writeups/googlectf2022/images/minimap.png "Minimap")  
Seeing what seemed like 32 inputs and a single output I understood what it was: a similar challenge to Google CTF 2019 Minetest challenge. Quick recap to LiveOverflow's channel to refresh my mind with the approach he took.  
**Step 1: Parsing the map.**  
What I thought would be a little glance at a hardware challenge turned into me writing a map parser for OpenTTD pretty fast.  
Looking at different projects on Github, I found OpenTTD Surveyor, that can make renders of an OpenTTD map. Running that script on my potato PC just hung it. Oh well...  
Picking out the important parts from that project, I managed to extract data about rails in the map. I was well on my way to solve the challenge!  
After messing around with the different logic gates implemented in OpenTTD's logic, I came up with replacements in the ASCII version of the map to simplify the logic gates.  
**Step 2: Solving the circuit.**  
I had never touched [z3](https://github.com/Z3Prover/z3) (a theorem prover) before, I'm glad LiveOverflow posted his script on Github. Whew... Looking back at it now, z3 is pretty simple and I'm sure I'll find uses for it other than CTFs. Applied physics in university? Here I come!  
With all of that done, it's time to write a solution script and run it.

### Solution

Disclaimer:  
My original script was split into 3 different files + some manual work, but I decided to clean the code up a little for this writeup and make it into a single file.

```python
#
# Solution for Google CTF 2022 hardware challenge iliketrains
# OpenTTD map parser hacked together from parts of OpenTTD surveyor (https://github.com/aidansean/OpenTTD_surveyor)
# Circuit solver is a modified script from LiveOverflow's Google CTF 2019 solution for a similar challenge (https://www.youtube.com/watch?v=nI8Q1bqT8QU, 
#                                                                                                           https://gist.github.com/LiveOverflow/1480ee7e1ffead942063c638d5b66804)
#
# Script written/hacked together by Ergo
# Links to my stuff:
# https://github.com/ergoadams
# Discord: Ergo#7487
#
# Team invites are welcome, if you need a rev/hardware player ;)
#

# Parse the map and read rail positions

import lzma

save_name = "challenge.sav"

with open(save_name, "rb") as fp:
    data = fp.read()

# Decompress the save file
uncompressed_data = lzma.decompress(data[8:])

# Get map size
offset = uncompressed_data.find(b"MAPS") + 22
dim_x = int.from_bytes(uncompressed_data[offset:offset+4], byteorder='big')
dim_y = int.from_bytes(uncompressed_data[offset+4:offset+8], byteorder='big')
print("Map dimensions: {}x{}".format(dim_x, dim_y))

# Read map tile data, only MAPT and MAP5 are needed to get rail positions and types
maps_info = { 
            # name: [bytes in tile, data offset from section name, map index]
            b'MAPT': [1, 8, 0],
            b'MAP5': [1, 8, 6],
        }

full_map = {}
for l, map_name in enumerate(maps_info):
    print("Loading {}".format(map_name))
    offset = uncompressed_data.find(map_name) + maps_info[map_name][1]
    m = maps_info[map_name][0]
    for i in range(dim_x*dim_y):
        if i in full_map.keys():
            full_map[i].append(int.from_bytes(uncompressed_data[offset+(i*m):offset+((i+1)*m)], byteorder='big'))
        else:
            full_map[i] = [int.from_bytes(uncompressed_data[offset+(i*m):offset+((i+1)*m)], byteorder='big')]

print("Loading map data done!")

# Parse tile bits and write them to a file
output_map = []
print("Parsing tile bits")
# The map is only about 3745 x 1205 tiles
for y in range(3745):
    row = []
    for x in range(1205):
        if (4096*x + y) in full_map.keys():
            tile = full_map[(4096*x + y)]
            bridge = (tile[0] >> 2) & 0b11
            kind = (tile[0] >> 4) & 0b1111
            # I'm still not totally sure what rail kind is what, but I hacked it together
            # based on the map in game. Atleast it works
            if kind == 1:
                if (tile[1] & 0b1) != 0:
                    row.append("|")
                elif (tile[1] & 0b10) != 0:
                    # If the horizontal track is also a bridge, make it a cross
                    if bridge != 0:
                        row.append("+")
                    else:
                        row.append("-")
                elif (tile[1] & 0b100) != 0:
                    row.append("/")
                elif (tile[1] & 0b1000) != 0:
                    row.append("/")
                elif (tile[1] & 0b10000) != 0:
                    row.append("\\")
                elif (tile[1] & 0b100000) != 0:
                    row.append("\\")
            elif kind == 9:
                # Maybe those were sloped rails?
                row.append("|")
            elif bridge != 0:
                row.append("|")
            else:
                row.append(" ")
    row.append("\n")
    output_map.append(row)

# We still need to replace some of the data in the text format to make it easier to solve
# We can test some signals on the different implemented gates in game and replace them with simples formats
# Gate replacements
# NOT gate
#  |        |
# /|\       N
# |\|\  ->  \-\
# \-/|        |  
#    |        |
#
# OR gate
# |  |      |  |
# |--|  ->  \-O/
# \-//        |
#   |         |
#
# AND gate
# | |       | |
# \\|  ->   \A/
#  \|        |
#
# There are also some janky splits that don't get seen by the solving algorithm, when started from the output
# Let's also replace them while we are at it

for y, line in enumerate(output_map):
    line_as_string = "".join(line)
    # Replace NOT gates
    line_as_string = line_as_string.replace("/|\\", " N ")
    line_as_string = line_as_string.replace("|\\|\\", " \\-\\")
    line_as_string = line_as_string.replace("\\-/|", "   |")
    # Replace OR gates
    line_as_string = line_as_string.replace("|--|", "\-O/")
    line_as_string = line_as_string.replace("\-//", "  | ")
    # Replace AND gates
    line_as_string = line_as_string.replace("\\\\|", "\A/")
    output_map[y] = list(line_as_string)[::]
    for x, char in enumerate(line_as_string):
        if char == "|":
            try:
                if output_map[y+1][x] == "-":
                    output_map[y+1][x] = "M"
            except:
                pass

# Additionally we need to swap one of the two rails under an AND gate with "\" to make the solver trace it correctly
for y, line in enumerate(output_map):
    res = [i for i in range(len(line)) if line[i] == "A"]
    for pos in res:
            output_map[y+1][pos+1] = "\\"

# While we are at it, let's add the inputs to the map
output_map[6][5:37] = list("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")

# Let's also save the map for fun
# TODO: make a high quality render of it
with open("output_map.txt", "w") as fp:
    for line in output_map:
        fp.write("".join(line))

# It's time to trace the circuit!
from z3 import *

TRACES = 0
VISITED = {}

# A slightly modified trace function from LiveOverflow
def trace(pos, d):
    global TRACES
    global VISITED
    TRACES += 1
    x,y = pos
    while True:
        try:
            c = output_map[x][y]
        except:
            print((x, y))
        if c == '-' and d == 'right':
            y+=1
        elif c == '-' and d == 'left':
            y-=1
        elif c == '-' and d == 'up':
            y-=1
            d = 'left'
        elif c == '|' and d == 'up':
            x-=1
        elif c == '|' and d == 'left':
            x-=1
            d = 'up'
        elif c == '|' and d == 'right':
            x-=1
            d = 'up'
        elif c == '/' and d == 'left':
            y += 1
            d = 'right'
        elif c == 'M' and d == 'left':
            x -= 1
            d = 'up'
        elif c == 'M' and d == 'right':
            x -= 1
            d = 'up'
        elif c == 'A' and d == 'up':
            if 'AND_{}_{}'.format(x,y) not in VISITED:
                VISITED['AND_{}_{}'.format(x,y)] = simplify(And(trace((x,y-1),'left'), trace((x,y+1),'right')))
            return VISITED['AND_{}_{}'.format(x,y)]
        elif c == 'O' and d == 'up':
            if 'OR_{}_{}'.format(x,y) not in VISITED:
                VISITED['OR_{}_{}'.format(x,y)] = simplify(Or(trace((x,y+1),'right'), trace((x,y-2),'left')))
            return VISITED['OR_{}_{}'.format(x,y)]

        elif c == 'N' and d == 'up':
            if 'NOT_{}_{}'.format(x,y) not in VISITED:
                VISITED['NOT_{}_{}'.format(x,y)] = simplify(Not(trace((x-1,y), 'up')))
            return VISITED['NOT_{}_{}'.format(x,y)]
        elif c == '+' and d == 'right':
            y+=1
        elif c == '+' and d == 'left':
            y-=1
        elif c == '+' and d == 'up':
            x-=1

        elif c == '\\' and d == 'left':
            x-=1
            d = 'up'
        elif c == '\\' and d == 'up':
            y-=1
            d = 'left'
        elif c == '/' and d == 'up':
            y+=1
            d = 'right'
        elif c == '/' and d == 'right':
            x-=1
            d = 'up'
        elif c == 'I':
            return Bool('input_{}'.format(y))
        else:
            print("ERROR ({}/{}) {}: {}".format(x,y,d,c))
            exit(0)

# Start tracing from the output
print("Tracing the circuit")
circuit  = trace((3740,7), 'up')
print("Tracing done!")

# And finally... Solve it!
print("Solving!")
solved = solve(circuit==True)

# Here we go! Our final answer
# [input_18 = False,
# input_19 = True,
# input_32 = False,
# input_16 = False,
# input_9 = False,
# input_13 = True,
# input_35 = True,
# input_36 = True,
# input_8 = False,
# input_11 = True,
# input_15 = True,
# input_27 = True,
# input_6 = True,
# input_5 = True,
# input_29 = True,
# input_12 = False,
# input_25 = True,
# input_30 = False,
# input_20 = True,
# input_28 = False,
# input_7 = True,
# input_10 = False,
# input_24 = False,
# input_23 = False,
# input_33 = False,
# input_14 = False,
# input_22 = False,
# input_17 = False,
# input_31 = True,
# input_26 = False,
# input_21 = True,
# input_34 = False]

# Sort the inputs and replace False -> 0, True -> 1
```

Flag:
`CTF{11100010101000111000101010100011}`

### Extra

A high quality render of the full map made from the saved ASCII version of the map.  
Be careful, the image is 12050x37460 pixels in size!  
[Link to the image](https://ergoadams.github.io/writeups/googlectf2022/images/render.png)

---
[Back to home](https://ergoadams.github.io/writeups/googlectf2022/)