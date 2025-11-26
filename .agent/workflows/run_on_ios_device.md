---
description: How to run the app on a real iOS device
---

# Run on iOS Device

This workflow guides you through running your Expo app on a physical iPhone or iPad.

## Prerequisites
1. An iOS device (iPhone or iPad).
2. The **Expo Go** app installed on your device (available on the App Store).
3. Your computer and iOS device must be on the **same Wi-Fi network**.

## Steps

1. **Start the Development Server**
   Run the following command in your terminal:
   ```bash
   npx expo start
   ```
   // turbo
   
2. **Scan the QR Code**
   - Open the **Camera** app on your iOS device.
   - Point it at the QR code displayed in the terminal.
   - Tap the "Open in Expo Go" notification.
   
   *Alternatively, if you are logged into the same Expo account on both your computer and the Expo Go app, the project will appear under "Recently in Development" in the app.*

## Troubleshooting

### "Could not connect to the server"
If your device cannot connect to the server, it's usually a network issue.

1. **Check Wi-Fi**: Ensure both devices are on the exact same network.
2. **Use Tunneling**: If the direct connection fails (e.g., due to firewall or different subnets), try running with the tunnel flag:
   ```bash
   npx expo start --tunnel
   ```
   *Note: Tunneling may be slower than a direct LAN connection.*

### "Developer Mode Required" (iOS 16+)
If you are using a development build (not Expo Go) on iOS 16+, you may need to enable Developer Mode:
- Go to **Settings** > **Privacy & Security**.
- Scroll to the bottom and tap **Developer Mode**.
- Toggle it on and follow the restart prompts.
