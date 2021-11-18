#!/usr/bin/env bash

SELECTED=$(parse-chrome-bookmarks "$1")

URL=$(echo "$SELECTED" \
| rofi -i -dmenu -p 'bookmarks' \
| awk -F';' '{print $2}')

if [[ -z "$URL"]]; then
    echo 'No selection was made'
    exit 1
fi

google-chrome "$URL"
