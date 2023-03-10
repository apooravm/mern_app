import requests

url = "http://localhost:3000/api/user/find/63c6e9b164b0794cf36ca1b2"

payload={}
headers = {
  'token': 'Bearer <user token>'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
