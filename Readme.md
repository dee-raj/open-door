# Open-Door

Open-Door is a [React Native](https://reactnative.dev/) application inspired by Airbnb, offering modern UI and features for a seamless rental experience.

## Features

- **User Authentication**:
  - Social login with Google/Gmail using [Clerk Authentication](https://clerk.dev/)
  - Email/password login and registration
- **Dynamic Theming**:
  - Light and Dark modes using a custom `ThemeContext`
- **Intuitive Navigation**:
  - Tab and stack navigation
  - Business Stack with multiple pages
  - Password reset functionality
- **Progress Tracking**:
  - Visual indicators for 'not-completed,' 'in-progress,' and 'completed' states
- **Custom Styling**:
  - Reduced header heights
  - Consistent design with status bar styling

## Installation

To get started with the project, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/dee-raj/open-door.git
   cd open-door
   ```

2. **Install Dependencies**:
   We use NPM for package management.
   ```bash
   npm install
   ```

3. **Setup Clerk Authentication**:
   - Follow the [Clerk documentation](https://clerk.dev/docs) to configure authentication for your app.
   - Add the necessary Clerk environment variables to your `.env` file.

4. **Start the Application**:
   Run the application in development mode using Expo.
   ```bash
   npx expo start
   ```

5. **Run on Your Device**:
   - Use the Expo Go app to scan the QR code for live testing.
   - For a local build, run:
     ```bash
     npm android
     ```
     or
     ```bash
     npm ios
     ```

## Project Structure


```
app/                        # Main app components and pages
├── (models)/               # Dynamic pages like booking and login
│   ├── booking.tsx         # Booking-related models and logic
│   └── login.tsx           # Login-related models and logic
├── (tabs)/                 # Tab navigation components (e.g., profile, wishlist)
│   ├── inbox.tsx           # Inbox tab UI

├── (tabs)/                 # Tab navigation components (e.g., profile, wishlist)
│   ├── inbox.tsx           # Inbox tab UI
├   ├── index.tsx           # index for tabs
│   ├── profile.tsx         # Profile tab UI
│   ├── trips.tsx           # Trips tab UI
│   ├── wishlist.tsx        # Wishlist tab UI
│   └── _layout.tsx         # Layout for tabs
├── listing/                # Listing-specific screens
│   └── [id].tsx            # Dynamic listing page by ID
├── _layout.tsx             # Main layout for the app

assets/                     # Static assets (fonts, images, data)
├── data/                   # Data files like GeoJSON and categories
│   ├── air-bnb-listings.geojson
│   ├── air-bnb-listings.json
│   └── categories.ts

├── fonts/                  # Custom fonts
│   ├── Nunito-Bold.ttf
│   ├── Nunito-Italic.ttf
│   ├── Outfit-Black.ttf
│   └── SpaceMono-Regular.ttf

├── images/                 # Static images (icons, splash)
│   ├── adaptive-icon.png
│   ├── icon.png
│   ├── splash-icon.png
│   └── image1.webp
│   └── image1.webp ... image14.webp

components/                 # Reusable UI components
├── ExploreHeader.tsx       # Header component for Explore screen
└── ListingBottom.tsx       # Component to display listings with BottomSheet
└── Listings.tsx            # Component to display listings
└── ListingsMap.tsx         # Component to display listings on Maps with marker
└── ModelHeader.tsx         # Header component for Booking Model

constants/                  # Shared constants and types
├── Colors.ts               # Color constants
├── CustomTypes.ts          # Custom TypeScript types
└── Styles.ts               # Shared styles

hooks/                      # Custom React hooks
└── useWarmUpBrowser.ts     # Hook to warm up browser
share/                      # Shared logic and utilities
└── tokenCache.ts           # Token caching logic
.
├── .env                    # Environment variables
├── .gitignore              # Files and directories to ignore in Git
├── app.json                # App configuration for Expo
├── eas.json                # Expo Application Services configuration
├── package.json            # Project metadata and dependencies
├── tsconfig.json           # TypeScript configuration
└── Readme.md               # Project documentation

This format focuses only on the project structure, as per your request. Let me know if you need any more changes or additions!
```

## Technologies Used

- **React Native**: Cross-platform mobile app development
- **Expo**: Streamlined development and testing
- **Clerk Authentication**: Secure and scalable authentication
- **React Navigation**: Intuitive navigation for mobile apps
- **Firebase**: Backend services for database (if applicable)
- **Custom Theming**: Dynamic light/dark mode switch

## Contributing

If you'd like to contribute to the project, feel free to fork the repository and submit a pull request. 

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request

## License

This project is licensed under the [MIT License](LICENSE).
