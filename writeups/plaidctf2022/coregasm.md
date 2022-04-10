## Challenge Name: `coregasm / co`
Category: Rev
Points: 25
Solves: 107

Challenge Description: 
```
When you get a core file, you're usually pretty sad. 
Hopefully this one makes you happy.
```
The challenge provided us with a binary and it's core dump.


### Approach

Opening up the binary in Binary Ninja, I saw 4 flags being printed, which all used a global buffer defined as the input. The global buffer was filled with random data in the beginning.
![binary's main function](https://ergoadams.github.io/writeups/plaidctf2022/images/coregasm.png "binary's main function")
### Solution
Using gdb, I was able to extract the final values in the global buffer.
From there I was able to just rewrite the flag calculation function in python and run it.
Unfortunately I was able to only solve the first flag out of the four, cause of time limitations.
```python
globalbuffer = b'\xf5\xe6\xf1\xe3\xde\xc7\xc4\xcb\xc4\xcb\xc4\xfa\xc7\xc4\xcb\xc4\xcb\xc4\xd8\xa5\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85\x85'
globalbuffer = list(globalbuffer)

# FLAG 1:
print(bytes(globalbuffer))
for i in range(len(globalbuffer)):
    globalbuffer[i] ^= 0xa5

print(bytes(globalbuffer))
```
Flag:
`PCTF{banana_banana}`

---
[Back to home](https://ergoadams.github.io/writeups/plaidctf2022/)