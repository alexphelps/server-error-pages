function loadDomain() {
  var display = document.getElementById("display-domain");
  display.innerHTML = document.domain;
}

function GotoHomePage(){
  var port = (window.location.port == "") ? "" : ":"+window.location.port;
  window.location.href = document.location.protocol + '//' +  document.domain + port;
}
