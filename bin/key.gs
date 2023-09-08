/**
 * get accesstoken for webex portal
 * 
 * @return {string}
 */


function getWebexKey() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Key");
  var text = sheet.getRange(1,1).getValue();
  Logger.log(text);

  var payload = {
  "grant_type": "refresh_token",
  "refresh_token": text,
  "client_id": "**********************",
  "client_secret": "**********************",
  }

  // Logger.log(JSON.stringify(payload));

  var optionsOauth2 = {
    "method": "POST",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    "payload": payload
  };


  var responselist = UrlFetchApp.fetch("https://webexapis.com/v1/access_token", optionsOauth2);
  var json = responselist.getContentText();
  var result = JSON.parse(json);
  Logger.log(result);

  sheet.getRange(1,1).setValue(result.refresh_token);
  Logger.log(result.access_token);
  return result.access_token;  

}

/**
 * get accesstoken for IAM api
 * 
 * @return {string}
 */

function getBearer() {
  var clientIdSecret = getSecert();
  var optionsOauth2 = {
    "method": "POST",
    "headers": {
      "Authorization": "Basic " + clientIdSecret,
    },
    "payload": {
      "grant_type": "client_credentials"
    }
  };
  var responseOauth2 = UrlFetchApp.fetch("https://idpdecathlon.oxylane.com/as/token.oauth2", optionsOauth2);
  var jsonOauth2 = responseOauth2.getContentText();
  var dataOauth2 = JSON.parse(jsonOauth2);
  var accessToken = dataOauth2["access_token"];
  Logger.log(accessToken);
  return accessToken;
}

/**
 * get secret for client id identifying
 * secret is stored in another sheet
 * 
 * @return {string}
 */

function getSecert(){
  return SpreadsheetApp.openById("1xqpuPnnx6h7eSfpVUzCxbbKeuOOK6H9DX0qIbW0C-ns").getRange("B1").getValue();
}

/**
 * get api key for IAM identifying
 * api key is stored in another sheet
 * 
 * @return {string}
 */

function getAPIkey(){
  return SpreadsheetApp.openById("1xqpuPnnx6h7eSfpVUzCxbbKeuOOK6H9DX0qIbW0C-ns").getRange("B2").getValue();  
}
