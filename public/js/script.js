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
