"use client";

import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  height?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = 'javascript',
  height = '400px'
}) => {
  const handleEditorChange = (value: string | undefined) => {
    onChange(value || '');
  };

  return (
    <div style={{ 
      border: '1px solid #d9d9d9', 
      borderRadius: '6px',
      overflow: 'hidden'
    }}>
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={handleEditorChange}
        theme="vs-light"
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          lineNumbers: 'on',
          renderLineHighlight: 'all',
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible'
          },
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          folding: true,
          lineNumbersMinChars: 3,
          glyphMargin: false,
        }}
        loading={
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '400px',
            background: '#f5f5f5'
          }}>
            Loading Code Editor...
          </div>
        }
      />
    </div>
  );
};

export default CodeEditor;