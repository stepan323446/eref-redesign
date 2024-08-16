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

Instructions for each of the popular browsers are available at [github wiki](https://github.com/stepan323446/eref-redesign/wiki). The instructions also include mobile browsers that support extensions. A list of such browsers can be found in the [Compatibility](#compatibility) section

Installing the plugin depends on what your browser is based on (Gecko or Chromium).

To install the extension, go to the [Realeses](https://github.com/stepan323446/eref-redesign/releases) section and select the desired file (`.zip` for chromium, `.xpi` for gecko)

## Compatibility 

The plugin is supported by **Сhromium** and **Gecko** based browsers. The browser has been tested on browsers such as Microsoft Edge, Firefox, Mozilla, Google Chrome and Brave.

The following tables list the browsers that were tested.

### For desktop:
| Browser | Based on | Version | Is support? |
| :-: | :-: | :-: | :-: |
| [Microsoft Edge](https://www.microsoft.com/en-us/edge/) | Chromium | `127.0.2651.86` | ✅ |
| [Google Chrome](https://www.google.com/chrome/) | Chromium | `127.0.6533.99` | ✅ |
| [Yandex browser](https://browser.yandex.com/) | Chromium | `24.6.1.852` | ✅ |
| [Vivaldi](https://vivaldi.com/) | Chromium | `6.8.3381.53` | ✅ |
| [Brave](https://brave.com/) | Chromium | `1.68.137` | ✅ |
| [Firefox](https://www.mozilla.org/en-US/firefox/new/) | Gecko | `127.0` | ❌ |
| [Firefox Developer](https://www.mozilla.org/en-US/firefox/developer/) | Gecko | `130.0b5` | ✅ |
| [Nightly](https://www.mozilla.org/en-US/firefox/131.0a1/releasenotes/) | Gecko | `131.0a1` | ✅ |
| [Floorp](https://floorp.app/) | Gecko | `11.16.0` | ✅ |

### For mobile:

| Browser | Based on | Version | Is support? |
| :-: | :-: | :-: | :-: |
| [Kiwi](https://kiwibrowser.com/) | Chromium | `124.0.6327.4` | ✅ |
| [Lemur](https://www.lemurbrowser.com/new_version_test/app/en.html) | Chromium | `2.6.1.027` | ✅ |
| [Mises](https://www.mises.site/) | Chromium | `224081406` | ✅ |
| [Iceraven](https://github.com/fork-maintainers/iceraven-browser) | Gecko | `2.22.0` | ✅ |

> [!NOTE]
> The list of mobile browsers included those that support the installation of extensions

## PWA (Progressive web appliacation)

One of the defining aspects of a PWA is that it can be promoted by the browser for installation on the device. Once installed, a PWA appears to users as a platform-specific app, a permanent feature of their device which they can launch directly from the operating system like any other app.

We can summarize this as follows:

*   Supporting browsers promote the PWA to the user for installation on the device.
*   The PWA can be installed like a platform-specific app, and can customize the install process.
*   Once installed, the PWA gets an app icon on the device, alongside platform-specific apps.
*   Once installed, the PWA can be launched as a standalone app, rather than a website in a browser.

> [!NOTE]
> Gecko browsers do not support PWA

| Desktop guide | Mobile guide | 
| :-: | :-: |
|![desktop-pwa](/assets/readme/pwa-desktop.jpg) |![mobile-pwa](/assets/readme/pwa-mobile.jpg) |
| When you visit the eref website, at the top of the address bar you will see an icon that will prompt you to install eref as an application | Visit the eref website. Then open the browser menu and select "**Add to Home Screen**" |

*Actions in different browsers may differ, but the principle is the same*

## FAQ

### Q: What happens to the page? Is it safe?

The plugin just modifies the page using css and sometimes adds some elements using javascript.

The plugin does not send or receive data anywhere.

### Q: I get the error `Unrecognized manifest key 'browser_specific_settings'`.

This is not an error, but a warning. All chromium browsers receive this error. This is an unknown key for them in `manifest.json`. You don't have to pay attention.

This key is applicable to Gecko-based browsers such as Firefox.