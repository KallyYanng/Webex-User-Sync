/**
 * get newcomer list from ldap
 * 
 * @param webexKey {string} token from webex portal
 * @param email {string} email of newcomer, get from ldap
 * @param firstName {string} first name of newcomer, get from ldap
 * @param LastName {string} last name of newcomer, get from ldap
 * 
 * 
 */

function createPerson(webexKey,email,firstName,lastName) {
  // var email = "testkally4@decathlon.com";
  // var firstName = "test";
  // var lastName = "test";

  var payload = {
  "emails": [email],
  "firstName": firstName,
  "lastName": lastName
  }

  var optionsOauth2 = {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + webexKey,
    },
    "payload":JSON.stringify(payload),
    "muteHttpExceptions": true
  };
  

    var response = UrlFetchApp.fetch("https://webexapis.com/v1/people",optionsOauth2);
    // var json = responselist.getContentText();
    Logger.log(response.getResponseCode());
    return response.getResponseCode();
    
 
    // Logger.log(response);
    // return error.getResponseCode();
  
   
}
