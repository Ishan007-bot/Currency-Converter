### `README.md` for Currency Converter App

---

# Currency Converter App

A **React Native** application to seamlessly convert currencies. The app uses **Exchange Rate API** to fetch live currency rates, provides a modern and intuitive user interface, and includes features like swapping currencies, saving preferences, and a techy visual theme.

---

## Features

- **Real-Time Currency Conversion**:
  Fetches the latest conversion rates using the [Exchange Rate API](https://www.exchangerate-api.com/).

- **Swap Currencies**:
  Quickly switch between "From" and "To" currencies.

- **Save Preferences**:
  Automatically saves the last used currencies and amount locally using `AsyncStorage`.

- **Searchable Dropdowns**:
  Easily find currencies using the searchable dropdown fields.

- **Tech-Themed Background**:
  A visually appealing tech-inspired gradient background for enhanced user experience.

- **Animations**:
  Proper smooth fade-in animations for the results using `react-native-reanimated`.

---

## Installation

### Prerequisites
- Node.js   (>= 14.x recommended)
- React Native environment set up ([Guide](https://reactnative.dev/docs/environment-setup))
- Exchange Rate API Key (if the API requires one for extended usage)

### Steps
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <project_folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   - For Android:
     ```bash
     npm run android
     ```
   - For iOS:
     ```bash
     npm run ios
     ```

4. Install additional fonts for `react-native-vector-icons`:
   ```bash
   npx react-native link react-native-vector-icons
   ```

---

## Usage

1. Open the app and input an amount in the "Enter Amount" field.
2. Select currencies using the dropdowns for "From Currency" and "To Currency".
3. Tap **Convert** to see the converted amount.
4. Use the **Swap** button to interchange currencies.

---


## Dependencies

- **react-native**: Core framework
- **react-native-picker-select**: For dropdown menus
- **react-native-reanimated**: Smooth animations
- **react-native-vector-icons**: Material icons
- **axios**: API requests
- **@react-native-async-storage/async-storage**: Persistent local storage

Install all dependencies using:
```bash
npm install
```

![](https://komarev.com/ghpvc/?username=Ishan007-bot)


## Screenshots

| Home Screen with Inputs | Conversion Results |
| ![Home](https://github.com/user-attachments/assets/7a83ed19-00e9-4bc8-9f49-fe3129cfc44b) | ![DropDown](https://github.com/user-attachments/assets/bc6272b7-f328-498f-af1f-0abd40e676fa)

---

