#!/usr/bin/env python3
"""Generate game art through AtlasCloud. Reads ATLASCLOUD_API_KEY from .env. Usage: gen_images.py [id ...]"""
import json, os, sys, time, urllib.request
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
for line in open(os.path.join(ROOT, ".env")):
    if "=" in line:
        k, v = line.strip().split("=", 1); os.environ[k] = v
KEY = os.environ["ATLASCLOUD_API_KEY"]
MODEL = "bytedance/seedream-v4.7/text-to-image"
STYLE = ("Whimsical storybook illustration for children, rich warm colours, soft painterly style, "
         "magical atmosphere, no text, no letters, no people's faces in close-up, wide scene. ")
jobs = json.load(open(os.path.join(ROOT, "tools", "art.json")))

def call(path, body=None):
    req = urllib.request.Request("https://api.atlascloud.ai/api/v1" + path,
        data=json.dumps(body).encode() if body else None,
        headers={"Authorization": "Bearer " + KEY, "Content-Type": "application/json", "User-Agent": "curl/8.7.1"})
    return json.load(urllib.request.urlopen(req, timeout=120))

def make(id, prompt, size):
    out = os.path.join(ROOT, "img", id + ".jpg")
    if os.path.exists(out): return
    r = call("/model/generateImage", {"model": MODEL, "prompt": STYLE + prompt, "size": size})
    pid = r["data"]["id"]
    while True:
        time.sleep(3)
        d = call("/model/prediction/" + pid)["data"]
        if d["status"] in ("completed", "succeeded"):
            url = d["outputs"][0]; break
        if d["status"] in ("failed", "canceled"): raise SystemExit(id + " failed: " + json.dumps(d)[:300])
    urllib.request.urlretrieve(url, out); print("saved", id)

want = sys.argv[1:]
from concurrent.futures import ThreadPoolExecutor
def run(j):
    for _ in range(2):
        try: return make(j["id"], j["prompt"], j.get("size", "1536*1024"))
        except Exception as e: print("retry", j["id"], e)
with ThreadPoolExecutor(6) as ex:
    list(ex.map(run, [j for j in jobs if not want or j["id"] in want]))
