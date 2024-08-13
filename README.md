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

To install the extension, go to the [Realeses](https://github.com/stepan323446/eref-redesign/releases) section and select the desired file (`.zip` for chromium, `.ixt` for gecko)

## Compatibility 

The plugin is supported by **Сhromium** and **Gecko** based browsers. The browser has been tested on browsers such as Microsoft Edge, Firefox, Mozilla, Google Chrome and Brave.

The following tables list the browsers that were tested.

### For desktop:
| Browser | Based on | Version | Is support? |
| :-: | :-: | :-: | :-: |
| Microsoft Edge | Chromium | `127.0.2651.86` | ✅ |
| Google Chrome | Chromium | `127.0.6533.99` | ✅ |
| Yandex browser | Chromium | `24.6.1.852` | ✅ |
| Brave | Chromium | `1.68.137` | ✅ |
| Firefox | Gecko | `127.0` | ❌ |
| Firefox Enterprise | Gecko | `---` | ✅ |
| Firefox Developer | Gecko | `---` | ✅ |
| Nightly | Gecko | `---` | ✅ |
| Floorp | Gecko | `11.16.0` | ✅ |

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