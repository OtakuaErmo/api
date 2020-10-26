function getDate() {
    celData = null;
    if (sessionStorage.getItem("link") === null) {
        sessionStorage.setItem("link", "http://calapi.inadiutorium.cz/api/v0/la/calendars/default/today")
    }
    fetch(sessionStorage.getItem("link")).then(function(response){
        response.json().then(function(data){
            celData = data.celebrations
            var htmlComp = "";
            var brData = data.date.split('-').reverse().join('-');
            console.log(brData);
            celData.forEach(element => {
                var htmlPadrao = `
                <div class="card bg-light mb-3 text-center">
                    <div class="card-header">${element.title}</div>
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
                    <div class="card text-center" id="cards" >
                        <div class="card-body" id="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <h6 class="card-subtitle mb-2 text-white">${element.colour}</h6>
                            <p class="card-text">${brData}</p>
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
    sessionStorage.setItem("date", date);
    sessionStorage.setItem("link", "http://calapi.inadiutorium.cz/api/v0/la/calendars/default/"+date);
}

function formatDate(data)
{
    console.log(data)
    //return str.split('-').reverse().join('-');
}

getDate();
/*
window.onbeforeunload = function() {
    sessionStorage.removeItem(data);
    return 'teste';
  };
  */