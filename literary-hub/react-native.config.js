module.exports = {
    project: {
      ios: {},
      android: {}, // grouped into "project"
    },
    assets: ["./assets/fonts/"], // stays the same
  };

let plugins = [
  [
    'expo-facebook',
    {
      userTrackingPermission: false,
    },
  ],
  [
    'expo-image-picker',
    {
      photosPermission:
        'The app accesses your photos to let you upload a profile picture.',
    },
  ],
];
if (process.env.SENTRY_DSN && process.env.SENTRY_DSN.length > 0) {
  plugins.push(['sentry-expo']);
}