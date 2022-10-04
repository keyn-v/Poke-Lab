$(function() {
    $('#selector-universal').click(function() {
        $('*').addClass('selector')
    });
    
    $('#selector-id').click(function() {
        $('#correo-electronico').addClass('selector')
    });
    
    $('#selector-clase').click(function() {
        $('.campo').addClass('selector')
    });

    $('#selector-div').click(function() {
        $('div').addClass('selector')
    });

    $('#selector-p').click(function() {
        $('p').addClass('selector')
    });

    $('#selector-input').click(function() {
        $('input').addClass('selector')
    })

});

var offset = 0;

$(() => {
    $('#btnPokemons').click(() => {
        viewData(offset);
        offset = 0;
    });
    $('#btnHome').click(() => {
        page('0');
    });
    $('#btnEnd').click(() => {
        page('160');
    });
    $('#btnUp').click(() => {
        page('+');
    });
    $('#btnDown').click(() => {
        page('-');
    });
});

const page = (type) => {
    if(type == '0') {
        viewData(offset = 0);
    } else if(type == '160'){
        viewData(offset = 160)
    } else if(type == '+'){
        if(offset < 160) {
            viewData(offset += 20);
        }
    } else if (type == '-') {
        if(offset > 0){
            viewData(offset -= 20);
        }
    }
}



/*$(() => {
    $('#btnHome').click(() => {
        offset = 0;
        viewData(offset);
        
    });
    
});

$(() => {
    $('#btnEnd').click(() => {
        offset = 160;
        viewData(offset);
    });
    
});

$(() => {
    $('#btnUp').click(() => {
        offset += 20;
        viewData(offset);
    });
    
});

$(() => {
    $('#btnDown').click(() => {
        offset -= 20;
        viewData(offset);
    });
    
});*/


const viewData = (items) => {
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon?offset=${items}`,
        method: 'GET',
        success: (data) => {
            var output = '';
            var pokemonHTML = document.getElementById('pokemon');
            $.each(data.results, (index, value) => {
                new Promise((resolved, reject) => {
                    $.ajax({
                        url: value.url,
                        method: 'GET',
                        success: (pokemon) => {
                            resolved(pokemon);
    
                        },
                        error: (e) => {
                            reject(e);
                        }
                    });

                }).then((pokemon) => {
                    var abilitiesHTML = '';
                    pokemon.abilities.map((p) => {
                        abilitiesHTML +=`
                            <ul>
                                <li>${p.ability.name}</li>
                            </ul>
                        `;
                    });

                    output += `
                            <div class="card" style="width: 18rem;">
                            <img src="${pokemon.sprites.front_default}" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${value.name}</h5>
                                <p class="card-text">${abilitiesHTML}</p>
                                <a href="#" class="btn btn-primary">Base experience: ${pokemon.base_experience}</a>
                            </div>
                            </div>
                        `;                        
                        pokemonHTML.innerHTML = output;
                }).catch((e) => {
                    console.log(e);
                })     
                
            });
        },
        error: (e) => {
            console.log(e);
        }
    });
}



/*var btnPokemons = document.getElementById('btnPokemons');
btnPokemons.addEventListener('click', function(){
    $.ajax({
        url: 'https://pokeapi.co/api/v2/pokemon',
        method: 'GET',
        success: function(data) {
            var pokemonHTML = document.getElementById('pokemon');
            var output = '';
            $.each(data.results, function(index,value){
                output += `
                    <div class="card" style="width: 18rem;">
                    <img src="./assets/images/pokemon.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${value.name}</h5>
                        <a href="#" class="btn btn-primary">${value.url}</a>
                    </div>
                    </div>
                `;
            });
            pokemonHTML.innerHTML = output;
        },
        error: function(e) {
            alert('Hubo un error');
            console.log(e);
        }
    });
});*/