#\#pwnedPasswordChecker

Whith the #pwnedPasswordChecker you are able to easily check your passwords against the database of [haveibeenpwned.com](https://haveibeenpwned.com) without sending it in plaintext to their server.

Your password is hashed localy to a SHA-1 hash, then the first five digits of that string are send to the api of haveibeenpwned.com and at the end your password hash will locally be searched inside the response of the api.
