const notificationBtn =
document.getElementById(
    "enableNotifications"
);

if(notificationBtn){

notificationBtn.addEventListener(
    "click",
    async () => {

        const permission =
        await Notification.requestPermission();

        if(permission === "granted"){

            notificationBtn.textContent =
            "✅ Alerts Enabled";

            notificationBtn.classList.add(
                "enabled"
            );

            localStorage.setItem(
                "cuetAlerts",
                "enabled"
            );

        }

    }
);

}

async function loadStatus() {

    try {

        const response = await fetch(
            './status.json?t=' + Date.now()
        );

        const data = await response.json();

        document.getElementById(
            'lastChecked'
        ).textContent =
            data.lastChecked || 'Unknown';

        const status =
            document.getElementById(
                'status'
            );

        const button =
            document.getElementById(
                'resultBtn'
            );

        const feed =
            document.getElementById(
                'feedItems'
            );

        if (data.released) {
const alreadyNotified =
localStorage.getItem(
    "resultNotified"
);

if(
    Notification.permission ===
    "granted" &&
    !alreadyNotified
){

   const notification = new Notification(
    "CUET Result Released!",
    {
        body: "Click to check your result now.",
        icon: "/favicon.ico"
    }
);

notification.onclick = () => {
    window.open(
        data.resultUrl,
        "_blank"
    );
};

    localStorage.setItem(
        "resultNotified",
        "true"
    );
}
            status.textContent =
                '🟢 RESULT RELEASED';

            status.className =
                'status released';

            button.style.display =
                'inline-block';

            button.href =
                data.resultUrl || '#';

            feed.innerHTML = `
                <div class="feed-item">
                    Result detected at ${data.detectedAt}
                </div>
            `;

        } else {

            status.textContent =
                '🔴 RESULT NOT RELEASED';

            status.className =
                'status not-released';

            button.style.display =
                'none';

            feed.innerHTML = `
                <div class="feed-item">
                    Last scan completed successfully.
                </div>

                <div class="feed-item">
                    No result page detected yet.
                </div>
            `;
        }

    } catch (error) {

        console.error(error);

        const systemStatus =
            document.getElementById(
                'systemStatus'
            );

        if (systemStatus) {
            systemStatus.textContent =
                'Offline';
        }
    }
}

loadStatus();

setInterval(
    loadStatus,
    30000
);

let seconds = 30;

setInterval(() => {

    seconds--;

    document.getElementById(
        "countdown"
    ).textContent =
        seconds + "s";

    if(seconds <= 0){
        seconds = 30;
    }

}, 1000);
