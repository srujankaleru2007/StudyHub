import React, { useState } from 'react'
import Editor from '@monaco-editor/react'
import './OnlineCompiler.css'

const OnlineCompiler = () => {
  const [code, setCode] = useState(`// Welcome to StudyHub Online Compiler!
// Select your language and start coding

function hello() {
    console.log("Hello from StudyHub!");
    return "Ready to code!";
}

hello();`)
  const [language, setLanguage] = useState('javascript')
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [theme, setTheme] = useState('vs-dark')

  const languages = [
    { value: 'javascript', label: 'JavaScript', default: `function hello() {\n    console.log("Hello from StudyHub!");\n    return "Ready to code!";\n}\n\nhello();` },
    { value: 'python', label: 'Python', default: `# Python Code\nprint("Hello from StudyHub!")\ndef hello():\n    return "Ready to code!"\n\nprint(hello())` },
    { value: 'java', label: 'Java', default: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from StudyHub!");\n    }\n}` },
    { value: 'cpp', label: 'C++', default: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello from StudyHub!" << endl;\n    return 0;\n}` },
    { value: 'c', label: 'C', default: `#include <stdio.h>\n\nint main() {\n    printf("Hello from StudyHub!\\n");\n    return 0;\n}` },
    { value: 'html', label: 'HTML', default: `<!DOCTYPE html>\n<html>\n<head>\n    <title>StudyHub</title>\n</head>\n<body>\n    <h1>Hello from StudyHub!</h1>\n</body>\n</html>` },
    { value: 'css', label: 'CSS', default: `body {\n    font-family: Arial, sans-serif;\n    background: #1a1f2e;\n    color: white;\n}` }
  ]

  const executeCode = async () => {
    setIsLoading(true)
    setOutput('')

    try {
      if (language === 'javascript') {
        // For JavaScript, we can use a sandboxed execution
        const logs = []
        const originalLog = console.log
        console.log = (...args) => {
          logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' '))
        }

        try {
          const func = new Function(code)
          const result = func()
          const outputText = logs.length > 0 
            ? logs.join('\n') + (result !== undefined ? `\n${result}` : '')
            : (result !== undefined ? String(result) : 'Execution completed')
          setOutput(outputText || 'No output')
        } catch (error) {
          setOutput(`Error: ${error.message}`)
        }

        console.log = originalLog
      } else if (language === 'html') {
        // For HTML, show preview
        const preview = window.open('', '_blank')
        preview.document.write(code)
        preview.document.close()
        setOutput('HTML preview opened in new window!')
      } else if (language === 'css') {
        // For CSS, show as output
        setOutput(code)
      } else {
        // For other languages, use JDoodle API (free tier)
        const response = await fetch('https://api.jdoodle.com/v1/execute', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            script: code,
            language: language === 'python' ? 'python3' : language === 'cpp' ? 'cpp17' : language,
            versionIndex: '0',
            clientId: 'YOUR_CLIENT_ID', // Users need to get their own
            clientSecret: 'YOUR_CLIENT_SECRET'
          })
        })

        if (!response.ok) {
          throw new Error('Compiler API error')
        }

        const data = await response.json()
        setOutput(data.output || data.error || 'No output')
      }
    } catch (error) {
      setOutput(`Error: ${error.message}\n\nNote: For Python, C++, Java, and C, you need to configure JDoodle API credentials.\nVisit: https://www.jdoodle.com/compiler-api`)
    }

    setIsLoading(false)
  }

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage)
    const lang = languages.find(l => l.value === newLanguage)
    if (lang) {
      setCode(lang.default)
    }
    setOutput('')
  }

  const clearCode = () => {
    const lang = languages.find(l => l.value === language)
    setCode(lang ? lang.default : '')
    setOutput('')
  }

  return (
    <div className="online-compiler">
      <div className="compiler-header">
        <h3>💻 Online Compiler</h3>
        <div className="compiler-controls">
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="language-select"
          >
            {languages.map(lang => (
              <option key={lang.value} value={lang.value}>{lang.label}</option>
            ))}
          </select>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="theme-select"
          >
            <option value="vs-dark">Dark</option>
            <option value="vs-light">Light</option>
            <option value="hc-black">High Contrast</option>
          </select>
          <button onClick={clearCode} className="clear-btn">
            Clear
          </button>
          <button onClick={executeCode} className="run-btn" disabled={isLoading}>
            {isLoading ? '⏳ Running...' : '▶ Run'}
          </button>
        </div>
      </div>

      <div className="compiler-body">
        <div className="editor-container">
          <Editor
            height="400px"
            language={language === 'cpp' ? 'cpp' : language === 'c' ? 'c' : language}
            value={code}
            theme={theme}
            onChange={(value) => setCode(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
              automaticLayout: true,
              scrollBeyondLastLine: false,
            }}
          />
        </div>

        <div className="output-container">
          <div className="output-header">
            <span>Output</span>
            <button onClick={() => setOutput('')} className="clear-output-btn">
              Clear
            </button>
          </div>
          <div className="output-content">
            {isLoading ? (
              <div className="loading-output">Executing code...</div>
            ) : output ? (
              <pre>{output}</pre>
            ) : (
              <div className="empty-output">Output will appear here...</div>
            )}
          </div>
        </div>
      </div>

      <div className="compiler-footer">
        <p>💡 Tip: JavaScript runs directly in your browser. For other languages, configure JDoodle API at jdoodle.com</p>
      </div>
    </div>
  )
}

export default OnlineCompiler

