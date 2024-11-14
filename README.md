# Electron Kafka Tester

**Electron Kafka Tester** is a desktop application built with Electron, React, and Spring Boot. It provides an intuitive UI for managing and testing locally.

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
    - [Development Mode](#development-mode)
    - [Building and Packaging](#building-and-packaging)

## Overview

Technologies used:
- **Electron** for cross-platform desktop application capabilities.
- **React** for the frontend, developed with Vite.
- **Spring Boot** for the backend, which communicates with Kafka.

## Prerequisites

Make sure you have the following installed:
- **Node.js** (version 18.x or later recommended)
- **Java** (version 17 or later recommended)
- **Maven** (version 3.x or later recommended)

## Usage
### Development Mode

- **Frontend and Backend with Manual Backend Start:**

    In development mode, you need to start the backend manually. Open a terminal, navigate to the demo directory, and run:
    ```bash
    cd demo && mvn spring-boot:run
    ```

    Then, in the main project directory, start the frontend in development mode:

    ```bash
    npm run start
    ```
- **Frontend and Backend with Automatic Backend Start:**

    For a simpler workflow, use npm run start-demo, which automatically starts the backend and the frontend in development mode.
    This command does the following:

    ```bash
    npm run start-demo
    ```

### Building and Packaging
To create a build for testing on your local machine, use the following commands:

- **Build and test with `dev-make`**:

    ```bash
    npm run dev-make
    ```
- **Build and package with `dev-package`**:

    ```bash
    npm run dev-package
    ```
