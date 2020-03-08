# TeleFrame addon: FlexInterval

This is an addon for the [TeleFrame](https://github.com/LukeSkywalker92/TeleFrame).

## Description

It introduces additional picture changes, so that when interacting with the frame (startup, touch etc.) the intervals between picture changes are short, and with time grow longer. This way the frame is less disturbing when in the background and more active when you are using it. 

## Installation

Clone the flexInterval-folder into your Teleframe-addon-folder:

```sh
cd ~/TeleFrame/addons
git clone https://github.com/call-me-matt/teleframe-flexintervals.git flexInterval
```

Use the addon_control script to enable or disable the addon:

```sh
# enable addon
~/TeleFrame/tools/addon_control.sh enable flexInterval

# disable addon
~/TeleFrame/tools/addon_control.sh disable flexInterval
```

Then Restart TeleFrame.

