import React, { useState, useEffect } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { GeneratedAppData } from '@/services/AIService';
import prettier from 'prettier';
import * as babel from 'prettier/parser-babel';
import * as typescript from 'prettier/parser-typescript';

interface FileStructure {
  name: string;
  content: string;
  language: string;
}

interface CodeExplorerProps {
  generatedApp: GeneratedAppData;
  onCodeChange?: (code: string) => void;
}

const CodeExplorer: React.FC<CodeExplorerProps> = ({ generatedApp, onCodeChange }) => {
  const [selectedFile, setSelectedFile] = useState<string>('App.tsx');
  const [files, setFiles] = useState<FileStructure[]>([
    {
      name: 'App.tsx',
      content: generatedApp?.previewCode || '// No code generated yet',
      language: 'typescript'
    },
    {
      name: 'styles.ts',
      content: `import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});`,
      language: 'typescript'
    },
    {
      name: 'types.ts',
      content: `export interface AppProps {
  // Add your props here
}`,
      language: 'typescript'
    }
  ]);
  const [editorInstance, setEditorInstance] = useState<any>(null);

  // Update main file content when generatedApp changes
  useEffect(() => {
    if (generatedApp?.previewCode) {
      setFiles(prev => prev.map(file => 
        file.name === 'App.tsx' 
          ? { ...file, content: generatedApp.previewCode } 
          : file
      ));
    }
  }, [generatedApp?.previewCode]);

  const handleEditorChange = (value: string | undefined) => {
    if (!value) return;
    
    // Update the file content
    setFiles(prev => prev.map(file => 
      file.name === selectedFile 
        ? { ...file, content: value } 
        : file
    ));

    // Only trigger preview update for App.tsx changes
    if (selectedFile === 'App.tsx') {
      onCodeChange?.(value);
    }
  };

  const formatCode = async () => {
    if (!editorInstance) return;

    const currentFile = getCurrentFile();
    const unformatted = currentFile.content;

    try {
      const formatted = await prettier.format(unformatted, {
        parser: 'typescript',
        plugins: [typescript, babel],
        singleQuote: true,
        semi: true,
        tabWidth: 2,
        trailingComma: 'es5',
        printWidth: 80,
      });

      // Update the file content
      setFiles(prev => prev.map(file => 
        file.name === selectedFile 
          ? { ...file, content: formatted } 
          : file
      ));

      // If it's App.tsx, trigger the preview update
      if (selectedFile === 'App.tsx') {
        onCodeChange?.(formatted);
      }
    } catch (error) {
      console.error('Error formatting code:', error);
    }
  };

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    setEditorInstance(editor);

    // Define Darcula-like theme
    monaco.editor.defineTheme('darcula', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '808080' },
        { token: 'keyword', foreground: 'cc7832' },
        { token: 'string', foreground: '6A8759' },
        { token: 'number', foreground: '6897BB' },
        { token: 'type', foreground: 'FFC66D' },
        { token: 'class', foreground: 'FFC66D' },
        { token: 'function', foreground: 'FFC66D' },
        { token: 'variable', foreground: 'A9B7C6' },
        { token: 'operator', foreground: 'CC7832' }
      ],
      colors: {
        'editor.background': '#2B2B2B',
        'editor.foreground': '#A9B7C6',
        'editor.lineHighlightBackground': '#323232',
        'editor.selectionBackground': '#214283',
        'editor.inactiveSelectionBackground': '#214283',
        'editorCursor.foreground': '#A9B7C6',
        'editorWhitespace.foreground': '#3B3B3B',
        'editorLineNumber.foreground': '#606366',
        'editorLineNumber.activeForeground': '#A4A3A3',
        'editor.selectionHighlightBackground': '#32446B',
        'editor.wordHighlightBackground': '#32446B',
        'editor.findMatchBackground': '#32446B',
        'editor.findMatchHighlightBackground': '#32446B88'
      }
    });

    // Set the theme
    monaco.editor.setTheme('darcula');

    // Add keyboard shortcut for formatting
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      formatCode();
    });
  };

  const getCurrentFile = () => {
    return files.find(f => f.name === selectedFile) || files[0];
  };

  return (
    <div className="h-full bg-[#2B2B2B] text-white flex">
      {/* File explorer sidebar */}
      <div className="w-48 border-r border-[#323232]">
        <div className="p-2 text-sm font-medium text-gray-300 border-b border-[#323232]">
          📁 Explorer
        </div>
        <div className="p-2">
          {files.map((file) => (
            <div
              key={file.name}
              className={`px-2 py-1 rounded cursor-pointer text-sm flex items-center ${
                selectedFile === file.name 
                  ? 'bg-[#37373d] text-white' 
                  : 'text-gray-400 hover:bg-[#2a2d2e]'
              }`}
              onClick={() => setSelectedFile(file.name)}
            >
              <span className="mr-2">
                {file.language === 'typescript' ? '📄' : '📝'}
              </span>
              {file.name}
            </div>
          ))}
        </div>
      </div>

      {/* Editor section */}
      <div className="flex-1">
        {/* File tab bar with Format button */}
        <div className="flex justify-between border-b border-gray-700">
          <div className="flex">
            {files.map((file) => (
              <div
                key={file.name}
                className={`px-3 py-1 text-xs cursor-pointer flex items-center gap-2 ${
                  selectedFile === file.name 
                    ? 'bg-[#282c34] text-white border-t-2 border-blue-500' 
                    : 'text-gray-400 hover:bg-[#2a2d2e]'
                }`}
                onClick={() => setSelectedFile(file.name)}
              >
                {file.language === 'typescript' ? '📄' : '📝'}
                {file.name}
              </div>
            ))}
          </div>
          <button
            onClick={formatCode}
            className="px-3 py-1 text-xs text-gray-300 hover:bg-[#2a2d2e] flex items-center gap-1"
            title="Format Code (Ctrl/Cmd + S)"
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16m-7 6h7" 
              />
            </svg>
            Format
          </button>
        </div>

        {/* Monaco Editor */}
        <Editor
          height="calc(100vh - 115px)"
          defaultLanguage={getCurrentFile().language}
          value={getCurrentFile().content}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          theme="vs-dark"  // This will give us a dark theme similar to Darcula
          options={{
            fontSize: 14,
            fontFamily: 'monospace',
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            lineNumbers: 'on',
            automaticLayout: true,
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
};

export default CodeExplorer;
