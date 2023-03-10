import requests
import json

url = "http://localhost:3000/api/auth/login"

payload = json.dumps({
  "username": "admin",
  "password": "1234"
})
headers = {
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)