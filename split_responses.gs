/*
 * Overall processing function. Gets triggered when a form response is submitted.
 * Puts the entry in the correct spreadsheet tab based on facility and emails the appropriate person.
*/
function onFormSubmit(response) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const defaultSheet = ss.getSheetByName(BEL.SHEET_NAME);
  const location = response.values[2];

  if (location === SEA.FORM_OPTION) {
    defaultSheet.deleteRow(defaultSheet.getLastRow());
    ss.getSheetByName(SEA.SHEET_NAME).appendRow(response.values);
    sendInformaticEmail(response, SEA);
  }
  else if (location === TAC.FORM_OPTION) {
    defaultSheet.deleteRow(defaultSheet.getLastRow());
    ss.getSheetByName(TAC.SHEET_NAME).appendRow(response.values);
    sendInformaticEmail(response, TAC);
  }
  else {
    sendInformaticEmail(response, BEL);
  }
}

/* 
 * Email notification that a response has been submitted.
 * Default option for notifications.
 */
function sendBasicEmail(FACILITY) {
  const message = {
    to: FACILITY.EMAIL,
    subject: "New responses in YP Recommendation Form - " + FACILITY.FORM_OPTION,
    htmlBody: "Hi " + FACILITY.MGR_NAME + ",<br><br>Your form, <a href='https://docs.google.com/forms/d/1cmGu07v8uEWNtSSdv09OahEF-eMYc8n4uHveHZlYmIg/edit'>YP Recommendation Form</a> has new responses.<br><br>View responses: <a href='" + FACILITY.LINK + "'>Recommendation Spreadhseet</a>.<br><br><em>This email is automated, please do not reply :)</em>", 
    name: "Climber Recommendation",
  };
  MailApp.sendEmail(message);
}

/* 
 * Email notification with a summary of what the recommendation is.
 * Created to flag additional info and cut out the step of checking the spreadsheet.
 * In most cases, checking the spreadsheet is still recommended.
 */
function sendInformaticEmail(response, FACILITY) {
  const instructor = capitalize(response.values[1]);
  const climber = capitalize(response.values[3]);
  const recommendedTo = response.values[5];
  const message = {
    to: FACILITY.EMAIL,
    subject: "New responses in YP Recommendation Form",
    htmlBody: "Hi " + FACILITY.MGR_NAME + ",<br><br>" + instructor + " has recommended " + climber + " for " + recommendedTo + 
              ".<br><br>View additional information in the response spreadsheet: <a href='" + FACILITY.LINK + "'>Recommendation Form Responses</a>" + 
              "<br><br><em>This email is automated, please do not reply :)</em>",
    name: "Climber Recommendation",
  };
  MailApp.sendEmail(message);
}

/* 
* Helper function to capitalize names. Won't apply to climber last names because the parsing becomes overkill.
*/
function capitalize(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
