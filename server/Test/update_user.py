import requests
import json

url = "http://localhost:3000/api/user/find/63c6e9b164b0794cf36ca1b2"

payload = json.dumps({
  "username": "monUpdated"
})
headers = {
  'token': 'Bearer <user token>',
  'Content-Type': 'application/json'
}

response = requests.request("PUT", url, headers=headers, data=payload)

print(response.text)