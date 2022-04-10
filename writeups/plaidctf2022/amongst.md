## Challenge Name: `Amongst Ourselves: Shipmate / Upload Data`

Category: Misc  
Points: 70  
Solves: 42  

Challenge Description: 
```
PPP is proud to announce a completely original, platform-exclusive game for Plaidiverse! 
With novel socially deceptive mechanics, Amongst Ourselves™ has been recognized with the
"Best-In-Class"® and "Best Narrative Game"® awards at the 2022 Plaidies℗℗℗ Game Awards™.
Available now at e-shops near you in the Plaidiverse!!

When Blue's body is found in the communications room, Brown thinks the file she was processing
may contain a hint about who killed her. (Misc. Hint: take a look at FileTransferController.ts.)
```
The challenge provided us with a all the server and client files that are used to host the Amonst Ourselves game.


### Approach

The `Upload data` minigame had two tasks you had to interact with, both seemingly being just a progress bar. As the game used websockets for connections, Firefox was not able to show the traffic. Using Wireshark I was able to capture the minigames traffic and save it as a seperate file. Looking at the file, I saw multiple packets of base64 data being sent.

![example of data being sent](https://ergoadams.github.io/writeups/plaidctf2022/images/wireshark.png "example of data being sent")

With a simple python script I was able to extract and decode all of the data.
```python
import base64

with open("download.txt", "r") as fp:
    data = fp.read().split("No.     ")

output = ""
print(data[0])


with open("output.txt", "wb") as fp:
    for packet in data:
        if "\"data\":" in packet:
            temp_packet = packet.split("WebSocket\nData")
            temp_output = ""
            for line in temp_packet[1].split("\n"):
                if len(line) > 20:
                    temp_line = line.split("   ")
                    if len(temp_line[1]) == 16:
                        temp_output += temp_line[1]
            temp_output = temp_output.split("\"data\":\"")
            temp_output = temp_output[1].split("\"}")
            temp_output = temp_output[0]
            fp.write(base64.b64decode(temp_output))
```
Do note, that this is very janky workaround of just parsing the pcap file with something like dpkt.
Anyways, I was first confused as what the output was supposed to be. The output seemed like binary data with some HTTP requests in between. Finally I realized, that the data was another pcap file. Renaming it and opening it with Wireshark was a success!
With another python script I was able to extract the data and save it as an image!
```python
import dpkt
import datetime
from dpkt.utils import mac_to_str, inet_to_str

filename='img2.pcap'

pcap = dpkt.pcap.Reader(open(filename,'rb'))

output = []

for timestamp, buf in pcap:
    eth = dpkt.ethernet.Ethernet(buf)
    ip = eth.data
    if isinstance(ip.data, dpkt.tcp.TCP):
        tcp = ip.data
        http = dpkt.http.Response(tcp.data)
        if len(output) == 0:
            output = [0]*int(http.headers['content-range'].split("/")[1])
        range_start = int(http.headers['content-range'].split("-")[0].split(" ")[1])

        for i, char in enumerate(http.body):
            output[range_start+i] = char


with open("output.png", "wb") as fp:
    fp.write(bytes(output))
```

Opening the image revealed this beauty...  
The bottom part of the image is broken cause I never managed to capture the final part of the image sent.  
![final output](https://ergoadams.github.io/writeups/plaidctf2022/images/redsus.png "final output")

Flag:
`PCTF{[BOTTOM TEXT]}`


---
[Back to home](https://ergoadams.github.io/writeups/plaidctf2022/)