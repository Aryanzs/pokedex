# Pokedex App

This is a simple Pokedex application built using React. It fetches data from the PokeAPI to display a list of Pokemon and allows users to search for specific Pokemon. The app also features a loading spinner and pagination.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
  - [App](#app)
  - [Pokemon](#pokemon)
  - [Navbar](#navbar)
  - [Next](#next)
  - [Search](#search)
  - [Spinner](#spinner)
- [Contributing](#contributing)
- [License](#license)

## Features

- Display a list of Pokemon with their official artwork
- Search for specific Pokemon by name
- Pagination to navigate through the list of Pokemon
- Loading spinner for data fetching

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/pokedex-app.git
    cd pokedex-app
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the development server:
    ```sh
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000` to view the app.

## Components

### App

The main component that renders the `Pokemon` component.

```jsx
import React from 'react';
import Pokemon from './components/Pokemon';

const App = () => {
  return (
    <>
      <Pokemon />
    </>
  );
};

export default App;
