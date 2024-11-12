const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const { updateElectronApp } = require('update-electron-app');
const { spawn } = require('child_process');
const os = require('os');
updateElectronApp();

let javaProcess;

async function createWindow() {
    const isDev = (await import('electron-is-dev')).default;

    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        }
    });

    const devURL = 'http://localhost:3000'; // Vite dev server URL
    const prodURL = `file://${path.join(__dirname, 'dist/index.html')}`;

    window.loadURL(isDev ? devURL : prodURL);

    const platform = os.platform();
    console.log(platform)
    const jarPath = isDev
        ? path.join(__dirname, 'demo/target/demo-0.0.1-SNAPSHOT.jar') // Development mode path
        : path.join(process.resourcesPath, 'backend/demo-0.0.1-SNAPSHOT.jar'); // Packaged app path

    let javaPath;


    if (isDev) {
        javaPath = 'java'; // Use system-installed Java in development mode
    } else {
        switch (platform) {
            case 'win32':
                javaPath = path.join(process.resourcesPath, '/jdk-17.0.13+11-jre/bin/java.exe'); // Windows production path
                break;
            case 'darwin':
                javaPath = path.join(process.resourcesPath, '/jdk-17.0.13+11-jre/Contents/Home/bin/java'); // macOS production path
                break;
            case 'linux':
                javaPath = path.join(process.resourcesPath, '/jdk-17.0.13+11-jre/bin/java'); // Linux production path
                break;
            default:
                throw new Error(`Unsupported platform: ${platform}`);
        }
    }

    javaProcess = spawn(javaPath, ['-jar', jarPath]);

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