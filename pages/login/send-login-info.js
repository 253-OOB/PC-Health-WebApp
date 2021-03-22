function sendData() {
  const username = document.getElementById("user_input").value;
  const password = document.getElementById("pswd_input").value;

  httpGetAsync("insertUrlHere");

  var http = new XMLHttpRequest();
  var url = "insertUrlHere";
  http.open("POST", url, true);

  //Send the proper header information along with the request
  //   http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
      alert(http.responseText);
    }
  };
  var params = "{ username:'" + username + "', password:'" + password + "' }";
  http.send(params);
}
