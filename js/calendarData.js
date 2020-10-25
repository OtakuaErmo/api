function getDate() {
    celData = null;
    fetch(localStorage.getItem("date")).then(function(response){
        response.json().then(function(data){
            celData = data.celebrations
            var htmlComp = "";
            
            celData.forEach(element => {
                var htmlPadrao = `
                    <div class="card text-center" id="cards" >
                        <div class="card-body" id="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <h6 class="card-subtitle mb-2 text-white">${element.colour}</h6>
                            <p class="card-text">${data.date}</p>
                            <a class="card-link text-white">${element.rank}</a>
                            <a class="card-link text-white">${data.season}</a>
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

    switch (date) {
        case 'yesterday':
          localStorage.setItem("date","http://calapi.inadiutorium.cz/api/v0/la/calendars/default/yesterday");
            break;
        case 'today':
        localStorage.setItem("date", "http://calapi.inadiutorium.cz/api/v0/la/calendars/default/today");
            break;
        case 'tomorrow':
        localStorage.setItem("date", "http://calapi.inadiutorium.cz/api/v0/la/calendars/default/tomorrow");
            break;
        default:
            break;
    }
}

getDate();