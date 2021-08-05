
function ok() {
  alert( "clickou" )
};

function process( mesa ) {
  var value = parseInt( document.getElementById( "mesa" ).value );
  value += mesa;
 
  if ( value < 1 ) {
    document.getElementById( "mesa" ).value = 1;
  } else {
    document.getElementById( "mesa" ).value = value;
  }

}
// function rodaSenha(){

//     let senha = document.getElementById('senha')
//   // let olho = document.getElementById('olho')
//   senha.style.backgroundImage.setAttribute = ("onclick", ViewSenha())
// }


function ViewSenha(){
  let senha = document.getElementById('senha')
// let olho = document.getElementById('olho')

if(senha.getAttribute('type') == ("password") ){
  senha.setAttribute("type", "text")
  document.getElementById("olho").src = "/img/view.png"
  console.log("rodou1")
}else{
    senha.setAttribute("type", "password")
document.getElementById("olho").src = "/img/hidden.png"
console.log("rodou2")
}

}

const splash = document.querySelector('.splash');
document.addEventListener('DOMContentLoaded',(e)=>{
  setTimeout(() => {
    splash.classList.add('display-none');
  }, 2000);
})



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


// function ( e ) {
//   e.fn.niceSelect = function ( t ) {
//     function s( t ) {
//       t.after( e( "<div></div>" ).addClass( "nice-select" ).addClass( t.attr( "class" ) || "" ).addClass( t.attr( "disabled" ) ? "disabled" : "" ).attr( "tabindex", t.attr( "disabled" ) ? null : "0" ).html( '<span class="current"></span><ul class="list"></ul>' ) ); var s = t.next(), n = t.find( "option" ), i = t.find( "option:selected" ); s.find( ".current" ).html( i.data( "display" ) || i.text() ), n.each( function ( t ) { var n = e( this ), i = n.data( "display" ); s.find( "ul" ).append( e( "<li></li>" ).attr( "data-value", n.val() ).attr( "data-display", i || null ).addClass( "option" + ( n.is( ":selected" ) ? " selected" : "" ) + ( n.is( ":disabled" ) ? " disabled" : "" ) ).html( n.text() ) ) } )
//     } if ( "string" == typeof t ) return "update" == t ? this.each( function () { var t = e( this ), n = e( this ).next( ".nice-select" ), i = n.hasClass( "open" ); n.length && ( n.remove(), s( t ), i && t.next().trigger( "click" ) ) } ) : "destroy" == t ? ( this.each( function () { var t = e( this ), s = e( this ).next( ".nice-select" ); s.length && ( s.remove(), t.css( "display", "" ) ) } ), 0 == e( ".nice-select" ).length && e( document ).off( ".nice_select" ) ) : console.log( 'Method "' + t + '" does not exist.' ), this; this.hide(), this.each( function () { var t = e( this ); t.next().hasClass( "nice-select" ) || s( t ) } ), e( document ).off( ".nice_select" ), e( document ).on( "click.nice_select", ".nice-select", function ( t ) { var s = e( this ); e( ".nice-select" ).not( s ).removeClass( "open" ), s.toggleClass( "open" ), s.hasClass( "open" ) ? ( s.find( ".option" ), s.find( ".focus" ).removeClass( "focus" ), s.find( ".selected" ).addClass( "focus" ) ) : s.focus() } ), e( document ).on( "click.nice_select", function ( t ) { 0 === e( t.target ).closest( ".nice-select" ).length && e( ".nice-select" ).removeClass( "open" ).find( ".option" ) } ), e( document ).on( "click.nice_select", ".nice-select .option:not(.disabled)", function ( t ) { var s = e( this ), n = s.closest( ".nice-select" ); n.find( ".selected" ).removeClass( "selected" ), s.addClass( "selected" ); var i = s.data( "display" ) || s.text(); n.find( ".current" ).text( i ), n.prev( "select" ).val( s.data( "value" ) ).trigger( "change" ) } ), e( document ).on( "keydown.nice_select", ".nice-select", function ( t ) { var s = e( this ), n = e( s.find( ".focus" ) || s.find( ".list .option.selected" ) ); if ( 32 == t.keyCode || 13 == t.keyCode ) return s.hasClass( "open" ) ? n.trigger( "click" ) : s.trigger( "click" ), !1; if ( 40 == t.keyCode ) { if ( s.hasClass( "open" ) ) { var i = n.nextAll( ".option:not(.disabled)" ).first(); i.length > 0 && ( s.find( ".focus" ).removeClass( "focus" ), i.addClass( "focus" ) ) } else s.trigger( "click" ); return !1 } if ( 38 == t.keyCode ) { if ( s.hasClass( "open" ) ) { var l = n.prevAll( ".option:not(.disabled)" ).first(); l.length > 0 && ( s.find( ".focus" ).removeClass( "focus" ), l.addClass( "focus" ) ) } else s.trigger( "click" ); return !1 } if ( 27 == t.keyCode ) s.hasClass( "open" ) && s.trigger( "click" ); else if ( 9 == t.keyCode && s.hasClass( "open" ) ) return !1 } ); var n = document.createElement( "a" ).style; return n.cssText = "pointer-events:auto", "auto" !== n.pointerEvents && e( "html" ).addClass( "no-csspointerevents" ), this
//   }
// }( jQuery );


// $( document ).ready( function () {
//   $( '.personalizar-select' ).niceSelect();
// } );


/**
 * ? MASCARA DE DADOS
*/

const options = {
  method: "GET",
  mode: "cors",
  caches: "default"
}
function fMasc( objeto, mascara ) {
  obj = objeto
  masc = mascara
  setTimeout( "fMascEx()", 1 )
}
function fMascEx() {
  obj.value = masc( obj.value )
}
function mTel( tel ) {
  tel = tel.replace( /\D/g, "" )
  tel = tel.replace( /^(\d)/, "($1" )
  tel = tel.replace( /(.{3})(\d)/, "$1)$2" )
  if ( tel.length == 9 ) {
    tel = tel.replace( /(.{1})$/, "-$1" )
  } else if ( tel.length == 10 ) {
    tel = tel.replace( /(.{2})$/, "-$1" )
  } else if ( tel.length == 11 ) {
    tel = tel.replace( /(.{3})$/, "-$1" )
  } else if ( tel.length == 12 ) {
    tel = tel.replace( /(.{4})$/, "-$1" )
  } else if ( tel.length > 12 ) {
    tel = tel.replace( /(.{4})$/, "-$1" )
  } return tel;
}
function mCEP( cep ) {
  cep = cep.replace( /\D/g, "" )
  cep = cep.replace( /^(\d{2})(\d)/, "$1.$2" )
  cep = cep.replace( /.(\d{3})(\d)/, ".$1-$2" )
  return cep
}


/** 
 * ! FUNCOES POST E GET DATABASE
 * 
 * 
 * ?cadastro de Usuario
*/
async function cadastro() {
  let usuario = {}

  usuario.nome = document.getElementById( "nome" ).value;
  usuario.email = document.getElementById( 'email' ).value;
  // usuario.cpf = document.getElementById( 'cpf' ).value;
  let cpf = document.getElementById( 'cpf' );
  console.log(cpf)
  cpf = cpf.value.replace( '.', '' );
  usuario.cpf = cpf.value.replace( '-', '' );
  let tel = document.getElementById( 'telefone' ).value;
  tel = tel.value.replace( '(', "");
  tel = tel.value.replace( ')', "");
  usuario.telefone = tel.replace( '-', '' )
  usuario.senha = document.getElementById( 'senha' ).value;

  console.log(usuario);

  const formData = new FormData();
  formData.append( 'nome', usuario.nome )
  formData.append( 'email', usuario.email )
  formData.append( 'cpf', usuario.cpf )
  formData.append( 'telefone', usuario.telefone )
  formData.append( 'senha', usuario.senha )

  await fetch( 'http://localhost:3000/cadastro/usuario',
    {
      method: 'POST',
      body: JSON.parse(usuario.stringify()),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    } ).then( result => {
      return result.json()
    } ).then( data => {
      console.log( data )
      
    } )



}
 

  /** 
   * *  Cadastro de Estabelecimento
  */

  async function cadEst() {
    let estabelecimento = {}

    estabelecimento.nome = document.getElementById( "nome" ).value;
    estabelecimento.cep = document.getElementById( 'cep' ).value;
    estabelecimento.endereco = document.getElementById( 'endereco' ).value;
    estabelecimento.mesa = document.getElementById( 'mesa' ).value;

    const formData = new FormData();

    const fileField = document.querySelector( 'input[type="file"]' );

    formData.append( 'nome', estabelecimento.nome )
    formData.append( 'logo', fileField.files[ 0 ] )
    formData.append( 'cep', estabelecimento.cep )
    formData.append( 'endereco', estabelecimento.endereco )
    formData.append( 'mesa', estabelecimento.mesa )

    await fetch( 'http://localhost:3000/cadastro/estabelecimento',
      {
        method: 'POST',
        body: JSON.stringify( formData ),
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      } ).then( result => {
        return result.json()
      } ).then( data => {
        console.log( data )

      } )

  }


// function validaSenha() {
//   const pass = document.getElementById( 'pass' )

//   const senha = document.getElementById( 'senha' );
//   const senha2 = document.getElementById( 'confSenha' );
//   if ( senha.value == senha2.value ) {
//     pass.style.display = " ";
//   } else if(!senha.value == senha2.value) {
//     pass.innerHTML = "As senhas digitadas são diferentes!";
//   }
// }


// A variável de ID ficou fora das funções para manter o estado...
let id = 0;

//Retorna o próximo ID válido para a DIV que será criada
function getNextId() {
  return ++id;
}

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
    divElement.style.width = "18%";
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

function criarDivCardapio(){
  //Pego o ID
  let id = getNextId();
  //Crio a DIV
  let divElement = document.createElement("div");

  var conteudoNovo = document.createElement("span");
  var conteudoNovo2 = document.createElement("span");
  var conteudoNovo3 = document.createElement("span");

  var span1 = document.createTextNode("Itaipava ")
  var span2 = document.createTextNode("600ml")
  var span3 = document.createTextNode("R$:10,00")

  conteudoNovo.appendChild(span1);
  conteudoNovo2.appendChild(span2);
  conteudoNovo3.appendChild(span3);


  divElement.appendChild(conteudoNovo);
  divElement.appendChild(conteudoNovo2);
  divElement.appendChild(conteudoNovo3);
  //Pego a DIV onde a nova DIV será criada, sempre na DIV mãe
  let divMae = document.getElementById("mesas");

  //A ideia do ID é que ele seja um elemento único, ou seja, não se repita
  divElement.setAttribute('id', 'box' + id.toString());

  //CSS

  divElement.classList.add("itens-cardapio")
  divElement.classList.add("bounceIn")
  conteudoNovo.classList.add("itens-cardapio-span")

  //Essa parte é mais para deixar claro que outras divs estão sendo criadas, criando um degrade
  //divElement.style.backgroundColor = "#f0" + id.toString();

  //Adiciono a nova DIV na DIV mãe
  //Aqui poderia ser por exemplo document.body.appendChild, adicionando assim o elemento criado diretamente no body
  divMae.appendChild(divElement);
  // document.body.appendChild(divElement)
  console.log("rodou")
}



