# Restaurant App — React Native (Expo) Frontend

Frontend-only scaffold matching this flow:

```
RoleSelect → Customer (Menu → Cart → Order Summary → Order Tracking, + Profile)
           → Manager  (Dashboard, Reservations)
```

## Run it

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go (Android/iOS), or press `i` / `a` for a simulator.

## Structure

```
App.js                          entry point, wraps app in CartProvider
src/
  context/CartContext.js        cart state: items, promo, order type, totals
  data/mockData.js               menu items, orders, reservations (fake data)
  theme/theme.js                  colors, spacing, typography constants
  navigation/
    RootNavigator.js              RoleSelect → CustomerTabs / ManagerTabs
    CustomerNavigator.js          bottom tabs (Menu, Profile) + stack for Cart/Order flow
    ManagerNavigator.js           bottom tabs (Dashboard, Reservations)
  screens/
    RoleSelectScreen.js
    customer/
      MenuScreen.js               search + category filter + add to cart
      CartScreen.js               quantity, notes, promo code, totals
      OrderSummaryScreen.js       dine-in/takeaway toggle, final review
      OrderTrackingScreen.js      animated status stages
      ProfileScreen.js
    manager/
      DashboardScreen.js          stat cards + live orders list
      ReservationsScreen.js       reservation list with status
  components/
    MenuItemCard.js
    CategoryChip.js
    CartItemRow.js
```

## What's real vs. stubbed

- **Real**: navigation flow, cart math (subtotal/discount/tax/total), promo code
  validation (`SAVE10`, `WELCOME5`), search/filter, quantity + notes editing,
  order tracking animation.
- **Stubbed (no backend)**: all data in `mockData.js`, no auth, no persistence
  between app restarts, no real payment integration.

## Next steps if this goes further

- Wire a real API instead of `mockData.js`.
- Add auth so Manager routes aren't just a tab away from Customer.
- Persist cart with AsyncStorage so it survives app restarts.
- Replace the `setInterval` mock in OrderTrackingScreen with real order-status push/poll.
