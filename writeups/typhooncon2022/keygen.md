## Challenge Name: `KeyGenMe`

Category: Rev  
Points: 200  

Challenge Description: 
```
This is just a standard Key Generator... or is it?
Flag format: ...
(No "SSD" or "{" ... "}")
```

The challenge provided us with a binary file. From the main function of the binary, we can see that we are prompted for a password, which is then SHA1 hashed and compared to a constant value `2DC37BAACD58BEDBAA48FBB095E1536728524026`. There are also two interesting functions: Get_Band_Name and Hint.

### Approach

Looking and both those functions in Binary Ninja in the linear disassembly form doesn't seem to give anything... Weird.
![decompiled functions](https://ergoadams.github.io/writeups/typhooncon2022/images/keygenme1.jpg "Decompiled functions")
Looking at them again in the disassembly graph reveals a lot of loads happening!
![decompiled functions vol 2](https://ergoadams.github.io/writeups/typhooncon2022/images/keygenme2.jpg "Decompiled functions vol 2")
We can copy those values over, seems like the end of the string(?) is loaded first, indicated by the null byte.
Get_Band_Name functions loads the following hex string: `6163696c6c6174654d0ebf9ccbf47ecbdd7759872812deab3cddaa987a413a43ff00`
Convert that to ascii and you get mostly garbage, except for the first 9 letters. I guess I was wrong with the string being stored reversed. Reversing it again gives us the band name: Metallica.
Our Hint function is a little smaller. We get the following hex string: `9db1c3c4b5c270a0c5c0c0b5c4c300`
Hmm... Doesn't seem like anything. Let's try to brind the values to ascii range. Trying different offsets we stumble upon offset 0x50, which gives us a song name from Metallica, Master of Puppers.
What should we do with all of that?
Running `strings` on the binary we find a block of base64 encoded data which says:
```
Nice job!
You're far from done though.
Inside this binary file, hidden are a song name and its band's name.
After finding out the song, the password is three consecutive words from its lyrics.
All lowercase, words seperated by a "_"
```

Oh.. I guess I solved it in the reverse order then. Let's just bruteforce the song lyrics and SHA1 hash them.

### Solution

In the end we find those three words: come_crawling_faster.

Flag:
`come_crawling_faster`

---
[Back to home](https://ergoadams.github.io/writeups/typhooncon2022/)