import requests
import json

url = "http://localhost:3000/api/auth/register"

payload = json.dumps({
  "username": "admin",
  "email": "admin@gmail.com",
  "password": "1234"
})
headers = {
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
