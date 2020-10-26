function getDate() {
    celData = null;
    //caso nao tenha ainda nada na sessionStorage, essa condicao seta como padrao o link para o dia em qua o usuario estiver acessando
    if (sessionStorage.getItem("link") === null) {
        sessionStorage.setItem("link", "http://calapi.inadiutorium.cz/api/v0/en/calendars/default/today")
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
                var formatColour = element.colour.substring(0,1).toUpperCase().concat(element.colour.substring(1));
                var formatRank = element.rank.substring(0,1).toUpperCase().concat(element.rank.substring(1));
                //!formatando dados
                //definindo a coloracao do texto element.colour
                if (element.colour === 'white') {
                    sessionStorage.setItem("day_colour", "white");
                }if (element.colour === 'red') {
                    sessionStorage.setItem("day_colour", "red");
                }if (element.colour === 'green') {
                    sessionStorage.setItem("day_colour", "green");
                }if (element.colour === 'purple') {
                    sessionStorage.setItem("day_colour", "purple");
                }if (element.colour === 'black') {
                    sessionStorage.setItem("day_colour", "black");
                }if (element.colour === 'pink') {
                    sessionStorage.setItem("day_colour", "pink");
                }
                //!definindo coloracao do element.colour
                var htmlPadrao = `
                <div class="card bg-light mb-3 text-center">
                    <div class="card-header">${formatWeekday}, ${formatDate}</div>
                        <div class="card-body">
                            <h5 class="card-title">${formatTitle}</h5>
                            <p class="card-text mb-0">Season and Season Week: ${formatSeason}, ${data.season_week}</p>
                            <p class="card-text mb-0" id="day-${sessionStorage.getItem("day_colour")}">Colour: ${formatColour}</p>
                            <p class="card-text mb-0">Rank: ${formatRank}</p>
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
    sessionStorage.setItem("link", "http://calapi.inadiutorium.cz/api/v0/en/calendars/default/"+date);
    //sessionStorage.setItem("active", true);
}

getDate();