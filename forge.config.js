const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
const os = require('os');

const platform = os.platform();

let extraResources;
switch (platform) {
  case 'win32':
    extraResources = ['./backend', './jre/windows/jdk-17.0.13+11-jre'];
    break;
  case 'darwin':
    extraResources = ['./backend', './jre/macos/jdk-17.0.13+11-jre'];
    break;
  case 'linux':
    extraResources = ['./backend', './jre/linux/jdk-17.0.13+11-jre'];
    break;
  default:
    throw new Error(`Unsupported platform: ${platform}`);
}

module.exports = {
  packagerConfig: {
    asar: true,
    extraResource: extraResources,
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        authors: 'anhnguyen',
        description: 'electron-kafka-tester'
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'haianh1233',
          name: 'electron-kafka-tester'
        },
        prerelease: true
      }
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
