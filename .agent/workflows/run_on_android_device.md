---
description: How to run the app on a real Android device
---

# Run on Android Device

This workflow guides you through running your Expo app on a physical Android device.

## Prerequisites
1. An Android device.
2. The **Expo Go** app installed on your device (available on the Google Play Store).
3. Your computer and Android device must be on the **same Wi-Fi network**.

## Steps

1. **Start the Development Server**
   Run the following command in your terminal:
   ```bash
   npx expo start
   ```
   // turbo
   
2. **Scan the QR Code**
   - Open the **Expo Go** app on your Android device.
   - Tap **"Scan QR Code"**.
   - Point your camera at the QR code displayed in the terminal.
   
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

### USB Debugging (Optional)
If you prefer to connect via USB:
1. Enable **Developer Options** and **USB Debugging** on your Android device.
2. Connect your device to your computer via USB.
3. Run `npx expo start --android` or press `a` in the terminal running the Expo server.
