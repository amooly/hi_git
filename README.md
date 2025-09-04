# Hi Git - Advanced Git Operations Extension

## Overview
Hi Git is a Visual Studio Code extension that enhances your Git workflow by providing advanced Git operations with commit visualization and enhanced context menus. This extension allows you to visualize commit graphs and perform Git operations directly from the VS Code interface.

## Features

### 🌟 Core Features
- **Commit Graph Visualization**: Display a visual representation of all commits across branches
- **Enhanced Context Menus**: Right-click on files and directories for quick Git operations
- **Git Status Integration**: Quick access to Git status for files and repositories
- **Streamlined Git Operations**: Simplified Git add, commit, and log operations

### 📋 Available Commands
- **Hi Git: Show Commit Graph** - Visualize commit history with an interactive graph
- **Hi Git: Git Status** - View the current Git status of your repository
- **Hi Git: Git Log** - Display recent commit history in a formatted view
- **Hi Git: Git Add** - Add files to the Git staging area
- **Hi Git: Git Commit** - Create commits with custom messages

### 🖱️ Context Menu Integration
- **File Context Menu**: 
  - Git Status - Check the status of individual files
  - Git Add - Stage individual files for commit
- **Directory Context Menu**:
  - Git Log - View commit history for the directory
  - Show Commit Graph - Display the commit graph for the repository

## Installation

### From Source
1. Clone this repository or download the source code
2. Open the project in Visual Studio Code
3. Run `npm install` to install dependencies
4. Run `npm run compile` to build the extension
5. Press `F5` to launch a new VS Code window with the extension loaded

### Usage
1. Open a Git repository in VS Code
2. Access Hi Git commands via:
   - Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) - Type "Hi Git"
   - Right-click context menus on files and folders
   - Explorer context menus

### Requirements
- Visual Studio Code 1.60.0 or higher
- Git installed and accessible from the command line
- A Git repository (local or cloned)

## Commands Reference

| Command | Description | Access |
|---------|-------------|--------|
| `hiGit.showCommitGraph` | Display interactive commit graph | Command Palette, Directory Context Menu |
| `hiGit.gitStatus` | Show Git repository status | Command Palette, File/Editor Context Menu |
| `hiGit.gitLog` | Display formatted Git log | Command Palette, Directory Context Menu |
| `hiGit.gitAdd` | Add files to Git staging area | Command Palette, File/Editor Context Menu |
| `hiGit.gitCommit` | Create a new commit | Command Palette |

## Development

### Building
```bash
npm install
npm run compile
```

### Testing
1. Open the project in VS Code
2. Press `F5` to launch the Extension Development Host
3. Test the commands in a Git repository

## Contributing
If you would like to contribute to this project, please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request with a clear description of your changes

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Changelog

### Version 0.0.1
- Initial release with commit graph visualization
- Context menu integration for Git operations
- Basic Git commands (status, add, commit, log)
- Webview-based commit graph and log display