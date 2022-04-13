This extension allows US to create google meet links using Google Calander API by
using chrome identity as the OAuth Provider.

By using the google calender API and chrome identity I can able to create google calender event
along with a google meet.

Using chrome identity available from chrome extension pack it allowed me to get the current user's
OAuth token who is enabled his Chrome Syncing with his google account.

And this extension only works with google chrome not other chrome powered devices etc.

The simple process is to get the OAuth token form google chrome identity and pass the token
we got from the identity we call the Google Calender API's passing token as `Bearer`.

This allowed me to achedive what I needed.

Issues:

- Only Chrome Browser Works
- User need to sync his account with google chrome
- Not able to Use Other accounts.
