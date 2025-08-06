
document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.getElementById("progress");
    const progressText = document.getElementById("progress-text");
    let percent = 0;
    const interval = setInterval(() => {
        if (percent < 100) {
            percent += 1;
            progressBar.style.width = percent + "%";
            progressText.textContent = percent + "%";
        } else {
            clearInterval(interval);
        }
    }, 100);

    const tips = [
        "Дослухайся до старших за званням!",
        "Не порушуй дисципліну!",
        "Воюй проти ворога, а не проти нас!",
        "Після походження КМБ знайди всій шлях!",
        "Ти станеш великим! Головне — старайся!"
    ];
    const tipsList = document.getElementById("tipsList");
    let tipIndex = 0;
    setInterval(() => {
        tipsList.innerHTML = `<li>${tips[tipIndex]}</li>`;
        tipIndex = (tipIndex + 1) % tips.length;
    }, 5000);

    if (typeof staffMembers !== 'undefined') {
        const staffList = document.getElementById("staffList");
        staffMembers.forEach(member => {
            fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=YOUR_API_KEY&steamids=${member.steamid}`)
                .then(res => res.json())
                .then(data => {
                    const player = data.response.players[0];
                    const div = document.createElement("div");
                    div.className = "staff-entry";
                    div.innerHTML = \`
                        <img src="\${player.avatar}" alt="avatar">
                        <div>
                            <strong>\${player.personaname}</strong><br />
                            <span>\${member.role}</span>
                        </div>
                    \`;
                    staffList.appendChild(div);
                });
        });
    }
});
