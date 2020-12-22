const button = document.getElementById('button')
const listacompleta = document.getElementById('pokedex');

var caja = document.getElementById('caja')
var img = document.getElementById('img')
var p = document.getElementById('info')
var tipos = document.getElementById("tipos")

const buscaPoke = _ => {
    let xhttp = new XMLHttpRequest()
    let textoCaja = document.getElementById('caja').value
    xhttp.open("GET",`https://pokeapi.co/api/v2/pokemon/${textoCaja}`)
    xhttp.send()

    xhttp.onreadystatechange=function () {
        if (this.readyState==4 && this.status==200) {
            let datoPokemon=JSON.parse( this.responseText)
            console.log(datoPokemon)
            img.setAttribute("src",datoPokemon.sprites.front_default)
            p.textContent = datoPokemon.name
            if (datoPokemon.types[1] != null){
                tipos.textContent= datoPokemon.types[0].type.name + ' / ' + datoPokemon.types[1].type.name
            } else {
                tipos.textContent= datoPokemon.types[0].type.name
            }
            
        } else {
        	img.setAttribute("src","https://www.latercera.com/resizer/CBmGvvFEACkiaL4Diatt7wyUqlM=/900x600/smart/arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/LUOOHUM2OVEEXG7ZTRSNI6XWLY.png")
        	p.textContent=`No encontrado, prueba otra vez`
            tipos.textContent= ''
        }
    }
}

//función para que aparezcan búsquedas dinámicas en la caja, según escribimos van
//apareciendo nombres que matcheen. La llamamos al fondo del script
const todosPoke = _ => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1200')
    .then(response => response.json())
    .then(data => {
        crearLista(data.results);
    })
}


const crearLista = pokemons => {
  var nombres = pokemons.map(
    function(nombre){ return nombre['name'] }
    )

  let listatmp = ''

  Object.keys(nombres).forEach(i => {
    listatmp += `<option value="${nombres[i]}"/>`
  })
 
  listacompleta.innerHTML = listatmp;
  caja.addEventListener('change', buscaPoke)
}

button.addEventListener('click', buscaPoke)
todosPoke()