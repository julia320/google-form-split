function trigger() {
  var ss = SpreadsheetApp.getActive();
  ScriptApp.newTrigger('onFormSubmit')
      .forSpreadsheet(ss)
      .onFormSubmit()
      .create();
}
