## Challenge Name: `i_c_u / hyperopia`
Category: Misc
Points: 200
Solves: 71

Challenge Description: 
```In the Plaidiverse, we will soon need to deal with zillions of exabytes of data. 
For proactive future-proof bandwidth utilization, we organize similar data together, 
enabling multi-modal analysis and semantic compression at scale. 
As the first of many upcoming products under this umbrella, 
we introduce i_c_u: the image-collation-utility library. 
icu.chal.pwni.ng:1337
```
From the rust script I was able to figure out that to get the flag you must provide two images, that when OCR-d get the text of `give me the flag`. The images must also have a different hash and have the difference of only 1 bit.

The image hash is calculated by resizing and grayscaling the image. [(Refernce for the hash)](http://www.hackerfactor.com/blog/index.php?/archives/432-Looks-Like-It.html)

### Approach

It seemed the easiest, to just make a small image that has the correct text on it. By messing around with single bits, I found a solution that changed the image just enough to make the hash change, but keep the text readable.
I had to use `.jpg` images, cause `.png` files have checksums that prevent changing a single bit while still working.

### Solution
Solution images used:
  ![solution image 1](https://ergoadams.github.io/writeups/plaidctf2022/images/icu1.jpg "Solution image 1")
  ![solution image 2](https://ergoadams.github.io/writeups/plaidctf2022/images/icu2.jpg "Solution image2")

---
[Back to home](https://ergoadams.github.io/writeups/plaidctf2022/)