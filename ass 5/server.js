const http = require('http');
const os = require('os');
const path = require('path');
const EventEmitter = require('events');

// --- Part 4: Events Module ---
// Define a custom event emitter class
class ServerEmitter extends EventEmitter {}
const serverEvents = new ServerEmitter();

// Listen to the custom event
serverEvents.on('serverStarted', (port) => {
  console.log(`\n======================================================`);
  console.log(`[Event Triggered]: Server started successfully!`);
  console.log(`Server is currently running at http://localhost:${port}`);
  console.log(`======================================================\n`);
  
  // --- Part 3: Path Module (Console Demonstration) ---
  console.log('--- Path Module Details (Console) ---');
  console.log('1. __dirname (Current Directory):', __dirname);
  console.log('2. __filename (Current File):', __filename);
  console.log('3. path.basename():', path.basename(__filename));
  console.log('4. path.extname():', path.extname(__filename));
  console.log('-------------------------------------\n');
});

// Helper function to return formatted HTML responses (Bonus feature)
const generateHTML = (title, content) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        * { box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            background-color: #f8fafc; 
            color: #334155; 
            margin: 0; 
            padding: 40px 20px; 
            display: flex;
            justify-content: center;
        }
        .container { 
            width: 100%;
            max-width: 650px; 
            background: white; 
            padding: 35px; 
            border-radius: 12px; 
            box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1); 
        }
        h1 { 
            color: #0f172a; 
            border-bottom: 3px solid #e2e8f0; 
            padding-bottom: 15px; 
            margin-top: 0;
            margin-bottom: 30px;
        }
        p { line-height: 1.7; font-size: 16px; margin-bottom: 15px;}
        ul { list-style-type: none; padding: 0; }
        li { 
            background: #f1f5f9; 
            margin: 10px 0; 
            padding: 15px; 
            border-radius: 8px; 
            font-weight: 500;
            display: flex;
            align-items: center;
            border-left: 4px solid #3b82f6;
        }
        .nav { 
            display: flex;
            gap: 15px;
            margin-bottom: 30px; 
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 20px;
        }
        .nav a { 
            text-decoration: none; 
            background: #3b82f6; 
            color: white; 
            padding: 10px 18px; 
            border-radius: 6px; 
            font-weight: 600;
            transition: background 0.2s;
        }
        .nav a:hover { background: #2563eb; }
    </style>
</head>
<body>
    <div class="container">
        <div class="nav">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/system">System Info</a>
            <a href="/path">Path Info</a>
        </div>
        <h1>${title}</h1>
        ${content}
    </div>
</body>
</html>
`;

// --- Part 1: Custom HTTP Server ---
const server = http.createServer((req, res) => {
    // Set headers explicitly for HTML text
    res.setHeader('Content-Type', 'text/html');

    if (req.url === '/') {
        res.statusCode = 200;
        res.end(generateHTML('Welcome to Core Node JS!', '<p>This application demonstrates the power of Node.js built-in core modules: <strong>HTTP, OS, Path, and Events</strong>.</p><p>Use the navigation tabs above to explore different features programmed fully without Express.js!</p>'));
    } 
    else if (req.url === '/about') {
        res.statusCode = 200;
        res.end(generateHTML('About This App', '<ul><li><strong>Project:</strong> Node.js Core Modules Demo</li><li><strong>Purpose:</strong> Assignment 5 demonstration.</li><li><strong>Dependencies:</strong> Zero (Running wholly on Node runtime elements).</li></ul>'));
    } 
    else if (req.url === '/system') {
        // --- Part 2: OS Module Details formatting ---
        const platform = os.platform();
        const arch = os.arch();
        const totalMemGB = (os.totalmem() / 1e9).toFixed(2);
        const freeMemGB = (os.freemem() / 1e9).toFixed(2);

        const systemContent = `
            <p>Here are the real-time Hardware and Operating System details retrieved by the <code>os</code> module:</p>
            <ul>
                <li>🖥️ OS Platform: ${platform.toUpperCase()}</li>
                <li>⚙️ CPU Architecture: ${arch}</li>
                <li>💾 Total System Memory: ${totalMemGB} GB</li>
                <li>⚡ Available Free Memory: ${freeMemGB} GB</li>
            </ul>
        `;
        res.statusCode = 200;
        res.end(generateHTML('System Information Viewer', systemContent));
    }
    else if (req.url === '/path') {
        // --- Part 3: Path Module (Browser View) ---
        const pathContent = `
            <p>Path properties retrieved using the <code>path</code> module and Node globals:</p>
            <ul>
                <li>📁 <strong>__dirname:</strong><br/> ${__dirname}</li>
                <li>📄 <strong>__filename:</strong><br/> ${__filename}</li>
                <li>🏷️ <strong>path.basename():</strong><br/> ${path.basename(__filename)}</li>
                <li>🧩 <strong>path.extname():</strong><br/> ${path.extname(__filename)}</li>
            </ul>
        `;
        res.statusCode = 200;
        res.end(generateHTML('Path Module Information', pathContent));
    }
    else {
        // 404 handler for invalid routes
        res.statusCode = 404;
        res.end(generateHTML('404 Not Found', '<p>Whoops! The route you are trying to visit does not exist inside our server configuration.</p>'));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    // Calling the custom emitter when port listening completes
    serverEvents.emit('serverStarted', PORT);
});
