import json
import requests
from datetime import datetime

PAGES = [
    "https://cuet.nta.nic.in/",
    "https://nta.ac.in/"
]

KEYWORDS = [
    "download scorecard",
    "view result",
    "cuet ug result",
    "score card",
    "scorecard"
]

released = False
result_url = None

for page in PAGES:

    try:

        html = requests.get(
            page,
            timeout=20
        ).text.lower()

        for word in KEYWORDS:

            if word in html:
                released = True
                result_url = page
                break

        if released:
            break

    except:
        pass

data = {
    "released": released,
    "lastChecked":
        datetime.now().strftime(
            "%d %b %Y %I:%M:%S %p"
        ),
    "detectedAt":
        datetime.now().strftime(
            "%d %b %Y %I:%M:%S %p"
        ) if released else None,
    "resultUrl": result_url
}

with open(
    "results26/status.json",
    "w"
) as f:
    json.dump(
        data,
        f,
        indent=2
    )