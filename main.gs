/**
 * create webex users from IDAP
 * Author： kally.yang@decathlon.com
 * Desc: Find newcomers which engage today & yesterday, and create them in webex.
 * Modify time: 2023-05-26
 */

/**
 * main function
 * 
 * setup a daily trigger on 6AM
 */

function main() {
  var bearer = getBearer();
  var webexKey = getWebexKey();
  var successList = [];
  var conflictList = [];
  var errorList = [];
  var log = [];
  var now = new Date();
  log.push(now.toLocaleString());
  try {
    var newcomer = getNewcomer(bearer);
    Logger.log(newcomer);
    for (i = 0; i < newcomer.length; i++) {
      var creationCode = createPerson(webexKey, newcomer[i][3], newcomer[i][1], newcomer[i][2]);
      if (creationCode === 200) {
        successList.push(newcomer[i][0]);
      } else if (creationCode === 409) {
        conflictList.push(newcomer[i][0]);
      } else {
        errorList.push(newcomer[i][0]);
      }
    }
    log.push(successList.join());
    log.push(conflictList.join());
    log.push(errorList.join());
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Log").appendRow(log);
  } catch (error) {
    log.push(error);
    log.push(error);
    log.push(error);
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Log").appendRow(log);
  }
}
