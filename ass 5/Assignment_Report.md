# Assignment 5: Exploring Node.js Core Modules

## Title
Development of a Node.js Application using Built-in HTTP, OS, Path, and Events Modules.

## Aim
To build and understand a fundamental Node.js server from scratch utilizing pure core modules without external frameworks like Express.js.

## Objective
- To deploy a custom HTTP web server using the `http` module handling custom route paths.
- To retrieve and display hardware/system specifications using the `os` module.
- To correctly format system paths and file executions utilizing the `path` module.
- To trigger and listen to custom notifications using the `events` architecture.

## Theory

1. **HTTP Module**: Node.js features a highly performant built-in HTTP server and client. Using `http.createServer()`, developers can listen on a port and handle client requests natively.
2. **OS Module**: Provides operating system-related utility methods and properties (i.e., `os.platform()`, `os.totalmem()`). It interfaces natively with the executing hardware.
3. **Path Module**: Offers utility methods for interacting with file and directory paths. Since paths can behave uniquely between Windows and POSIX systems, `path` resolves cross-platform normalization.
4. **Events Module**: Much of the Node.js core API is built around an idiomatic asynchronous event-driven architecture. Objects (emitters) emit named events that cause function objects (listeners) to be called.

## Tools Used
- Node.js (Runtime Environment)
- Console/Terminal
- Browser (for HTML verification)

## Procedure
1. Create a script named `server.js` and import `http`, `os`, `path`, and `events` directly from Node's Standard Library.
2. Instantiate a custom Class extending `EventEmitter` and bind a listener for `'serverStarted'`. 
3. Build the core logic using `http.createServer()` and create branching statements based on `req.url` matching `/`, `/about`, `/system`, and `/path`.
4. Inside the `/system` route block, invoke OS methods like `os.arch()` and format memory returns by converting them directly into Gigabytes for readability.
5. Setup a helper function `generateHTML()` to wrap responses in structured HTML text with professional CSS styling so the browser renders beautifully instead of as raw text block.
6. Initialize `server.listen` on port `3000`, internally returning an invoke callback for `serverEvents.emit()`.
7. Boot up the server via `node server.js` from the terminal. 

## Code Snippets

**Custom Event Emitter Execution:**
```javascript
const EventEmitter = require('events');
class ServerEmitter extends EventEmitter {}
const serverEvents = new ServerEmitter();

serverEvents.on('serverStarted', (port) => {
  console.log(`[Event Triggered]: Server started successfully and listening on port ${port}`);
});

// Inside server.listen(...)
serverEvents.emit('serverStarted', PORT);
```

**OS Memory Rendering:**
```javascript
const totalMemGB = (os.totalmem() / 1e9).toFixed(2);
const freeMemGB = (os.freemem() / 1e9).toFixed(2);
```

**Path Formatting Example:**
```javascript
console.log('Base Name:', path.basename(__filename));
```

## Output 

### 1. Console Output Log (Terminal):
```text
======================================================
[Event Triggered]: Server started successfully!
Server is currently running at http://localhost:3000
======================================================

--- Path Module Details (Console) ---
1. __dirname (Current Directory): C:\Users\Lenovo\Downloads\awt all assignment\ass 5
2. __filename (Current File): C:\Users\Lenovo\Downloads\awt all assignment\ass 5\server.js
3. path.basename(): server.js
4. path.extname(): .js
-------------------------------------
```

### 2. Browser Output (`/system` Endpoint):
*(When visiting localhost:3000/system nicely formatted HTML block appears containing this info)*
- 🖥️ **OS Platform**: WIN32 (or your OS)
- ⚙️ **CPU Architecture**: x64
- 💾 **Total System Memory**: 16.00 GB
- ⚡ **Available Free Memory**: 3.42 GB

## Conclusion
The assignment successfully demonstrated the powerful native tools accessible immediately inside Node.js. Through bare HTTP route handling, system hardware interfacing, path manipulations, and event-driven reactions, we established how lower-level server development functions independently without complex dependencies or structural libraries.
