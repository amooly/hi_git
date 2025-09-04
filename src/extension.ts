import * as vscode from 'vscode';
import * as simpleGit from 'simple-git';
import * as path from 'path';
import { isGitRepository, showGitError, showGitSuccess } from './utils';

export function activate(context: vscode.ExtensionContext) {
    console.log('Hi Git extension is now active!');

    // Initialize git instance
    const git = simpleGit.simpleGit();

    // Register command for showing commit graph
    const showCommitGraphCommand = vscode.commands.registerCommand('hiGit.showCommitGraph', async (uri?: vscode.Uri) => {
        try {
            const workspaceFolder = getWorkspaceFolder(uri);
            if (!workspaceFolder) {
                showGitError('No workspace folder found');
                return;
            }

            const workspacePath = workspaceFolder.uri.fsPath;
            if (!(await isGitRepository(workspacePath))) {
                showGitError('Current workspace is not a Git repository');
                return;
            }

            const gitInstance = simpleGit.simpleGit(workspacePath);
            const log = await gitInstance.log(['--graph', '--oneline', '--all', '--decorate', '-20']);
            
            const panel = vscode.window.createWebviewPanel(
                'commitGraph',
                'Git Commit Graph',
                vscode.ViewColumn.One,
                {
                    enableScripts: true
                }
            );

            panel.webview.html = getCommitGraphHtml(log);
            showGitSuccess('Commit graph opened successfully');
        } catch (error) {
            showGitError('Error showing commit graph', error);
        }
    });

    // Register command for git status
    const gitStatusCommand = vscode.commands.registerCommand('hiGit.gitStatus', async (uri?: vscode.Uri) => {
        try {
            const workspaceFolder = getWorkspaceFolder(uri);
            if (!workspaceFolder) {
                vscode.window.showErrorMessage('No workspace folder found');
                return;
            }

            const gitInstance = simpleGit.simpleGit(workspaceFolder.uri.fsPath);
            const status = await gitInstance.status();
            
            const statusText = formatGitStatus(status);
            vscode.window.showInformationMessage(`Git Status:\n${statusText}`, { modal: true });
        } catch (error) {
            vscode.window.showErrorMessage(`Error getting git status: ${error}`);
        }
    });

    // Register command for git log
    const gitLogCommand = vscode.commands.registerCommand('hiGit.gitLog', async (uri?: vscode.Uri) => {
        try {
            const workspaceFolder = getWorkspaceFolder(uri);
            if (!workspaceFolder) {
                vscode.window.showErrorMessage('No workspace folder found');
                return;
            }

            const gitInstance = simpleGit.simpleGit(workspaceFolder.uri.fsPath);
            const log = await gitInstance.log(['-10']);
            
            const panel = vscode.window.createWebviewPanel(
                'gitLog',
                'Git Log',
                vscode.ViewColumn.One,
                {}
            );

            panel.webview.html = getGitLogHtml(log);
        } catch (error) {
            vscode.window.showErrorMessage(`Error showing git log: ${error}`);
        }
    });

    // Register command for git add
    const gitAddCommand = vscode.commands.registerCommand('hiGit.gitAdd', async (uri?: vscode.Uri) => {
        try {
            if (!uri) {
                vscode.window.showErrorMessage('No file selected');
                return;
            }

            const workspaceFolder = getWorkspaceFolder(uri);
            if (!workspaceFolder) {
                vscode.window.showErrorMessage('No workspace folder found');
                return;
            }

            const gitInstance = simpleGit.simpleGit(workspaceFolder.uri.fsPath);
            const relativePath = path.relative(workspaceFolder.uri.fsPath, uri.fsPath);
            
            await gitInstance.add(relativePath);
            vscode.window.showInformationMessage(`Added ${relativePath} to git staging area`);
        } catch (error) {
            vscode.window.showErrorMessage(`Error adding file to git: ${error}`);
        }
    });

    // Register command for git commit
    const gitCommitCommand = vscode.commands.registerCommand('hiGit.gitCommit', async () => {
        try {
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
            if (!workspaceFolder) {
                vscode.window.showErrorMessage('No workspace folder found');
                return;
            }

            const commitMessage = await vscode.window.showInputBox({
                prompt: 'Enter commit message',
                placeHolder: 'Your commit message here...'
            });

            if (!commitMessage) {
                return;
            }

            const gitInstance = simpleGit.simpleGit(workspaceFolder.uri.fsPath);
            await gitInstance.commit(commitMessage);
            vscode.window.showInformationMessage(`Committed with message: "${commitMessage}"`);
        } catch (error) {
            vscode.window.showErrorMessage(`Error committing: ${error}`);
        }
    });

    // Add all commands to context subscriptions
    context.subscriptions.push(
        showCommitGraphCommand,
        gitStatusCommand,
        gitLogCommand,
        gitAddCommand,
        gitCommitCommand
    );
}

function getWorkspaceFolder(uri?: vscode.Uri): vscode.WorkspaceFolder | undefined {
    if (uri) {
        return vscode.workspace.getWorkspaceFolder(uri);
    }
    return vscode.workspace.workspaceFolders?.[0];
}

function formatGitStatus(status: any): string {
    const lines: string[] = [];
    
    lines.push(`Current branch: ${status.current}`);
    lines.push(`Behind: ${status.behind}, Ahead: ${status.ahead}`);
    
    if (status.files.length > 0) {
        lines.push('\nFiles:');
        status.files.forEach((file: any) => {
            lines.push(`  ${file.index}${file.working_dir} ${file.path}`);
        });
    } else {
        lines.push('\nWorking tree clean');
    }
    
    return lines.join('\n');
}

function getCommitGraphHtml(log: any): string {
    const commits = log.all.map((commit: any) => {
        return `
            <div class="commit">
                <div class="commit-hash">${commit.hash.substring(0, 8)}</div>
                <div class="commit-message">${commit.message}</div>
                <div class="commit-author">${commit.author_name}</div>
                <div class="commit-date">${commit.date}</div>
            </div>
        `;
    }).join('');

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .commit { 
                    border: 1px solid #ccc; 
                    margin: 10px 0; 
                    padding: 10px; 
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }
                .commit-hash { 
                    font-family: monospace; 
                    font-weight: bold; 
                    color: #0066cc;
                }
                .commit-message { 
                    margin: 5px 0; 
                    font-weight: bold;
                }
                .commit-author { 
                    color: #666; 
                    font-size: 0.9em;
                }
                .commit-date { 
                    color: #888; 
                    font-size: 0.8em;
                }
            </style>
        </head>
        <body>
            <h1>Git Commit Graph</h1>
            ${commits}
        </body>
        </html>
    `;
}

function getGitLogHtml(log: any): string {
    const commits = log.all.map((commit: any) => {
        return `
            <tr>
                <td class="hash">${commit.hash.substring(0, 8)}</td>
                <td class="message">${commit.message}</td>
                <td class="author">${commit.author_name}</td>
                <td class="date">${new Date(commit.date).toLocaleDateString()}</td>
            </tr>
        `;
    }).join('');

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                th { background-color: #f2f2f2; }
                .hash { font-family: monospace; color: #0066cc; }
                .message { font-weight: bold; }
                .author { color: #666; }
                .date { color: #888; }
            </style>
        </head>
        <body>
            <h1>Git Log</h1>
            <table>
                <tr>
                    <th>Hash</th>
                    <th>Message</th>
                    <th>Author</th>
                    <th>Date</th>
                </tr>
                ${commits}
            </table>
        </body>
        </html>
    `;
}

export function deactivate() {
    console.log('Hi Git extension is now deactivated!');
}