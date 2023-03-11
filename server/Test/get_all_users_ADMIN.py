import requests

url = "http://localhost:3000/api/user/?new=true"

payload={}
headers = {
  'token': 'Bearer <user token>'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)