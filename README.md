# TeleFrame addon: FlexInterval

This is an addon for the [TeleFrame](https://github.com/LukeSkywalker92/TeleFrame).

## Description

It introduces additional picture changes, so that when interacting with the frame (startup, touch etc.) the intervals between picture changes are short, and with time grow longer. This way the frame is less disturbing when in the background and more active when you are using it. 

## Installation

Clone the flexInterval-folder into your Teleframe-addon-folder:


To enable and disable addons and set simple configuration options, the command-line tool `~/TeleFrame/tools/addon_control.sh` is available.

```sh
cd ~/TeleFrame/addons
git clone https://github.com/call-me-matt/teleframe-flexintervals.git flexInterval
```

Use the addon_control script to enable or disable the addon:

```sh
cd ~/TeleFrame

# enable addon
~/TeleFrame/tools/addon_control.sh enable flexInterval

# disable addon
~/TeleFrame/tools/addon_control.sh disable flexInterval
```

Then Restart TeleFrame.

