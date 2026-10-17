#!/usr/bin/env python3
"""Generate music (minimax/music-3.0) and sound effects (bytedance/seed-audio-1.0) through AtlasCloud. Key from .env."""
import json, os, sys, time, urllib.request
from concurrent.futures import ThreadPoolExecutor
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
for line in open(os.path.join(ROOT, ".env")):
    if "=" in line:
        k, v = line.strip().split("=", 1); os.environ[k] = v
H = {"Authorization": "Bearer " + os.environ["ATLASCLOUD_API_KEY"], "Content-Type": "application/json", "User-Agent": "curl/8.7.1"}
def call(path, body=None):
    return json.load(urllib.request.urlopen(urllib.request.Request("https://api.atlascloud.ai/api/v1" + path, data=json.dumps(body).encode() if body else None, headers=H), timeout=120))
M = "Instrumental only, no vocals, magical orchestral children's fantasy adventure, "
MUSIC = {
 "music_menu": M + "gentle celesta and harp, mysterious and wondrous lullaby feel, slow 70 BPM, loopable, warm strings",
 "music_play": M + "playful bouncy adventure theme, pizzicato strings, woodwinds, celesta, light percussion, 110 BPM, curious and brave, loopable",
 "music_win": M + "triumphant joyful fanfare with horns, choir-like pads and glittering bells, celebration, 120 BPM, 30 seconds",
}
SFX = {
 "sfx_bolt": "Sound effect only, no voice: a fast magical spell bolt whooshing then crackling and zapping on impact, fantasy game, 2 seconds.",
 "sfx_fire": "Sound effect only, no voice: a roaring whoosh of magical fire streaming out, crackling flames, 2 seconds.",
 "sfx_water": "Sound effect only, no voice: a powerful jet of water spraying with a magical shimmer, 2 seconds.",
 "sfx_light": "Sound effect only, no voice: a bright rising magical shimmer swelling into a blinding flash with chimes, 2 seconds.",
 "sfx_patronus": "Sound effect only, no voice: soft ethereal choir swell with sparkling chimes and a gentle galloping whoosh, magical, 3 seconds.",
 "sfx_shield": "Sound effect only, no voice: a deep humming magical energy shield forming with a ringing glassy tone, then a pulse blast, 2 seconds.",
 "sfx_ice": "Sound effect only, no voice: a magical freezing zap with crackling ice forming and tinkling glass, 2 seconds.",
 "sfx_stone": "Sound effect only, no voice: a magical beam hitting followed by heavy stone grinding and a thud, 2 seconds.",
 "sfx_confetti": "Sound effect only, no voice: cartoon party popper, bouncy boing and playful sparkles, kazoo toot, 2 seconds.",
 "sfx_explosion": "Sound effect only, no voice: a big magical explosion with a deep boom, crackle and rumble, 2 seconds.",
 "sfx_levitate": "Sound effect only, no voice: a floating magical swish and a light twinkling harp glissando rising upward, 2 seconds.",
 "sfx_accio": "Sound effect only, no voice: a rushing sucking whoosh with magical tinkles flying towards the listener, 2 seconds.",
 "sfx_right": "Sound effect only, no voice: a happy rising magical chime, bright and rewarding, 1 second.",
 "sfx_wrong": "Sound effect only, no voice: a sad descending trombone wah-wah with a low rumble, children's game, 2 seconds.",
 "sfx_phoenix": "Sound effect only, no voice: a phoenix bird cry with warm fiery whoosh and magical harp sparkle, 2 seconds.",
 "sfx_hat": "Sound effect only, no voice: a mysterious magical reveal with twinkling bells and a soft whoosh, 2 seconds.",
}
def job(name):
    out = os.path.join(ROOT, "audio", name + ".mp3")
    if os.path.exists(out): return
    if name in MUSIC:
        body = {"model": "minimax/music-3.0", "prompt": MUSIC[name], "is_instrumental": True, "lyrics": "", "format": "mp3", "sample_rate": 44100, "bitrate": 128000, "enable_sync_mode": False, "enable_base64_output": False}
    else:
        body = {"model": "bytedance/seed-audio-1.0", "text": SFX[name], "format": "mp3", "sample_rate": 44100}
    for attempt in range(2):
        try:
            pid = call("/model/generateAudio", body)["data"]["id"]
            for _ in range(120):
                time.sleep(4); d = call("/model/prediction/" + pid)["data"]
                if d["status"] in ("completed", "succeeded"):
                    req = urllib.request.Request(d["outputs"][0], headers={"User-Agent": "curl/8.7.1"})
                    open(out, "wb").write(urllib.request.urlopen(req, timeout=120).read()); print("saved", name); return
                if d["status"] in ("failed", "canceled"): raise RuntimeError(json.dumps(d)[:300])
        except Exception as e: print("retry", name, e)
want = sys.argv[1:]
names = [n for n in list(MUSIC) + list(SFX) if not want or n in want]
with ThreadPoolExecutor(5) as ex: list(ex.map(job, names))
