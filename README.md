# YouTube Shorts Blocker 🚫

A lightweight Chrome extension that helps you stay focused by blocking YouTube Shorts videos across the platform.

## Features

- 🚫 **Blocks YouTube Shorts** in all locations (feed, sidebar, shorts page, etc.)
- 🎛️ **Simple toggle** to enable/disable blocking
- 🎨 **Clean, minimal UI** 
- ⚡ **Super lightweight** with minimal performance impact
- 🔄 **Real-time blocking** of dynamically loaded content

## Installation

### Method 1: Install from Chrome Web Store (Recommended)
*Note: This extension is not yet published to the Chrome Web Store*

### Method 2: Manual Installation (Developer Mode)

1. **Download the extension**
   - Clone this repository or download as ZIP
   - Extract the files to a folder on your computer

2. **Enable Developer Mode in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Turn on "Developer mode" using the toggle in the top right

3. **Load the extension**
   - Click "Load unpacked" button
   - Select the folder containing the extension files
   - The extension should now appear in your extensions list

4. **Pin the extension (Optional)**
   - Click the puzzle piece icon in Chrome's toolbar
   - Click the pin icon next to "YouTube Shorts Blocker"

## How to Use

### Basic Usage
1. **Auto-blocking**: The extension works automatically once installed
2. **Toggle on/off**: Click the extension icon and use the toggle switch to enable/disable blocking

### Features in Detail

#### 🎯 What Gets Blocked
- YouTube Shorts videos in the main feed
- Shorts in the sidebar recommendations
- Entire `/shorts/` pages (with friendly blocked message)
- Shorts shelves and carousels
- Shorts tabs on channel pages

#### ⚙️ Settings
- **Enable/Disable**: Simple toggle to turn blocking on/off
- **Real-time updates**: Changes apply immediately
- **Persistent settings**: Your preferences are saved

## Technical Details

### Files Structure
```
youtube-shorts-blocker/
├── manifest.json          # Extension configuration
├── content.js            # Main blocking logic
├── popup.html           # Extension popup interface
├── popup.css            # Popup styling
├── popup.js             # Popup functionality
├── styles.css           # Content page styling
├── icons/               # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   ├── icon128.png
│   └── icon.svg
└── README.md           # This file
```

### How It Works
1. **Content Script**: Monitors YouTube pages for shorts content
2. **CSS Hiding**: Uses CSS `display: none` to hide shorts elements
3. **MutationObserver**: Watches for dynamically loaded content
4. **URL Monitoring**: Detects navigation to shorts pages
5. **Storage API**: Saves user preferences

### Permissions Used
- `storage`: Save user preferences
- `host_permissions`: Run on YouTube.com domains

## Browser Compatibility

- ✅ Chrome (Manifest V3)
- ✅ Edge (Chromium-based)
- ⚠️ Firefox (requires Manifest V2 conversion)
- ⚠️ Safari (requires Safari Web Extension conversion)

## Troubleshooting

### Extension Not Working
1. **Refresh YouTube**: Reload the YouTube page
2. **Check if enabled**: Click extension icon and verify toggle is on
3. **Restart browser**: Close and reopen Chrome
4. **Reinstall extension**: Remove and reinstall the extension

### Shorts Still Appearing
1. **Clear cache**: Clear browser cache and cookies
2. **Disable other extensions**: Check for conflicts with other extensions
3. **Update Chrome**: Ensure you're using the latest Chrome version

### Performance Issues
1. **Check CPU usage**: The extension should use minimal resources
2. **Disable temporarily**: Turn off the extension to test performance
3. **Report issues**: Contact developer if problems persist

## Privacy

This extension:
- ✅ **Does NOT collect personal data**
- ✅ **Does NOT track browsing history**
- ✅ **Only stores anonymous statistics locally**
- ✅ **Does NOT connect to external servers**
- ✅ **Open source and transparent**

## Development

### Building from Source
```bash
# Clone the repository
git clone <repository-url>
cd youtube-shorts-blocker

# No build process required - ready to use!
```

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Testing
1. Load extension in developer mode
2. Navigate to YouTube
3. Verify shorts are blocked
4. Test toggle functionality
5. Check statistics accuracy

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### Version 1.0.0
- Initial release
- Basic shorts blocking functionality
- Statistics tracking
- Toggle enable/disable
- Modern popup UI

## Support

If you encounter any issues or have suggestions:

1. **Check troubleshooting section** above
2. **Open an issue** on the GitHub repository
3. **Provide details** about your browser version and the issue

## Acknowledgments

- Thanks to the Chrome Extensions API documentation
- Inspired by the need for focused YouTube browsing
- Built with modern web technologies

---

**Stay focused, stay productive!** 🎯
