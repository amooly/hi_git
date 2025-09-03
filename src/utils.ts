import * as vscode from 'vscode';
import * as simpleGit from 'simple-git';

/**
 * Utility functions for Hi Git extension
 */

export async function isGitRepository(workspacePath: string): Promise<boolean> {
    try {
        const git = simpleGit.simpleGit(workspacePath);
        await git.status();
        return true;
    } catch (error) {
        return false;
    }
}

export function showGitError(message: string, error?: any): void {
    const errorMessage = error ? `${message}: ${error.message || error}` : message;
    vscode.window.showErrorMessage(errorMessage);
}

export function showGitSuccess(message: string): void {
    vscode.window.showInformationMessage(message);
}

export function getRelativePath(workspacePath: string, filePath: string): string {
    return filePath.replace(workspacePath, '').replace(/^\//, '');
}