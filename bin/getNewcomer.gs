/**
 * get newcomer list who engage today from ldap
 * 
 * @param bearer {string} token from oauth
 * 
 * @return {array}
 */

function getNewcomer(bearer) {
  var apiKey = getAPIkey();
  var optionsOauth2 = {
    "method": "GET",
    "headers": {
      "Accept": "application/ld+json",
      "Authorization": "Bearer " + bearer,
      "x-api-key": apiKey,
      "muteHttpExceptions": true
    }
  };
  var dateRange = getDayRange();
  var firstDay = dateRange[0];
  var lastDay = dateRange[1];
  var responselist = UrlFetchApp.fetch("https://api-eu.decathlon.net/directory/v1/users?c=CN&state=0&engage_date[after]=" + firstDay + "&engage_date[before]=" + lastDay + "&fields=uid,sn,given_name,mail,manager,engage_date,site", optionsOauth2);
  // var responselist = UrlFetchApp.fetch("https://api-eu.decathlon.net/directory/v1/users?c=CN&ContractType[]=F1&ContractType[]=E1&state=0&engage_date[after]=20230520&engage_date[before]=20230520&fields=uid,sn,given_name,mail,manager,engage_date,site", optionsOauth2);
  var json = responselist.getContentText();
  var result = JSON.parse(json);

  var data = [];
  result["hydra:member"].forEach(function (elem, i) {
    var profile;
    if (elem["uid"] !== undefined) {
      profile = elem["uid"][0];
    }
    //Logger.log(profile);
    var mail;
    if (elem["mail"] !== null) {
      mail = elem["mail"][0];
    }
    //Logger.log(mail);
    var givenName;
    if (elem["given_name"] !== undefined) {
      givenName = elem["given_name"][0];
    }
    //Logger.log(givenName);
    var surName;
    if (elem["sn"] !== undefined) {
      surName = elem["sn"][0];
    }
    //Logger.log(surName);
    var manager;
    if (elem["manager"] !== undefined) {
      manager = elem["manager"][0];
    }
    //Logger.log(manager);

    var engageDate;
    if (elem["engage_date"] !== undefined) {
      engageDate = elem["engage_date"];
    }

    const dataRow = [];
    //Logger.log(formatEngageDate(engageDate));
    dataRow.push(profile);
    dataRow.push(givenName);
    dataRow.push(surName);
    dataRow.push(mail);
    dataRow.push(engageDate);
    data.push(dataRow);


  });

  Logger.log(responselist.getResponseCode());

  if (responselist.getResponseCode() == 200 || responselist.getResponseCode() == 206) {
    Logger.log(data);
    return data;
  } else {
    return 'error';
  }
}


/**
 * get the date of today
 * 
 * @param startDay {date} the date of today
 * 
 * @return {string}
 */
function getDayRange() {
  let today = new Date(+ new Date() + 8 * 60 * 60 * 1000);
  let yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  // Logger.log(today.toISOString());
  // Logger.log(yesterday.toISOString());

  let todayFormatted = today.toISOString().slice(0, 10).replace(/-/g, "");
  let yesterdayFormatted = yesterday.toISOString().slice(0, 10).replace(/-/g, "");

  let dateArray = [yesterdayFormatted, todayFormatted];

  Logger.log(dateArray);

  return dateArray;
}


function formatEngageDate() {
  let today = new Date(+ new Date() + 8 * 60 * 60 * 1000);
  let yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  Logger.log(today.toISOString());
  Logger.log(yesterday.toISOString());

  let todayFormatted = today.toISOString().slice(0, 10).replace(/-/g, "");
  let yesterdayFormatted = yesterday.toISOString().slice(0, 10).replace(/-/g, "");

  let dateArray = [yesterdayFormatted, todayFormatted];

  Logger.log(dateArray);
}
