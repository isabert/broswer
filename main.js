const {BrowserWindow, BrowserView, Menu, app, ipcMain} = require('electron');
const path = require('path');
// enable live reload for the project
require('electron-reload')(__dirname, {electron: path.join(__dirname,'node_modules','.bin','electron')});
//require('electron-reload')(__dirname);

let mainWin, mainWin2;
let browWin1, browWin2;
let pg=1;


function createWindow(){
    mainWin = new BrowserWindow({
        width: 1000, height: 600,
        minWidth: 400, minHeight: 200,
        backgroundColor: '#2e2c20',
        tabbingIdentifier: 'first',
        //frame: false,  //transparent: true,
//titleBarStyle: 'hidden',
        autoHideMenuBar: true,
        webPreferences: { nodeIntegration: true}
    });
    mainWin.webContents.openDevTools();
    const mymn = Menu.buildFromTemplate(mn);
    Menu.setApplicationMenu(mymn)
    mainWin.loadFile("./mwin.html");
    mainWin.on('closed', () => app.quit());
};


app.on('ready', () => {
  createWindow();   //createView();
});

const mn =
  [ {label: 'toggle',
      click(){
        if (pg === 1) { pg = 2; mainWin.setBrowserView(browWin2)}
        else { pg = 1; mainWin.setBrowserView(browWin1)}
      }
    },
    {label: 'tools',
     submenu: [
       {
         label: 'Toggle DevTools',
         accelerator: process.platform=='darwin' ? 'Command+I' : 'Ctrl+I',
         click(item, focuseWindow){
           focuseWindow.toggleDevTools();
         }
       },
       {role: 'reload'},
    ]},
  ]

