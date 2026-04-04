# 检查文档内容
import requests
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

TOKEN = "d20377096e5f423a93115885cd4e505e"
FILE_ID = "CVUwJgieVGBr"
API_URL = "https://docs.qq.com/openapi/mcp"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}

payload = {
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
        "name": "get_content",
        "arguments": {
            "file_id": FILE_ID
        }
    },
    "id": 2
}

response = requests.post(API_URL, json=payload, headers=headers, timeout=30)
print(f"Status: {response.status_code}")
result = response.json()
print(result)