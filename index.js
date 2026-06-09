/**
 * Main entry point for semantic search engine
 * Provides API and CLI interface
 */

const SemanticSearchEngine = require('./semanticSearch');
const express = require('express');

const app = express();
const searchEngine = new SemanticSearchEngine();

// Middleware
app.use(express.json());

/**
 * Initialize the search engine and start server
 */
async function start() {
  try {
    await searchEngine.initialize();

    // Sample documents to index
    const sampleDocs = [
      {
        id: 'doc1',
        text: 'JavaScript is a versatile programming language used for web development.',
        category: 'programming',
      },
      {
        id: 'doc2',
        text: 'Machine learning enables computers to learn from data without explicit programming.',
        category: 'ai',
      },
      {
        id: 'doc3',
        text: 'Web development involves creating and maintaining websites using HTML, CSS, and JavaScript.',
        category: 'web',
      },
      {
        id: 'doc4',
        text: 'Natural language processing allows computers to understand and generate human language.',
        category: 'nlp',
      },
      {
        id: 'doc5',
        text: 'Cloud computing provides on-demand access to computing resources over the internet.',
        category: 'infrastructure',
      },
      {
        id: 'doc6',
        text: 'Semantic search uses meaning and context to find relevant information.',
        category: 'search',
      },
    ];

    // Add sample documents to index
    console.log('\nIndexing sample documents...');
    for (const doc of sampleDocs) {
      await searchEngine.addDocument(doc.id, doc.text, {
        category: doc.category,
      });
    }

    // REST API Endpoints
    /**
     * GET /api/stats
     * Returns search engine statistics
     */
    app.get('/api/stats', (req, res) => {
      res.json(searchEngine.getStats());
    });

    /**
     * POST /api/search
     * Performs semantic search
     * Body: { query: string, topK?: number }
     */
    app.post('/api/search', async (req, res) => {
      try {
        const { query, topK = 5 } = req.body;

        if (!query) {
          return res.status(400).json({ error: 'Query is required' });
        }

        const results = await searchEngine.search(query, topK);
        res.json({
          query,
          resultCount: results.length,
          results,
        });
      } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: error.message });
      }
    });

    /**
     * POST /api/documents
     * Add a new document to index
     * Body: { id: string, text: string, metadata?: object }
     */
    app.post('/api/documents', async (req, res) => {
      try {
        const { id, text, metadata } = req.body;

        if (!id || !text) {
          return res.status(400).json({ error: 'ID and text are required' });
        }

        await searchEngine.addDocument(id, text, metadata);
        res.json({ success: true, id });
      } catch (error) {
        console.error('Add document error:', error);
        res.status(500).json({ error: error.message });
      }
    });

    /**
     * GET /api/documents
     * Get all indexed documents
     */
    app.get('/api/documents', (req, res) => {
      const docs = searchEngine.getAllDocuments();
      res.json({
        count: docs.length,
        documents: docs,
      });
    });

    /**
     * DELETE /api/documents
     * Clear all documents
     */
    app.delete('/api/documents', (req, res) => {
      searchEngine.clear();
      res.json({ success: true, message: 'All documents cleared' });
    });

    // Health check
    app.get('/api/health', (req, res) => {
      res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`\n✓ Server running on http://localhost:${PORT}`);
      console.log('\nAvailable endpoints:');
      console.log('  GET  /api/health - Health check');
      console.log('  GET  /api/stats - Engine statistics');
      console.log('  POST /api/search - Search documents');
      console.log('  GET  /api/documents - List all documents');
      console.log('  POST /api/documents - Add new document');
      console.log('  DELETE /api/documents - Clear all documents');
    });
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Start the application
start();

module.exports = app;