# Google Maps Tracking App

This project is a mobile application built with Capacitor, React, and TypeScript for tracking and displaying locations on Google Maps.

## Features

- Real-time location tracking
- Google Maps integration

## Prerequisites

To run this project, you need the following:

- Node.js (version 14.0 or higher)
- npm (version 6.0 or higher)
- Capacitor CLI (version 3.0 or higher)
- A valid Google Maps API key

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
4. Run 
```bash
npm run build
npx cap sync
```
5. update your mobile app manifests with apikey
```xml
<meta-data android:name="com.google.android.geo.API_KEY" android:value="api-key-goes-here"/>
```
and permissions:
```xml
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-feature android:name="android.hardware.location.gps" />
```
6. run on android:
```bash
npx cap open android
```
## License
This project is licensed under the MIT License
