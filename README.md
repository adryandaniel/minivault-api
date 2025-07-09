# MiniVault API

A lightweight local REST API that simulates a core feature of ModelVault’s product: receiving a prompt and returning a generated response.

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Setup](#setup)
* [Usage](#usage)

  * [Endpoint](#endpoint)
  * [Example (cURL)](#example-curl)
  * [Example (PowerShell)](#example-powershell)
* [Logging](#logging)
* [Notes & Trade-offs](#notes--trade-offs)
* [Bonus Features](#bonus-features)
* [Contributing](#contributing)
* [License](#license)

## Features

* **POST /generate**: Accepts a JSON prompt and returns a stubbed response.
* File-based logging of all input/output interactions.
* Clear, minimal code structure using Express and Morgan.

## Tech Stack

* **Node.js** (v18+)
* **Express** (v4.18.2)
* **Morgan** (v1.10.0)
* **GitHub Actions** for CI

## Project Structure

```bash
minivault-api/
├── app.js           # Main API implementation
├── package.json     # Project metadata & dependencies
├── logs/
│   └── log.json     # Stores prompt-response logs
├── .gitignore       # Excludes node_modules & logs
├── README.md        # Project documentation
└── .github/
    └── workflows/
        └── ci.yml  # GitHub Actions CI config
```

## Setup

1. **Clone the repo:**

   ```bash
   git clone https://github.com/<your-username>/minivault-api.git
   cd minivault-api
   ```
2. **Install dependencies:**

   ```bash
   npm install
   ```
3. **Start the server:**

   ```bash
   npm start
   ```

   The API will run at `http://localhost:3000`.

## Usage

### Endpoint

**POST** `/generate`

* **Request Body:**

  ```json
  {
    "prompt": "Your prompt here"
  }
  ```
* **Response:**

  ```json
  {
    "response": "🏷️ Echo: Your prompt here"
  }
  ```

### Example (cURL)

```bash
curl -X POST http://localhost:3000/generate \
     -H "Content-Type: application/json" \
     -d '{"prompt":"Hello, MiniVault!"}'
```

### Example (PowerShell)

```powershell
Invoke-RestMethod \
  -Uri http://localhost:3000/generate \
  -Method POST \
  -ContentType 'application/json' \
  -Body '{"prompt":"Hello, MiniVault!"}'
```

## Logging

All interactions are appended to `logs/log.json` in the following format:

```json
[
  {
    "timestamp": "2025-07-09T14:22:33.123Z",
    "prompt": "Hello, MiniVault!",
    "response": "🏷️ Echo: Hello, MiniVault!"
  }
]
```

## Notes & Trade-offs

* **Stubbed Response:** The response is hardcoded for speed and reliability; swapping in a local LLM (e.g., Hugging Face or Ollama) is straightforward in `app.js`.
* **File-based Logging:** Suitable for this exercise; in production, consider a database or log rotation mechanism.
* **Error Handling:** Basic validation on `prompt`; further enhancements could include schema validation and improved error messages.

## Bonus Features

* **Streaming Output:** Use Server-Sent Events (SSE) to stream tokens.
* **Local LLM Integration:** Connect to a model via `@huggingface/transformers` or Ollama.
* **Postman Collection:** Provide a ready-made collection for easy testing.
* **Tests:** Add unit/integration tests and include `npm test` in CI.

## Contributing

1. Fork the repo.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m "feat: add your feature"`.
4. Push to branch: `git push origin feature/your-feature`.
5. Open a Pull Request.

## License

MIT © \ Adryan Daniel