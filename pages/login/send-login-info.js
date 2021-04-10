

function sendData() {

  const username = document.getElementById("user_input").value;
  const password = document.getElementById("pswd_input").value;

  var params = "?";

  if( verifyUsernameOrEmail(username) == "email" ) {

    params = params + "Email=" + username; 

  } else {

    var credentials = username.split(".");
    params = params + "Organisation=" + credentials[0] + "&Username=" + credentials[1];

  }

  url = "inserUrlHere" + params;

  httpGetAsync(url);

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

/**
 * Function to verify if the user has entered an email or a username.
 */
function verifyUsernameOrEmail(credentials) {

  if ( credentials.includes("@") ) {

    return "email";

  } else {

    return "username";

  }

}