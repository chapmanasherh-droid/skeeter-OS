/**
 * Semantic Search Engine using Transformers.js
 * Provides AI-powered semantic similarity search
 */

const { pipeline, env } = require('@xenova/transformers');

// Allow local files
env.allowLocalModels = true;

class SemanticSearchEngine {
  constructor() {
    this.documents = [];
    this.embeddings = [];
    this.extractor = null;
    this.initialized = false;
  }

  /**
   * Initialize the embedding model
   */
  async initialize() {
    if (this.initialized) return;
    
    try {
      console.log('Initializing semantic search engine...');
      // Using a lightweight model for embeddings
      this.extractor = await pipeline(
        'feature-extraction',
        'Xenova/all-MiniLM-L6-v2'
      );
      this.initialized = true;
      console.log('✓ Semantic search engine initialized');
    } catch (error) {
      console.error('Failed to initialize:', error);
      throw error;
    }
  }

  /**
   * Generate embeddings for text
   * @param {string} text - Text to embed
   * @returns {Promise<Array>} - Embedding vector
   */
  async generateEmbedding(text) {
    if (!this.initialized) await this.initialize();
    
    const result = await this.extractor(text, {
      pooling: 'mean',
      normalize: true,
    });
    
    return Array.from(result.data);
  }

  /**
   * Add document to search index
   * @param {string} id - Document ID
   * @param {string} text - Document text
   * @param {object} metadata - Additional metadata (optional)
   */
  async addDocument(id, text, metadata = {}) {
    const embedding = await this.generateEmbedding(text);
    
    this.documents.push({
      id,
      text,
      metadata,
      embedding,
    });
    
    console.log(`Added document: ${id}`);
  }

  /**
   * Calculate cosine similarity between two vectors
   * @param {Array} vecA - First vector
   * @param {Array} vecB - Second vector
   * @returns {number} - Cosine similarity score (0-1)
   */
  cosineSimilarity(vecA, vecB) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }

    const denominator = Math.sqrt(normA) * Math.sqrt(normB);
    return denominator === 0 ? 0 : dotProduct / denominator;
  }

  /**
   * Search for similar documents
   * @param {string} query - Search query
   * @param {number} topK - Number of top results to return
   * @returns {Promise<Array>} - Array of matching documents with scores
   */
  async search(query, topK = 5) {
    if (this.documents.length === 0) {
      console.warn('No documents in index');
      return [];
    }

    const queryEmbedding = await this.generateEmbedding(query);

    // Calculate similarity scores
    const results = this.documents.map((doc) => ({
      id: doc.id,
      text: doc.text,
      metadata: doc.metadata,
      score: this.cosineSimilarity(queryEmbedding, doc.embedding),
    }));

    // Sort by score descending
    results.sort((a, b) => b.score - a.score);

    // Return top K results
    return results.slice(0, topK);
  }

  /**
   * Get all documents
   * @returns {Array} - All indexed documents
   */
  getAllDocuments() {
    return this.documents.map((doc) => ({
      id: doc.id,
      text: doc.text,
      metadata: doc.metadata,
    }));
  }

  /**
   * Clear all documents
   */
  clear() {
    this.documents = [];
    this.embeddings = [];
    console.log('Search index cleared');
  }

  /**
   * Get index statistics
   * @returns {object} - Statistics about the index
   */
  getStats() {
    return {
      documentCount: this.documents.length,
      initialized: this.initialized,
      modelName: 'Xenova/all-MiniLM-L6-v2',
    };
  }
}

module.exports = SemanticSearchEngine;