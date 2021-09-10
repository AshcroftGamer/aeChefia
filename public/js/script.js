function ok() {
  alert("clickou")
};

function process(mesa) {
  var value = parseInt(document.getElementById("quant").value);
  value += mesa;

  if (value == NaN) {
    document.getElementById("quant").value = 0;
  } else {
    document.getElementById("quant").value = value;
  }

}

function ViewSenha() {
  let senha = document.getElementById('senha')
  let olho = document.getElementById('olho')

  if (senha.getAttribute('type') == ("password")) {
    senha.setAttribute("type", "text")
    olho.src = "/img/vision.png"
  } else {
    senha.setAttribute("type", "password")
    olho.src = "/img/private.png"
  }

}

function confirmarSenha() {
  let confSenha = document.getElementById('confSenha')
  let olho = document.getElementById('olho1')
  if (confSenha.getAttribute('type') == ("password")) {
    confSenha.setAttribute("type", "text")
    olho.src = "/img/vision.png"
  } else {
    confSenha.setAttribute("type", "password")
    olho.src = "/img/private.png"
  }
}

/**
 * ? MASCARA DE DADOS
*/

const options = {
  method: "GET",
  mode: "cors",
  caches: "default"
}
function fMasc(objeto, mascara) {
  obj = objeto
  masc = mascara
  setTimeout("fMascEx()", 1)
}
function fMascEx() {
  obj.value = masc(obj.value)
}
function mTel(tel) {
  tel = tel.replace(/\D/g, "")
  tel = tel.replace(/^(\d)/, "($1")
  tel = tel.replace(/(.{3})(\d)/, "$1)$2")
  if (tel.length == 9) {
    tel = tel.replace(/(.{1})$/, "-$1")
  } else if (tel.length == 10) {
    tel = tel.replace(/(.{2})$/, "-$1")
  } else if (tel.length == 11) {
    tel = tel.replace(/(.{3})$/, "-$1")
  } else if (tel.length == 12) {
    tel = tel.replace(/(.{4})$/, "-$1")
  } else if (tel.length > 12) {
    tel = tel.replace(/(.{4})$/, "-$1")
  } return tel;
}
function mCEP(cep) {
  cep = cep.replace(/\D/g, "")
  cep = cep.replace(/^(\d{2})(\d)/, "$1.$2")
  cep = cep.replace(/.(\d{3})(\d)/, ".$1-$2")
  return cep
}

// Function Mascara Moeda
function k(i) {
  var v = i.value.replace(/\D/g, '');
  v = (v / 100).toFixed(2) + '';
  v = v.replace(".", ".");
  v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
  v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
  i.value = v;
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

cliente = {};

function onSignIn(googleUser) {
   profile = googleUser.getBasicProfile();
   
  // Conseguindo o Nome do Usuário
   userName = profile.getName();

  // Conseguindo o E-mail do Usuário
   userEmail = profile.getEmail();

  // Conseguindo a URL da Foto do Perfil
   userPicture = profile.getImageUrl();

  document.getElementById('user-photo').src = userPicture;
  document.getElementById('user-name').innerText = userName;
  document.getElementById('user-email').innerText = userEmail;

  console.log(userName)
  console.log(userEmail)
  console.log(userPicture)

  var id_token = googleUser.getAuthResponse().id_token;
  console.log(id_token);

  // var nomegoo = googleUser.Vs.Pe;
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/login');
 
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
    console.log('Signed in as: ' + xhr.responseText);
    if (xhr.responseText == 'success') {
       console.log(userName)
      signOut();
      location.replace('/home')
      
    }
  };
  xhr.send(JSON.stringify({ token: id_token }));
  
  return userName;
}


// function aj( onSignIn(userName) ){
//   console.log(userName)
// }

// height: 48px;
// width: 87%;
// border-radius: 100px;
// text-align: center;
// left: 50px;
// padding: 1%;


function Menu() {
  let menu = document.getElementById('menu-js');
  let conteudoMenu = document.getElementById('menu')
  if (menu.checked == true) {
    conteudoMenu.style.transform = origin = "0% 0%"
    conteudoMenu.style.transition = "transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0)"

  }

}

function testeDiv() {
  let div1 = document.getElementById('quantidade1')
  let div2 = document.getElementById('quantidade2')
  let num = 1
  console.log(div1.value)
  div1.value = 1
  div2.value = 1
  this.estadoQuantidade1()
  this.estadoQuantidade2()
}

/** 
 * ! FUNCOES POST E GET DATABASE
 * 
 * 
 * ?cadastro de Usuario
*/
async function cadastro() {
  let usuario = {}

  usuario.nome = document.getElementById("nome").value;
  usuario.email = document.getElementById('email').value;
  // usuario.cpf = document.getElementById( 'cpf' ).value;
  let cpf = document.getElementById('cpf');
  console.log(cpf)
  cpf = cpf.value.replace('.', '');
  usuario.cpf = cpf.value.replace('-', '');
  let tel = document.getElementById('telefone').value;
  tel = tel.value.replace('(', "");
  tel = tel.value.replace(')', "");
  usuario.telefone = tel.replace('-', '')
  usuario.senha = document.getElementById('senha').value;

  console.log(usuario);

  const formData = new FormData();
  formData.append('nome', usuario.nome)
  formData.append('email', usuario.email)
  formData.append('cpf', usuario.cpf)
  formData.append('telefone', usuario.telefone)
  formData.append('senha', usuario.senha)

  await fetch('http://localhost:3000/cadastro/usuario',
    {
      method: 'POST',
      body: JSON.parse(usuario.stringify()),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then(result => {
      return result.json()
    }).then(data => {
      console.log(data)

    })



}


/** 
 * *  Cadastro de Estabelecimento
*/

async function cadEst() {
  let estabelecimento = {}

  estabelecimento.nome = document.getElementById("nome").value;
  estabelecimento.cep = document.getElementById('cep').value;
  estabelecimento.endereco = document.getElementById('endereco').value;
  estabelecimento.mesa = document.getElementById('mesa').value;

  const formData = new FormData();

  const fileField = document.querySelector('input[type="file"]');

  formData.append('nome', estabelecimento.nome)
  formData.append('logo', fileField.files[0])
  formData.append('cep', estabelecimento.cep)
  formData.append('endereco', estabelecimento.endereco)
  formData.append('mesa', estabelecimento.mesa)

  await fetch('http://localhost:3000/cadastro/estabelecimento',
    {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then(result => {
      return result.json()
    }).then(data => {
      console.log(data)

    })

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

// Functios para criar divs

// A variável de ID ficou fora das funções para manter o estado...
let id = 0;

//Retorna o próximo ID válido para a DIV que será criada
function getNextId() {
  return ++id;
}

function criarDiv() {
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
  if (id >= 12) {
    let footer = document.getElementById('footer');
    footer.style.position = 'unset'
  }
  console.log("rodou " + id)
}

function criarDivCardapio() {
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
  if (id >= 4) {
    let footer = document.getElementById('footer');
    footer.style.position = 'unset'
  }
  // document.body.appendChild(divElement)
  console.log("rodou")
}


// Home Cadastrado
function estadoSpanHome() {
  let span = document.getElementById('spanFunction');
  let qnt1 = document.getElementById('quantidade1');
  let qnt2 = document.getElementById('quantidade2');

  if (qnt1.value, qnt2.value == "") {
    console.log('rodou')
    span.style.display = "block"
  } else {
    console.log('passou')
  }

  this.estadoQuantidade1();
  this.estadoQuantidade2();
}


function estadoQuantidade1() {
  let qnt1 = document.getElementById('quantidade1');

  if (qnt1.value == "") {
    qnt1.style.visibility = "hidden"
  } else {
    qnt1.style.visibility = "visible"
  }
}

function estadoQuantidade2() {
  let qnt2 = document.getElementById('quantidade2');
  if (qnt2.value == "") {
    qnt2.style.visibility = "hidden"

  } else {
    qnt2.style.visibility = "visible"
  }

}
// Splash Screen
function timeout() {
  myVar = setTimeout(function () { window.location.href = "./home-cadastrado.html"; }, 2500);
}


// Itens Cardapio
function listaCardapio() {
  let divComida = document.getElementById("divComida");
  let divBebida = document.getElementById("divBebida");
  let datalist = document.getElementById("popo")


  if (datalist.value == "Comidas") {
    divComida.style.display = "flex"
    divBebida.style.display = "none"
  }
  if (datalist.value == "Bebidas") {
    divBebida.style.display = "flex"
    divComida.style.display = "none"
  }

}

