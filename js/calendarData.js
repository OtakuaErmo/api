function getDate() {
    celData = null;
    if (sessionStorage.getItem("link") === null) {
        sessionStorage.setItem("link", "http://calapi.inadiutorium.cz/api/v0/la/calendars/default/today")
    }
    fetch(sessionStorage.getItem("link")).then(function(response){
        response.json().then(function(data){
            celData = data.celebrations
            var htmlComp = "";
            celData.forEach(element => {
                //formatando dados
                var formatDate = data.date.split('-').reverse().join('/');
                var formatWeekday = data.weekday.substring(0,1).toUpperCase().concat(data.weekday.substring(1));
                var formatTitle = element.title.toUpperCase().bold();
                var formatSeason = data.season.substring(0,1).toUpperCase().concat(data.season.substring(1));
                //!formatando dados
                var htmlPadrao = `
                <div class="card bg-light mb-3 text-center">
                    <div class="card-header">${formatWeekday}, ${formatDate}</div>
                        <div class="card-body">
                            <h5 class="card-title">${formatTitle}</h5>
                            <p class="card-text mb-0">Season and season week: ${formatSeason}, ${data.season_week}</p>
                            <p class="card-text mb-0">Colour: ${element.colour}</p>
                            <p class="card-text mb-0">Rank: ${element.rank}</p>
                        </div>
                    </div>
                `;
                htmlComp += htmlPadrao;
                document.getElementById("datas").innerHTML = htmlComp;
            });
        })
    }).catch(function(err){
        console.error(err);
    })
}

function selectDate(date){
    sessionStorage.setItem("date", date);
    sessionStorage.setItem("link", "http://calapi.inadiutorium.cz/api/v0/la/calendars/default/"+date);
}

getDate();