# Call Fabric Client

**SignalWire Call Fabric Client Beta** is a React-based web application designed to facilitate video conferencing and call management using the SignalWire API. This project provides a user-friendly interface for creating video rooms, managing call controls (mute/unmute audio/video), selecting media devices (microphones, cameras, speakers), and handling subscriber authentication.

The application leverages modern web technologies such as React, TypeScript, Tailwind CSS, and the SignalWire Community SDK to deliver a seamless video conferencing experience.

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Components](#components)
- [Diagram](#diagram)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Video Conferencing**: Create and join video rooms with customizable settings (e.g., room name, quality, layout).
- **Call Controls**: Mute/unmute audio and video during calls.
- **Device Selection**: Dynamically select microphones, cameras, and speakers.
- **Subscriber Authentication**: Sign in or sign up as a subscriber using reference and password.
- **Responsive Design**: Built with Tailwind CSS for a modern, responsive UI.
- **State Management**: Centralized call state management using React Context.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (v9 or higher) or [Yarn](https://yarnpkg.com/)
- A SignalWire account with API credentials (Project ID, API Token, Space URL, etc.)

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/call-fabric-client.git
   cd call-fabric-client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables** (see [Configuration](#configuration) below).

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (or another port if specified).

---

## Configuration

Create a `.env` file in the root directory based on the provided `.env.example`:

```env
VITE_PROJECT_ID=<your-signalwire-project-id>
VITE_API_TOKEN=<your-signalwire-api-token>
VITE_SPACE_URL=<your-signalwire-space-url>
VITE_OAUTH_APPLICATION_ID=<your-oauth-application-id>
VITE_SAT_CH=<your-sat-channel>
```

Replace the placeholder values with your SignalWire credentials. These are required for API authentication and video room creation.

---

## Usage

1. **Start the app**:
   ```bash
   npm run dev
   ```
   or
   ```bash
   npm start
   ```

2. **Access the app**:
   Open your browser and navigate to `http://localhost:5173`.

3. **Main Features**:
    - **Call Console**: Enter a room name and username, then click "Dial" to start a video call.
    - **Controls**: During a call, toggle audio/video mute states.
    - **Device Select**: Choose your preferred microphone, camera, and speaker.
    - **Subscriber Page**: Sign in or sign up as a subscriber.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## Project Structure

```
call-fabric-client/
├── src/
│   ├── components/         # Reusable React components
│   ├── pages/             # Page-level components
│   ├── state/             # Context and state management
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── index.css          # Global styles
│   └── main.tsx           # Entry point
├── public/                # Static assets
├── .env.example           # Example environment variables
├── package.json           # Project metadata and dependencies
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── tailwind.config.js     # Tailwind CSS configuration
```

---

## Components

### `ButtonGroup`
A reusable component that renders a group of buttons with customizable labels, click handlers, and styles.

### `CallConsole`
The main interface for initiating and managing video calls, including room creation and disconnection.

### `Controls`
Provides buttons to mute/unmute audio and video during a call.

### `DeviceSelect`
Allows users to select their preferred media devices (microphones, cameras, speakers).

### `ListItem`
A styled list item component used in `DeviceSelect` for device selection.

### `Navbar`
A navigation bar with links to the home and subscriber pages.

### `SubscriberSignupSignin`
A form for subscriber authentication (signin/signup).

### `App`
The root component that sets up routing and renders the main layout.

### `CallPage`
Displays the active video call using SignalWire's `VideoConference` component.

### `SubscriberPage`
Handles subscriber authentication and user information display.

### `CallProvider` / `useCall`
Context and hook for managing call state across the application.

---

## Diagram

Below is a placeholder for a diagram illustrating the application’s architecture or component flow.

<img src="public/diagram.png" alt="Application Diagram" width="600">

---

## Dependencies

- **React**: Front-end library for building the UI.
- **React Router**: For client-side routing.
- **SignalWire Community SDK**: For video conferencing functionality.
- **Axios**: For making HTTP requests to the SignalWire API.
- **Tailwind CSS**: For styling the application.
- **TypeScript**: For static typing and improved developer experience.

See `package.json` for the full list of dependencies.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

Please ensure your code follows the existing style and includes tests where applicable.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.