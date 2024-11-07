const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const { updateElectronApp } = require('update-electron-app');
const { spawn } = require('child_process');
updateElectronApp();

const jarPath = 'demo/target/demo-0.0.1-SNAPSHOT.jar';
let javaProcess;

function createWindow () {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        }
    });

    window.loadFile('index.html');

    javaProcess = spawn('java', ['-jar', jarPath]);

    javaProcess.stdout.on('data', (data) => {
        console.log(`Output: ${data}`);
    });

    javaProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
    });

    javaProcess.on('close', (code) => {
        console.log(`Java process exited with code ${code}`);
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()

    if (javaProcess) {
        console.log('Stopping Java process...');
        javaProcess.kill('SIGINT');
    }
})