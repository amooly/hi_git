# Hi Git Extension Demo

This directory contains the Hi Git VS Code extension which provides advanced Git operations.

## Quick Start

1. **Install the extension in development mode:**
   - Open this project in VS Code
   - Press `F5` to launch the Extension Development Host
   - A new VS Code window will open with the extension loaded

2. **Test the features:**
   - Open any Git repository in the new VS Code window
   - Use `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) to open the command palette
   - Type "Hi Git" to see available commands

## Available Commands

- **Hi Git: Show Commit Graph** - Opens a visual commit graph in a webview
- **Hi Git: Git Status** - Shows current Git status in a popup
- **Hi Git: Git Log** - Opens a formatted Git log in a webview
- **Hi Git: Git Add** - Adds the current file to Git staging area
- **Hi Git: Git Commit** - Creates a new commit with a custom message

## Context Menu Features

- **Right-click on files** to access Git Status and Git Add
- **Right-click on folders** to access Git Log and Show Commit Graph

## Example Usage

1. Open a Git repository
2. Right-click on a file → Select "Git Status"
3. Use Command Palette → "Hi Git: Show Commit Graph"
4. Right-click on a folder → Select "Git Log"

The extension will display formatted Git information in webviews and information messages.