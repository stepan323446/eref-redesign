# Eref Redesign

The **"Eref Redesign"** plugin is designed to create a modern look with additional functionality and adaptability of the site [eref.vts.su.ac.rs](https://eref.vts.su.ac.rs/sr).

The plugin supports site languages ​​such as Serbian (sr) and Hungarian (hu).

* [Screenshots](#screenshots)
* [Installation](#installation)
    * [Google Chrome (Chromium, PC)](#google-chrome-chromium-desktop)
    * [Firefox (Gecko, PC)](#firefox-gecko-desktop)
* [Compatibility](#compatibility)

## Screenshots

| Desktop | Mobile |
| :-: | :-: |
| ![desktop-1](/assets/readme/professor-page.png) | ![mobile-1](/assets/readme/professor-page-mobile.png) |
| ![desktop-2](/assets/readme/profil-page.png) | ![mobile-2](/assets/readme/profil-page-mobile.png) |


| Mobile menu | Mobile login form |
| :-: | :-: |
| ![Mobile menu](/assets/readme/mobile-menu.png) | ![Mobile menu](/assets/readme/mobile-login.png)

## Installation

In this guide we will give examples based on 3 browsers. Some steps may differ depending on the browser, but they are basically the same.

### Google Chrome (Chromium, Desktop)

> [!NOTE]
> Place the plugin folder in one place and do not move it. After installing the plugin, its path is bound. 
> 
> If you move the folder, the plugin will be removed from the browser, then specify its path again, following the steps below.

1. Go to the tab with all extensions in your browser. In chrome, select **the extensions icon** and click "**Manage extensions**"

![Chrome step 1](/assets/readme/chrome-1.jpg)

2. Enable **Developer mode** to be able to load your own unpackaged extensions

3. Click on the "**Load unpacked**" button that appears

![Chrome step 2 and 3](/assets/readme/chrome-2.jpg)

4. Go to the extension folder where `manifest.json` is located. Select this exact folder

![Chrome step 4](/assets/readme/chrome-3.jpg)

5. Make sure the plugin is installed and enabled. Ready



### Firefox (Gecko, Desktop)

Soon

## Compatibility 

The plugin is supported by **Сhromium** and **Gecko** based browsers. The browser has been tested on browsers such as Microsoft Edge, Firefox, Mozilla, Google Chrome and Brave.

The following tables list the browsers that were tested.

### For desktop:
| Browser | Based on | Version | Is support? |
| :-: | :-: | :-: | :-: |
| Microsoft Edge | Chromium | `127.0.2651.86` | ✅ |

### For mobile:

Not tested

> [!NOTE]
> The list of mobile browsers included those that support the installation of extensions

## FAQ

### Q: What happens to the page? Is it safe?

The plugin just modifies the page using css and sometimes adds some elements using javascript.

The plugin does not send or receive data anywhere.

### Q: I get the error `Unrecognized manifest key 'browser_specific_settings'`.

This is not an error, but a warning. All chromium browsers receive this error. This is an unknown key for them in `manifest.json`. You don't have to pay attention.

This key is applicable to Gecko-based browsers such as Firefox.