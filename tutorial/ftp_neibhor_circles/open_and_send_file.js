const electron = require('electron').remote
const dialog = electron.dialog

function file_function(){
    path = dialog.showOpenDialog({buttonLabel: 'Send',  properties: ['openFile', 'openDirectory', 'multiSelections'] });
    msg = "You have selected : "+path
    alert(msg);
}


