# Architecture and Folder Structure

## Overview
This project is a React Native application built with Expo and Expo Router. It serves as an employee portal with features like leave management, team directory, and quick actions. The app is designed to work on both mobile (iOS/Android) and web platforms.

## Folder Structure

```
/
├── app/                    # Expo Router pages and layouts
│   ├── (tabs)/             # Main tab navigation
│   │   ├── _layout.tsx     # Tab bar configuration
│   │   ├── index.tsx       # Home/Dashboard screen
│   │   ├── search.tsx      # Search screen
│   │   ├── chat.tsx        # Chat screen
│   │   ├── appstore.tsx    # App Store screen
│   │   ├── directory.tsx   # Directory screen (placeholder)
│   │   ├── calendar.tsx    # Calendar screen (placeholder)
│   │   └── profile.tsx     # Profile screen (placeholder)
│   ├── _layout.tsx         # Root layout and provider setup
│   ├── +html.tsx           # Custom HTML for web
│   ├── +not-found.tsx      # 404 page
│   ├── apply-leave.tsx     # Apply Leave screen
│   ├── apply-wfh.tsx       # Apply WFH screen
│   └── approvals.tsx       # Approvals screen
├── assets/                 # Static assets (images, fonts)
├── components/             # Reusable UI components
│   ├── BannerCarousel.tsx  # Home screen banner carousel
│   ├── EventsList.tsx      # List of upcoming events
│   ├── Header.tsx          # Main application header
│   ├── LeaveBalanceSection.tsx # Leave balance display
│   ├── MeSection.tsx       # Personal quick actions
│   ├── QuickActions.tsx    # Grid of quick action widgets
│   ├── SearchModal.tsx     # Search functionality component
│   ├── TeamSection.tsx     # Team members display
│   ├── UpcomingSchedule.tsx # Schedule display
│   └── ... (other widgets)
├── constants/              # App constants (Colors, etc.)
├── utils/                  # Utility functions
└── ... (config files)
```

## Component Interaction

### Navigation
- **Expo Router**: The app uses file-based routing.
- **Root Layout (`app/_layout.tsx`)**: Manages the global theme provider and font loading. It renders a `Stack` navigator.
- **Tab Layout (`app/(tabs)/_layout.tsx`)**: Manages the bottom tab navigation. It renders a `Tabs` navigator.
- **Screens**: Individual screens (e.g., `index.tsx`, `search.tsx`) are standard React components exported as default.

### Data Flow
- Currently, the app primarily uses local state (`useState`) and props to pass data.
- **Search Functionality**: The `SearchScreen` (`app/(tabs)/search.tsx`) uses the `SearchContent` component exported from `components/SearchModal.tsx`. This allows the search UI to be reused as both a modal (historically) and a full-screen tab.

### Styling
- **Constants**: `constants/Colors.ts` defines the color palette and shadow styles used throughout the app.
- **Inline Styles**: Most components use `StyleSheet.create` for styling.
- **Responsive Design**: The app uses `Platform.select` and conditional rendering to adapt to different platforms (Web vs. Native).

## Key Design Decisions
- **Unified Search**: The search experience is centralized in `SearchContent` to ensure consistency.
- **Tab-Based Navigation**: The core navigation is a bottom tab bar, providing easy access to primary sections.
- **Component Modularity**: Features are broken down into small, focused components (e.g., `QuickActions`, `LeaveBalanceSection`) to keep screens clean and maintainable.
