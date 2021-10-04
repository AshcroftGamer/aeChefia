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



function btngoogle() {
  btn = document.querySelector('.abcRioButton');
  spanLogin = document.querySelector('span');

  spanLogin.textContent = "Entrar com Google"
  spanLogin.style.fontSize = '16px'
  spanLogin.style.fontWeight = 'bold'

  btn.style.height = '48px';
  btn.style.width = '87%';
  btn.style.borderRadius = '100px';
  btn.style.textAlign = 'center';
  btn.style.left = '7%';
  btn.style.paddingLeft = '7px';
  btn.style.paddingTop = '9px';
  btn.style.color = '#323232';
  btn.style.outline = 'none'
}



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
  lippeativista
  let id = getNextId();
  let div1 = document.getElementById('quantidade1')
  let div2 = document.getElementById('quantidade2')
  let num = 1
  div1.value = id
  div2.value = id
  this.estadoQuantidade1()
  this.estadoQuantidade2()
}
class Usuario {
  constructor() {
    this.arrayUsuario = [];
    this.editId = null
  }
  cadastrar() {
    let usuario = this.lerDados();

    if (this.validaCampos(usuario)) {
      if (this.editId == null) {
        this.adicionar(usuario)
      } else {

      }

    }

  }


  async adicionar(usuario) {

    fetch('http://localhost:3000/proprietario/cadastro', {
      method: 'POST',
      headers:
        { "content-type": "application/json" },
      body: JSON.stringify(usuario)

    }).then(result => {
      return result.json();
    }).then(data => {
      usuario.id = data.usuarioCriado.id
      usuario.nome = data.usuarioCriado.nome;
      usuario.email = data.usuarioCriado.email
      usuario.cpf = data.usuarioCriado.cpf
      usuario.telefone = data.usuarioCriado.telefone
      usuario.senha = data.usuarioCriado.hash

      this.arrayUsuario.push(usuario);
      location.assign('/home')

    });
  }

  lerDados() {
    let usuario = {}

    var password = document.getElementById("senha")
      , confirm_password = document.getElementById("confSenha");

    function validatePassword() {
      if (password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Senhas diferentes!");
        alert('passei')
      } else {
        confirm_password.setCustomValidity('');
      }
    }

    password.onchange = validatePassword;
    confirm_password.onkeyup = validatePassword;

    usuario.id = 0;
    usuario.nome = document.getElementById('nome').value;
    usuario.email = document.getElementById('email').value;
    usuario.cpf = document.getElementById('cpf').value;
    usuario.telefone = document.getElementById('telefone').value
    usuario.senha = document.getElementById('senha').value

    return usuario;
  }

  validaCampos(usuario) {
    let msg = '';

    if (usuario.nome == "") {
      msg += '- Informe o Nome'
    }
    if (usuario.logo == "") {
      msg += '- Informe o E-mail'
    }
    if (usuario.cep == "") {
      msg += '- Informe o cpf'
    }
    if (usuario.senha == "") {
      msg += '- Insira a Senha'
    }
    if (msg != '') {
      alert(msg);
      return false
    }


    return true;

  }
}
var usuario = new Usuario

function Modal() {



  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";
  span.onclick = function () {
    modal.style.display = "none";
    modal.style.padding = '10%';
    modal.style.paddingTop = '10%'


  }
  // window.onclick = function (event) {
  //     if (event.target == modal) {
  //         modal.style.display = "none";
  //     }
  // }
}
/** 
 * *  Cadastro de Estabelecimento
*/

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

  //Essa parte é mais para deixar claro que oelement+ id.toString();

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
    var el = document.getElementById('spanFunction');
    if (true == el.classList.contains("h2-Add")) {
      el.remove()
    } else {
      next()
    }

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
  myVar = setTimeout(function () { window.location.href = "/dashboard"; }, 2500);
}


// Itens Cardapio
function listaCardapio() {
  let divComida = document.getElementById("divComida");
  let divBebida = document.getElementById("divBebida");
  let datalist = document.getElementById("popo")


  if (datalist.value == "Comida") {
    divComida.style.display = "flex"
    divBebida.style.display = "none"
  }
  if (datalist.value == "Bebida") {
    divBebida.style.display = "flex"
    divComida.style.display = "none"
  }

}

class Estabelecimento {
  constructor() {
    this.arrayEstabelecimento = [];
    this.editId = null
  }
  cadastrar() {
    let estabelecimento = this.lerDados();

    if (this.validaCampos(estabelecimento)) {
      if (this.editId == null) {
        this.adicionar(estabelecimento)
      } else {

      }

    }

  }
  listaEstabelecimento() {
    console.log("entrei")
    fetch('http://localhost:3000/estabelecimento/listar/' + localStorage.getItem("id_proprietario"), {

      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then(result => {
      return result.json()
    }).then(data => {

      data.estabelecimento.forEach(estabele => {
        this.arrayEstabelecimento.push(estabele);
      })

      for (let i = 0; i < this.arrayEstabelecimento.length; i++) {

        if (this.arrayEstabelecimento[i].id_proprietario == localStorage.getItem('id_proprietario')) {
          let estabelecimento = document.createElement('option')
          estabelecimento.setAttribute("value", this.arrayEstabelecimento[i].nome_estabelecimento)
          estabelecimento.innerHTML = `${this.arrayEstabelecimento[i].nome_estabelecimento}`
          document.getElementsByClassName("dropdown_estabelecimento")[0].appendChild(estabelecimento)
        }
      }
    })
  }
  async adicionar(estabelecimento) {

    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]');

    formData.append('nome_estabelecimento', estabelecimento.nome_estabelecimento);
    formData.append('cep', estabelecimento.cep);
    formData.append('logo', fileField.files[0]);
    formData.append('endereco', estabelecimento.endereco);
    formData.append('mesa', estabelecimento.mesa)
    formData.append('id_proprietario', estabelecimento.id_proprietario)


    fetch('http://localhost:3000/estabelecimento/cadastro', {
      method: 'POST',
      body: formData,

    }).then(result => {
      return result.json();
    }).then(data => {
      console.log("data")
      console.log(data)
      estabelecimento.nome_estabelecimento = data.estabelecimentoCriado.nome_estabelecimento;
      estabelecimento.logo = data.estabelecimentoCriado.logo
      estabelecimento.cep = data.estabelecimentoCriado.cep
      estabelecimento.endereco = data.estabelecimentoCriado.endereco
      estabelecimento.mesa = data.estabelecimentoCriado.mesa
      estabelecimento.id_proprietario = data.estabelecimentoCriado.id_proprietario

      this.arrayEstabelecimento.push(estabelecimento);

    });
  }
  lerDados() {
    let estabelecimento = {}

    estabelecimento.id = 0;
    estabelecimento.nome_estabelecimento = document.getElementById('nome_estabelecimento').value;
    estabelecimento.cep = document.getElementById('cep').value;
    estabelecimento.logo = document.getElementById('logo').value;
    estabelecimento.endereco = document.getElementById('endereco').value
    estabelecimento.mesa = document.getElementById('quant').value
    estabelecimento.id_proprietario = localStorage.getItem('id_proprietario')

    console.log("estou no estabelecimento")
    console.log(estabelecimento.id_proprietario)

    console.log(estabelecimento)

    return estabelecimento;
  }

  verificar() {

    fetch('http://localhost:3000/estabelecimento/listar/' + localStorage.getItem("id_proprietario"), {

      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then(result => {
      return result.json()
    }).then(data => {
      console.log(data)
      if (data.estabelecimento.length == 0) {
      } else {
        window.location.href = "/dashboard"
      }
    })
  }
  selecionar_estabelecimento() {
    let estabelecimento_input = document.getElementById('estab_input').value
    console.table(estabelecimento_input)
    fetch('http://localhost:3000/estabelecimento/' + estabelecimento_input, {

      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then(result => {
      return result.json()
    }).then(data => {
      localStorage.setItem("estabelecimento", data.estabelecimento[0].id_estabelecimento)
      cardapio.quantidade_cardapio();
      funcionario.funcionario_quantidade();
    })

  }

  criarMesas() {
    fetch('http://localhost:3000/estabelecimento/mesa/' + localStorage.getItem("estabelecimento"), {

      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then(result => {
      return result.json()
    }).then(data => {
      for (let i = 0; i < data.estabelecimento[0].mesa; i++) {
        let id = [i];

        let divElement = document.createElement("div");
        var conteudoNovo = document.createTextNode(id);
        divElement.appendChild(conteudoNovo);

        let divMae = document.getElementById("mesas");

        divElement.setAttribute('id', 'box' + id.toString());

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

        divMae.appendChild(divElement);

        if (id >= 12) {
          let footer = document.getElementById('footer');
          footer.style.position = 'unset'
        }

      }
    })
  }
  validaCampos(estabelecimento) {
    let msg = '';

    if (estabelecimento.nome_estabelecimento == "") {
      msg += '- Informe o nome do estabelecimento'
    }
    if (estabelecimento.logo == "") {
      msg += '- Informe o logo do estabelecimento'
    }
    if (estabelecimento.cep == "") {
      msg += '- Informe o cep do estabelecimento'
    }
    if (estabelecimento.endereco == "") {
      msg += '- Informe o endereco do estabelecimento'
    }
    if (msg != '') {
      alert(msg);
      return false
    }
    return true;

  }
}
var estabelecimento = new Estabelecimento



function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();

  var xhr = new XMLHttpRequest();

  var id_token = googleUser.getAuthResponse().id_token;

  var email = profile.getEmail();
  xhr.open('POST', '/login');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {

    if (xhr.responseText == 'success') {

      fetch('http://localhost:3000/usuarios/' + email, {
      })
        .then(response => response.json())
        .then(data => {

          if (data.tamanho > 0) {

            try {

              fetch('http://localhost:3000/usuarios/login', {
                method: 'POST',
                body: JSON.stringify({
                  email: email,
                  google: true
                }),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }

              }).then(result => {
                return result.json();
              }).then(data => {
                console.log(data);
                localStorage.setItem("ourToken", data.token)
                localStorage.setItem("email", email)
                if (1 > 0) {
                  // console.log( 'entrou iff3' )
                  listarEstab()
                }

              });

            } catch (error) {
              console.log(error);
            }

          } else {

            location.assign('/cadastro')
          }
        })

      signOut();
    }
  };
  xhr.send(JSON.stringify({ token: id_token }));
  console.log()
}

function jwt_login() {

  let user = {
    email: document.getElementById("email").value,
    senha: document.getElementById("senha").value
  };


  fetch('http://localhost:3000/usuarios/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `${localStorage.getItem("ourToken")}`

    },
    body: JSON.stringify(user)
  }).then(result => {
    if (result.ok) {
      return result.json()
    } else {
      localStorage.setItem("ourToken", null)
      alert("Senha Incorreta!")
      document.getElementById('email').value = '';
      document.getElementById('senha').value = '';
    }
  }).then(data => {

    localStorage.setItem("email", document.getElementById("email").value);
    localStorage.setItem("ourToken", data.token);
    localStorage.setItem("id_proprietario", data.usuario[0].id_proprietario)

    // location.assign( '/home' )

    // listarEstab();

    if (1 > 0) {
      // console.log( 'entrou iff3' )
      listarEstab()
    }
  });



}

function listarEstab() {

  let email = localStorage.getItem("email");
  fetch('http://localhost:3000/estabelecimento/listar/' + email, {
    method: 'GET'

  }).then(result => {
    return result.json();

  }).then(data => {

    if (data.quantidade > 0) {

      location.assign('/dashboard')

    } else {

      location.assign('/home')

    }


  })

}

function alertEstab() {
  let email = localStorage.getItem("email");
  fetch('http://localhost:3000/estabelecimento/listar/' + email, {
    method: 'GET'
  }).then(result => {
    return result.json();
  }).then(data => {
    console.table(data.Estabelecimento[0])
  })
}


function jwt_auth_load() {

  fetch('http://localhost:3000/home/entrar', {
    headers: {
      'Authorization': `${localStorage.getItem("ourToken")}`
    }
  }).then(result => {
    if (result.ok) {
      return result.json()
    } else {
      localStorage.setItem("ourToken", null)
      console.log("entrou else")
      location.assign('/')
    }
  });

}

function logout() {
  fetch('http://localhost:3000/logout', {

  }).then(result => {

    localStorage.setItem("ourToken", null)
    location.assign('/')

  });

}

class Proprietario {

  async buscarProprietario() {

    fetch('http://localhost:3000/proprietario/' + localStorage.getItem('id_proprietario'))
      .then(result => {
        return result.json()
      }).then(data => {
        document.getElementById('nomespan').innerHTML = `Olá ${data.proprietario.nome}!`
        estabelecimento.listaEstabelecimento();
      })
  }
}

var proprietario = new Proprietario

class Funcionario {
  constructor() {
    this.arrayFuncionario = [];
    this.editId = null
  }
  cadastrado() {
    let funcionario = this.dados_funcionario();

    if (this.validafun(funcionario)) {
      if (this.editId == null) {
        this.adicionar(funcionario)
      } else {
        console.log("aff")
      }

    }

  }

  funcionario_quantidade() {
    fetch('http://localhost:3000/funcionario/quantidade/' + localStorage.getItem('estabelecimento'), {
      method: 'GET',
      headers: { "content-type": "application/json" }
    }).then(result => {
      return result.json();
    }).then(data => {
      console.log('euuu paipi')
      console.log(data)
      console.log(data.quantidade)
      document.getElementById('quantidade1').value = data.quantidade
      estadoSpanHome()
    })
  }

  dados_funcionario() {
    let funcionario = {}

    /*var password = document.getElementById("senha")
    , confirm_password = document.getElementById("confSenha");
  
  function validatePassword() {
    if (password.value != confirm_password.value) {
      confirm_password.setCustomValidity("Senhas diferentes!");
      alert('passei')
    } else {
      confirm_password.setCustomValidity('');
    }
  }
  
  password.onchange = validatePassword;
  confirm_password.onkeyup = validatePassword;*/

    funcionario.id = 0;
    funcionario.nome_funcionario = document.getElementById('nome_funcionario').value;
    funcionario.email = document.getElementById('email').value;
    funcionario.login = document.getElementById('login').value;
    funcionario.id_estabelecimento = localStorage.getItem('estabelecimento')
    funcionario.senha = document.getElementById('senha').value

    console.log(funcionario)

    return funcionario;
  }
  async adicionar(funcionario) {

    fetch('http://localhost:3000/funcionario/cadastro/', {
      method: 'POST',
      headers:
        { "content-type": "application/json" },
      body: JSON.stringify(funcionario)
    }).then(result => {
      return result.json();
    }).then(data => {
      console.log("data")
      console.log(data)
      funcionario.nome_funcionario = data.funcionarioInserido.nome_funcionario;
      funcionario.login = data.funcionarioInserido.login;
      funcionario.email = data.funcionarioInserido.email;
      funcionario.id_estabelecimento = data.funcionarioInserido.id_estabelecimento;
      funcionario.senha = data.funcionarioInserido.hash

      this.arrayFuncionario.push(funcionario);
      location.assign('/funcionario/sucesso')
    });
  }
  validafun(funcionario) {
    let msg = '';

    if (funcionario.nome_funcionario == "") {
      msg += '- Informe o Nome'
    }
    if (funcionario.email == "") {
      msg += '- Informe o E-mail'
    }
    if (funcionario.login == "") {
      msg += '- Informe o login'
    }
    if (funcionario.senha == "") {
      msg += '- Insira a Senha'
    }
    if (msg != '') {
      alert(msg);
      return false
    }


    return true;

  }

}

var funcionario = new Funcionario


class Cardapio {

  constructor() {
    this.arrayCardapio = []
  }


  deletarCardapio(id_cardapio){
    fetch('http://localhost:3000/cardapio/remover/' + id_cardapio, {
      method: 'DELETE',
      headers: { "content-type": "application/json" }
    }).then(result => {
      return result.json();
    }).then(data => {
      //document.location.reload(true)
    })
  }
  quantidade_cardapio() {
    fetch('http://localhost:3000/cardapio/quantidade/' + localStorage.getItem('estabelecimento'), {
      method: 'GET',
      headers: { "content-type": "application/json" }
    }).then(result => {
      return result.json();
    }).then(data => {
      console.log(data)
      console.log(data.quantidade)
      document.getElementById('quantidade2').value = data.quantidade
      estadoSpanHome()
    })
  }

  addCardapio() {
    fetch('http://localhost:3000/cardapio/cadastro/' + localStorage.getItem('estabelecimento'), {
      method: 'POST',
      headers: { "content-type": "application/json" },
    }).then(result => {
      return result.json();
    }).then(data => {
      localStorage.setItem('id_cardapio', data.cardapioCriado.id_cardapio)
      location.assign('/cardapio/zerado')
    })
  }


  criarCardapio() {
    fetch('http://localhost:3000/cardapio/quantidade/' + localStorage.getItem('estabelecimento'), {
      method: 'GET',
      headers: { "content-type": "application/json" }
    }).then(result => {
      return result.json();
    }).then(data => {

      data.cardapio.forEach(estabele => {
        this.arrayCardapio.push(estabele);
      })

      for (let i = 0; i < this.arrayCardapio.length; i++) {
        fetch('http://localhost:3000/cardapio/item/' + this.arrayCardapio[i].id_cardapio, {
          method: 'GET',
          headers: { "content-type": "application/json" }
        }).then(result => {
          return result.json();
        }).then(data => {

          let cardapio = document.createElement('div')
          cardapio.classList.add('div-cadastrado')

          cardapio.innerHTML = `<div class="span-cadastrado">
      <span class="nome-cadastrado">Cardápio ${[i]}</span>
      <span>${data.quantidade} itens</span>
      <span>28/07/2021</span>
  </div>
  <div class="btn-cadastrado">
     <a href="/cardapio/lista"> <button class="editarGrey" onclick="cardapio.setarCardapio(${this.arrayCardapio[i].id_cardapio})" >Editar</button></a>
     <button class="excluirRed" onclick="cardapio.deletarCardapio(${this.arrayCardapio[i].id_cardapio})">Excluir</button>
  </div>`

          document.getElementsByClassName("selecionado")[0].appendChild(cardapio)
        });
      }
    });
  }

  listaCardapio() {
    fetch('http://localhost:3000/cardapio/item/' + localStorage.getItem('id_cardapio'), {
      method: 'GET',
      headers: { "content-type": "application/json" }
    }).then(result => {
      return result.json();
    }).then(data => {
      for(let i = 0; i < data.quantidade; i++){
        console.log(data)
        let medidas = data.cardapio[i].id_medidas
        let marcas = data.cardapio[i].id_marcas
        let nome_comida = data.cardapio[i].nome_comida
        let preco = data.cardapio[i].preco
        let tipo = document.getElementById('tipo').value
        console.table(tipo)
        fetch('http://localhost:3000/cardapio/tipo/' + tipo, {
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        }).then(result => {
          return result.json()
        }).then(data => {
  
          console.log(data)
  
          fetch('http://localhost:3000/marca/pegar/' + marcas, {
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            }
          }).then(result => {
            return result.json()
          }).then(data => {
            marcas = data.marcas[0].marca
          })
          localStorage.setItem("id_item_tipo", data.tipos[0].id_item_tipo)
  
          fetch('http://localhost:3000/medida/pegar/' + medidas, {
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            }
          }).then(result => {
            return result.json()
          }).then(data => {
            medidas = data.medidas[0].medida
  
            let item = document.createElement('div')
              item.classList.add('div-cadastrado')
              item.setAttribute("id", "divComida");

              console.log()
              if (localStorage.getItem("id_item_tipo") == 2) {
                console.log("entrou")
                item.innerHTML = `<div class="span-cadastrado">
                  <span class="nome-cadastrado">${nome_comida}</span>
                  <span>${medidas}</span>
                  <span>R$:${preco}</span>
              </div>
              <div class="btn-cadastrado">
                  <button class="editarGrey" onclick="ok()">Editar</button>
                  <button class="excluirRed" onclick="ok()">Excluir</button>
              </div>`
  
              } if(localStorage.getItem("id_item_tipo") == 1) {
                item.innerHTML = `        <div class="span-cadastrado">
                  <span class="nome-cadastrado">${marcas}</span>
                  <span>${medidas}</span>
                  <span>R$:${preco}</span>
              </div>
              <div class="btn-cadastrado">
                  <button class="editarGrey" onclick="ok()">Editar</button>
                  <button class="excluirRed" onclick="ok()">Excluir</button>
              </div>`
              }
              document.getElementsByClassName("inicio")[0].appendChild(item)
          })
          
        })
      }

    })
  }

  setarCardapio(id_cardapio) {
    console.log(id_cardapio)
    localStorage.setItem('id_cardapio', id_cardapio)
  }

  setarBebida() {

    localStorage.setItem('id_item_tipo', 1)
    location.assign('/cardapio/bebida')
  }
  setarComida() {
    localStorage.setItem('id_item_tipo', 2)
    location.assign('/cardapio/comida')
  }
}

var cardapio = new Cardapio


class Comida {
  constructor() {
    this.arrayComida = []
    this.editId = null
  }
  cadastrar_comida() {
    let comida = this.dadosComida();

    if (this.verificaComida(comida)) {
      if (this.editId == null) {
        this.addComida(comida)
      } else {

      }

    }

  }
  addComida(comida) {

    fetch('http://localhost:3000/medida/' + comida.id_medidas, {
      method: 'GET',
      headers: { "content-type": "application/json" }
    }).then(result => {
      return result.json();
    }).then(data => {

      comida.id_medidas = data.medidas[0].id_medidas

      fetch('http://localhost:3000/item/cadastro/', {
        method: 'POST',
        headers:
          { "content-type": "application/json" },
        body: JSON.stringify(comida)

      }).then(result => {
        return result.json();
      }).then(data => {

        comida.id_cardapio = data.itemCriado.id_cardapio;
        comida.id_medidas = data.itemCriado.id_medidas;
        comida.nome_comida = data.itemCriado.nome_comida;
        comida.id_item_tipo = data.itemCriado.id_item_tipo;
        comida.preco = data.itemCriado.preco;

        this.arrayComida.push(comida);
        location.assign('/cardapio/comida/sucesso')
      });
    });
  }

  dadosComida() {
    let comida = {}
    comida.id = 0;
    comida.id_cardapio = localStorage.getItem('id_cardapio')
    comida.id_item_tipo = localStorage.getItem('id_item_tipo')
    comida.nome_comida = document.getElementById('comida').value
    comida.id_medidas = document.getElementById('medida').value;
    comida.preco = document.getElementById('preco').value

    console.log(comida)
    return comida;
  }

  verificaComida(comida) {
    let msg = '';

    if (funcionario.nome_funcionario == "") {
      msg += '- Informe o Nome'
    }
    if (funcionario.email == "") {
      msg += '- Informe o E-mail'
    }
    if (funcionario.login == "") {
      msg += '- Informe o login'
    }
    if (funcionario.senha == "") {
      msg += '- Insira a Senha'
    }
    if (msg != '') {
      alert(msg);
      return false
    }


    return true;

  }

}

var comida = new Comida


class Bebida {

  constructor() {
    this.arrayBebida = []
    this.editId = null
  }
  cadastrar_bebida() {
    let bebida = this.dadosBebida();

    if (this.verificaBebida(bebida)) {
      if (this.editId == null) {
        this.addBebida(bebida)
      } else {

      }

    }

  }
  addBebida(bebida) {
    fetch('http://localhost:3000/bebidatipo/' + bebida.id_bebida_tipo, {
      method: 'GET',
      headers: { "content-type": "application/json" }
    }).then(result => {
      return result.json();
    }).then(data => {
      bebida.id_bebida_tipo = data.bebida[0].id_bebida_tipo;


      fetch('http://localhost:3000/medida/' + bebida.id_medidas, {
        method: 'GET',
        headers: { "content-type": "application/json" }
      }).then(result => {
        return result.json();
      }).then(data => {

        bebida.id_medidas = data.medidas[0].id_medidas

        fetch('http://localhost:3000/marca/' + bebida.id_marcas, {
          method: 'GET',
          headers: { "content-type": "application/json" }
        }).then(result => {
          return result.json();
        }).then(data => {

          bebida.id_marcas = data.marcas[0].id_marcas
          fetch('http://localhost:3000/item/cadastro/', {
            method: 'POST',
            headers:
              { "content-type": "application/json" },
            body: JSON.stringify(bebida)

          }).then(result => {
            return result.json();
          }).then(data => {

            bebida.id_cardapio = data.itemCriado.id_cardapio;
            bebida.id_item_tipo = data.itemCriado.id_item_tipo;
            bebida.id_bebida_tipo = data.itemCriado.id_bebida_tipo;
            bebida.id_marcas = data.itemCriado.id_marcas;
            bebida.id_medidas = data.itemCriado.id_medidas;
            bebida.preco = data.itemCriado.preco;

            this.arrayBebida.push(bebida);
            location.assign('/cardapio/bebida/sucesso')
          });
        });
      });
    });
  }

  dadosBebida() {
    let bebida = {}
    bebida.id = 0;
    bebida.id_cardapio = localStorage.getItem('id_cardapio')
    bebida.id_item_tipo = localStorage.getItem('id_item_tipo')
    bebida.id_bebida_tipo = document.getElementById('tipo_bebida').value;
    bebida.id_marcas = document.getElementById('marca').value;
    bebida.id_medidas = document.getElementById('medida').value;
    bebida.preco = document.getElementById('preco').value

    return bebida;
  }

  verificaBebida(bebida) {
    let msg = '';

    if (funcionario.nome_funcionario == "") {
      msg += '- Informe o Nome'
    }
    if (funcionario.email == "") {
      msg += '- Informe o E-mail'
    }
    if (funcionario.login == "") {
      msg += '- Informe o login'
    }
    if (funcionario.senha == "") {
      msg += '- Insira a Senha'
    }
    if (msg != '') {
      alert(msg);
      return false
    }


    return true;

  }
}

var bebida = new Bebida