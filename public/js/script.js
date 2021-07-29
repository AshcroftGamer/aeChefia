function ok(){
    alert("clickou")
};

function process(quant){
  var value = parseInt(document.getElementById("quant").value);
  value+=quant;
  if(value < 1){
    document.getElementById("quant").value = 1;
  }else{
  document.getElementById("quant").value = value;
  }
}
// var check_menu = document.querySelector('#menu-js')
// var menu1 = document.getElementById('menu')
// function menu(){
// var menu 
// if (check_menu.value == on) {
//   menu = menu1.style.transition = "transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0)"
// }else{
//   menu = menu1.style.transitionProperty = "none"
// }
// }


// var menu2 = document.getElementById('menu')
// function menu(){
//   menu1 = menu2.style.transitionProperty = "none"
// window.onload = menu1
// }




//A variável de ID ficou fora das funções para manter o estado...
let id = 0;

//Retorna o próximo ID válido para a DIV que será criada
function getNextId() {
  return ++id;
}

//Sua função, chamada no click do botão
function criarDiv(){
    //Pego o ID
    let id = getNextId();
    //Crio a DIV
    let divElement = document.createElement("div");
    var conteudoNovo = document.createTextNode(id);
    divElement.appendChild(conteudoNovo);
    //Pego a DIV onde a nova DIV será criada, sempre na DIV mãe
    let divMae = document.getElementById("mesas");

    //A ideia do ID é que ele seja um elemento único, ou seja, não se repita
    divElement.setAttribute('id', 'box' + id.toString());

    //CSS
    divElement.style.width = "66px";
    divElement.style.height = "66px";
    divElement.style.backgroundColor = '#666666';
    divElement.style.display = '';
    divElement.style.opacity = '0.1';
    divElement.style.marginLeft = '5%';
    divElement.style.margin = '10px'
    divElement.classList.add("bounceIn")
    divElement.style.paddingTop = '23px'
    divElement.style.textAlign = 'center'
    
    

    //Essa parte é mais para deixar claro que outras divs estão sendo criadas, criando um degrade
    //divElement.style.backgroundColor = "#f0" + id.toString();

    //Adiciono a nova DIV na DIV mãe
    //Aqui poderia ser por exemplo document.body.appendChild, adicionando assim o elemento criado diretamente no body
    divMae.appendChild(divElement);
    // document.body.appendChild(divElement)
    console.log("rodou")
}
