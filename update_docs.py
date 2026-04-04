# 更新飞书文档脚本
import requests
import json
import os

# 从环境变量获取 Token（通过 shell 设置）
TOKEN = os.environ.get("DOCS_TOKEN", "d20377096e5f423a93115885cd4e505e")
FILE_ID = "CVUwJgieVGBr"
API_URL = "https://docs.qq.com/openapi/mcp"

# 今日内容
content = "## 2026-04-03（周五）\n- 日期：无事更新"

# 构建请求
# 根据腾讯文档MCP的接口格式
headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}

payload = {
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
        "name": "smartcanvas.edit",
        "arguments": {
            "action": "INSERT_AFTER",
            "file_id": FILE_ID,
            "id": "",
            "content": content
        }
    },
    "id": 1
}

print(f"Calling API: {API_URL}")
print(f"Payload: {json.dumps(payload, ensure_ascii=False)}")

try:
    response = requests.post(API_URL, json=payload, headers=headers, timeout=30)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")