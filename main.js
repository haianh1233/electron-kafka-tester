const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const { updateElectronApp } = require('update-electron-app');
const { spawn } = require('child_process');
const os = require('os');
const express = require('express');
const axios = require('axios');

updateElectronApp();

const BACKEND_HEALTH_URL = 'http://localhost:8080/api/v1/health';
const FRONTEND_DEV_URL = 'http://localhost:3000';
const FRONTEND_PRO_PORT = 3001;
const FRONTEND_PROD_URL = `http://localhost:${FRONTEND_PRO_PORT}/index.html`;
const JAVA_JAR_PROD_PATH = path.join(process.resourcesPath, 'backend/demo-0.0.1-SNAPSHOT.jar');
const JRE_PATHS = {
    win32: path.join(process.resourcesPath, '/jdk-17.0.13+11-jre/bin/java.exe'),
    darwin: path.join(process.resourcesPath, '/jdk-17.0.13+11-jre/Contents/Home/bin/java'),
    linux: path.join(process.resourcesPath, '/jdk-17.0.13+11-jre/bin/java')
};

let server;
let javaProcess;

async function checkBackendHealth(retries = 10, interval = 1000) {
    let attempts = 0;
    while (attempts < retries) {
        try {
            const response = await axios.get(BACKEND_HEALTH_URL);
            if (response.status === 200) {
                console.log("Backend is healthy.");
                return true;
            }
        } catch (error) {
            attempts += 1;
            console.log(`Backend health check attempt ${attempts} failed.`);
            await new Promise(resolve => setTimeout(resolve, interval));
        }
    }
    throw new Error("Backend failed to start after multiple attempts.");
}

async function createWindow() {
    const isDev = (await import('electron-is-dev')).default;

    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        }
    });

    if (isDev) {
        try {
            await checkBackendHealth();
        } catch (error) {
            console.error("Backend health check failed:", error.message);
            app.quit(); // Exit if the backend doesn't start
        }

        window.loadURL(FRONTEND_DEV_URL);
    } else {
        // Production: Serve from Express
        const expressApp = express();
        const distPath = path.join(process.resourcesPath, 'dist');

        expressApp.use(express.static(distPath));

        // Start the server on an available port
        server = expressApp.listen(FRONTEND_PRO_PORT, () => {
            console.log("Production URL:", FRONTEND_PROD_URL);
            window.loadURL(FRONTEND_PROD_URL);
        });

        // Start the Java backend process in production mode
        const platform = os.platform();
        const jarPath = JAVA_JAR_PROD_PATH;

        let javaPath;
        switch (platform) {
            case 'win32':
                javaPath = JRE_PATHS.win32;
                break;
            case 'darwin':
                javaPath = JRE_PATHS.darwin;
                break;
            case 'linux':
                javaPath = JRE_PATHS.linux;
                break;
            default:
                throw new Error(`Unsupported platform: ${platform}`);
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

    if (server) server.close();

})