# Skeeter-OS

An AI-powered semantic search engine for general text built with JavaScript. Uses transformer models to understand meaning and context, enabling intelligent similarity-based search.

## Features

✨ **Semantic Understanding** - Uses AI embeddings to understand text meaning, not just keywords
- 🔍 **Intelligent Search** - Find relevant results even with different terminology
- 🚀 **Easy to Use** - Simple API for indexing and searching documents
- 🌐 **REST API** - Built-in Express server for easy integration
- 📊 **High Performance** - Lightweight transformer model for fast embeddings
- 💾 **Flexible** - Add custom metadata to documents

## Installation

```bash
git clone https://github.com/chapmanasherh-droid/skeeter-OS.git
cd skeeter-OS
npm install
```

## Quick Start

### 1. Run the Server

```bash
npm start
```

The server will start on `http://localhost:3000` and automatically index sample documents.

### 2. Perform a Search

```bash
curl -X POST http://localhost:3000/api/search \
  -H "Content-Type: application/json" \
  -d '{"query": "machine learning", "topK": 5}'
```

### 3. Run Tests

```bash
npm test
```

### 4. See Examples

```bash
npm run examples
```

## API Reference

### Health Check
```
GET /api/health
```
Returns server status.

### Search
```
POST /api/search
Content-Type: application/json

{
  "query": "search term",
  "topK": 5
}
```
Returns top matching documents with relevance scores.

### Add Document
```
POST /api/documents
Content-Type: application/json

{
  "id": "unique-id",
  "text": "Document content",
  "metadata": { "category": "tech" }
}
```

### List Documents
```
GET /api/documents
```

### Clear All Documents
```
DELETE /api/documents
```

### Statistics
```
GET /api/stats
```

## Usage Example

```javascript
const SemanticSearchEngine = require('./semanticSearch');

async function example() {
  const engine = new SemanticSearchEngine();
  await engine.initialize();

  // Add documents
  await engine.addDocument(
    'doc1',
    'Python is great for machine learning and data science'
  );
  await engine.addDocument(
    'doc2',
    'JavaScript enables interactive web applications'
  );

  // Search
  const results = await engine.search('AI programming', 5);
  console.log(results);
}

example();
```

## How It Works

1. **Embedding Generation**: Text is converted to high-dimensional vectors using a pre-trained transformer model
2. **Similarity Calculation**: Cosine similarity measures how "close" documents are in meaning
3. **Ranking**: Results are ranked by similarity score (higher = more relevant)
4. **Context Understanding**: The model understands semantic meaning, not just keyword matching

## Model Information

- **Model**: Xenova/all-MiniLM-L6-v2
- **Size**: Lightweight and fast
- **Embeddings**: 384-dimensional vectors
- **Performance**: Processes embeddings locally without external API calls

## Requirements

- Node.js 16+
- npm or yarn
- Internet connection for initial model download (~100MB)

## Performance

- Model initialization: ~5-10 seconds (one-time)
- Document embedding: ~50-200ms per document
- Search query: ~50-200ms per query
- Memory efficient: Runs entirely locally

## License

MIT

## Contributing

Contributions welcome! Feel free to submit issues and pull requests.

---

Built with ❤️ using Transformers.js and Express