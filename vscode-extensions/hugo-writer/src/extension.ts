// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { execSync } from 'child_process';
import { create } from 'domain';


const nowyyyymmdd = () => {
	var dt = new Date();
	const y = dt.getFullYear();
	const m = ("00" + (dt.getMonth()+1)).slice(-2);
	const d = ("00" + (dt.getDate())).slice(-2);
	return y + m + d;
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "hugo-writer" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const helloWorldCommand = vscode.commands.registerCommand('hugo-writer.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from hugo-writer!');
	});

	const createDiaryCmd = vscode.commands.registerCommand('hugo-writer.create-diary', async () => {
		const workspacePath = vscode.workspace.workspaceFolders;
		if (!workspacePath) {
			vscode.window.showInformationMessage('vscode.workspace.workspaceFolders returns undefined');
			return;
		}

		if (workspacePath[0].name !== 'reud.net' ) {
			vscode.window.showErrorMessage(`workspacePath[0].name is ${workspacePath[0].name}. not reud.net . `);
		}

		const date = nowyyyymmdd();
		let reudNetPath = workspacePath[0].uri;
		const diaryPath = vscode.Uri.parse(`${reudNetPath.path}/contents/diary/${date}/index.md`);

		try {
			await vscode.workspace.fs.stat(diaryPath);
			vscode.window.showTextDocument(diaryPath, { viewColumn: vscode.ViewColumn.Beside });
		} catch {
			// 何もしない
		}

		const stdout = execSync(`hugo new diary/${date}/index.md  --kind diary`,{'cwd': reudNetPath.path});
		vscode.window.showInformationMessage(stdout.toString());

		const textDocument = await vscode.workspace.openTextDocument(diaryPath);
		await	vscode.window.showTextDocument(textDocument,1,false);
	});

	const createDiaryButton = vscode.window.createStatusBarItem(
		vscode.StatusBarAlignment.Right,
		0
	);
	createDiaryButton.command = 'hugo-writer.create-diary';
	createDiaryButton.text = '日記を作る';


	context.subscriptions.push(createDiaryCmd);
	context.subscriptions.push(createDiaryButton);
	context.subscriptions.push(helloWorldCommand);

	createDiaryButton.show();
}

// This method is called when your extension is deactivated
export function deactivate() {}
