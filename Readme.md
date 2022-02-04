
### Google OAuth with Google Sheets API and Gmail API

- Newsletter Integration with Email and Google Sheets.

How to setup :

- clone the repo.
- Download Gooogle OAuth Credentials from [Here](https://console.cloud.google.com/projectselector2/apis/credentials?organizationId=0&supportedpurview=project)
- Setup tokens.json [here](https://developers.google.com/oauthplayground/)
- Setup sheets_data.json

*sheets_data.json*
```
{  
	"newsletter-id" : "google sheets id"  
}
```

*tokens.json*
```
{  
  "access_token":"access_token",  
  "refresh_token":"refresh_token",  
  "scope":"https://mail.google.com/ https://www.googleapis.com/auth/spreadsheets",  
  "token_type":"Bearer",  
  "expiry_date": _expiry_date,  
  "redirect_uris": ["http://localhost:3000/callback"]  
}
```

*credentials.json*
```
{  
  "web": {  
    "client_id": "client_id",  
  "project_id": "project_id",  
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",  
  "token_uri": "https://oauth2.googleapis.com/token",  
  "auth_provider_x509_cert_url": "auth_provider_x509_cert_url",
  "client_secret": "client_secret",  
  "redirect_uris": [ "http://localhost:3000/callback" ]
  }  
}
```