# Google Maps Tracking App

This project is a mobile application built with Capacitor, React, and TypeScript for tracking and displaying locations on Google Maps.

Capacitor docs and example:

- https://capacitorjs.com/docs/apis/google-maps
- https://capacitorjs.com/docs/apis/geolocation

## Features

- Real-time location tracking
- Google Maps integration

## Prerequisites

To run this project, you need the following:

- Node.js (version 14.0 or higher)
- npm (version 6.0 or higher)
- Capacitor CLI (version 3.0 or higher)
- A valid Google Maps API key: https://developers.google.com/maps/documentation/android-sdk/overview?hl=en

## Installation

1. Clone this repository:

```bash
   git clone https://github.com/MichalKurzewski/capacitor-react.git
   cd capacitor-react
```

2. Install the dependencies:

```bash
npm install
```

3. Create a .env file in the root directory of the project and add your Google Maps API key:

```bash
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

4. Run

```bash
npm run build
npx cap sync
```

5. update your mobile app manifests with apikey

```xml
<meta-data android:name="com.google.android.geo.API_KEY" android:value="your_api_key_here"/>
```

and permissions for android/app/src/main/AndroidManifest.xml:

```xml
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-feature android:name="android.hardware.location.gps" />
```

descriptions for ios/App/App/Info.plist:

```xml
	<key>NSLocationWhenInUseUsageDescription</key>
	<string>$(PRODUCT_NAME) would like to access your location</string>
	<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
	<string>$(PRODUCT_NAME) would like to access your location</string>
	<key>NSLocationAlwaysUsageDescription</key>
	<string>$(PRODUCT_NAME) would like to access your location</string>
	<key>NSCameraUsageDescription</key>
	<string>$(PRODUCT_NAME) would like to access your camera</string>
	<key>NSPhotoLibraryUsageDescription</key>
	<string>$(PRODUCT_NAME) would like to access your photo library</string>
	<key>NSPhotoLibraryAddUsageDescription</key>
	<string>$(PRODUCT_NAME) would like to add photos to your photo library</string>
```

6. run on android:

```bash
npx cap open android
```

## License

This project is licensed under the MIT License
