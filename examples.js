/**
 * Usage examples for the semantic search engine
 */

const SemanticSearchEngine = require('./semanticSearch');

/**
 * Example 1: Basic usage
 */
async function example1_basicUsage() {
  console.log('\n=== Example 1: Basic Usage ===\n');

  const engine = new SemanticSearchEngine();
  await engine.initialize();

  // Add documents
  await engine.addDocument(
    '1',
    'The quick brown fox jumps over the lazy dog'
  );
  await engine.addDocument('2', 'A fast red fox leaps over a sleepy canine');
  await engine.addDocument(
    '3',
    'JavaScript is a programming language for web browsers'
  );

  // Search
  const results = await engine.search('quick fox', 2);
  console.log('Search results for "quick fox":');
  results.forEach((r) => {
    console.log(`  [${r.id}] Score: ${r.score.toFixed(4)} - ${r.text}`);
  });
}

/**
 * Example 2: E-commerce product search
 */
async function example2_productSearch() {
  console.log('\n=== Example 2: E-Commerce Product Search ===\n');

  const engine = new SemanticSearchEngine();
  await engine.initialize();

  const products = [
    {
      id: 'p1',
      name: 'Blue Running Shoes',
      desc: 'High-performance athletic running shoes with cushioned sole',
    },
    {
      id: 'p2',
      name: 'Wireless Headphones',
      desc: 'Premium noise-canceling headphones with Bluetooth connectivity',
    },
    {
      id: 'p3',
      name: 'Winter Jacket',
      desc: 'Waterproof winter coat with thermal insulation',
    },
    {
      id: 'p4',
      name: 'Sports Socks',
      desc: 'Moisture-wicking athletic socks for running and training',
    },
  ];

  for (const product of products) {
    await engine.addDocument(product.id, `${product.name}: ${product.desc}`, {
      type: 'product',
      name: product.name,
    });
  }

  // Search with different queries
  const queries = ['athletic footwear', 'audio equipment', 'cold weather gear'];

  for (const query of queries) {
    const results = await engine.search(query, 2);
    console.log(`\nSearch: "${query}"`);
    results.forEach((r) => {
      console.log(`  - ${r.metadata.name} (Score: ${r.score.toFixed(4)})`);
    });
  }
}

/**
 * Example 3: FAQ search
 */
async function example3_faqSearch() {
  console.log('\n=== Example 3: FAQ Search ===\n');

  const engine = new SemanticSearchEngine();
  await engine.initialize();

  const faqs = [
    {
      id: 'faq1',
      q: 'How do I reset my password?',
      a: 'Click on "Forgot Password" on the login page and follow the instructions sent to your email.',
    },
    {
      id: 'faq2',
      q: 'What payment methods do you accept?',
      a: 'We accept credit cards, PayPal, and bank transfers for payments.',
    },
    {
      id: 'faq3',
      q: 'How long does shipping take?',
      a: 'Standard shipping takes 5-7 business days. Express shipping available in 2 days.',
    },
    {
      id: 'faq4',
      q: 'Can I return items?',
      a: 'Yes, we offer 30-day returns for unused items in original packaging.',
    },
  ];

  for (const faq of faqs) {
    await engine.addDocument(faq.id, `Q: ${faq.q}\nA: ${faq.a}`, {
      type: 'faq',
      question: faq.q,
    });
  }

  // User questions that might not match exactly
  const userQuestions = [
    'I forgot my password',
    'What credit cards do you take',
    'How fast can you ship',
  ];

  for (const userQ of userQuestions) {
    const results = await engine.search(userQ, 1);
    console.log(`\nUser asks: "${userQ}"`);
    if (results.length > 0) {
      const result = results[0];
      console.log(`  Match: "${result.metadata.question}"`);
      console.log(`  Confidence: ${(result.score * 100).toFixed(1)}%`);
    }
  }
}

/**
 * Example 4: Document filtering with metadata
 */
async function example4_metadataFiltering() {
  console.log('\n=== Example 4: Metadata Filtering ===\n');

  const engine = new SemanticSearchEngine();
  await engine.initialize();

  // Add documents with rich metadata
  const documents = [
    {
      id: 'news1',
      text: 'Breaking: New AI model shows promising results in medical imaging',
      category: 'technology',
      date: '2024-01-15',
    },
    {
      id: 'news2',
      text: 'Sports: Local team wins championship after thrilling match',
      category: 'sports',
      date: '2024-01-14',
    },
    {
      id: 'news3',
      text: 'Science: Artificial intelligence advancing healthcare diagnostics',
      category: 'science',
      date: '2024-01-13',
    },
  ];

  for (const doc of documents) {
    await engine.addDocument(doc.id, doc.text, {
      category: doc.category,
      date: doc.date,
    });
  }

  // Search and filter by metadata
  const allResults = await engine.search('artificial intelligence', 5);
  const techResults = allResults.filter(
    (r) => r.metadata.category === 'technology' || r.metadata.category === 'science'
  );

  console.log('Search for "artificial intelligence"');
  console.log(`Total results: ${allResults.length}`);
  console.log(`Tech/Science category: ${techResults.length}`);
  techResults.forEach((r) => {
    console.log(
      `  - [${r.metadata.category}] ${r.text.substring(0, 50)}... (Score: ${r.score.toFixed(4)})`
    );
  });
}

/**
 * Example 5: Performance comparison
 */
async function example5_performanceComparison() {
  console.log('\n=== Example 5: Performance Metrics ===\n');

  const engine = new SemanticSearchEngine();

  const startInit = Date.now();
  await engine.initialize();
  const initTime = Date.now() - startInit;
  console.log(`Model initialization: ${initTime}ms`);

  // Add multiple documents and measure
  const startAdd = Date.now();
  for (let i = 0; i < 10; i++) {
    await engine.addDocument(`doc${i}`, `Sample document number ${i} with some content`);
  }
  const addTime = Date.now() - startAdd;
  console.log(`Adding 10 documents: ${addTime}ms (avg ${(addTime / 10).toFixed(1)}ms each)`);

  // Search and measure
  const startSearch = Date.now();
  const results = await engine.search('document content', 5);
  const searchTime = Date.now() - startSearch;
  console.log(`Search query: ${searchTime}ms`);
  console.log(`Found ${results.length} results`);
}

/**
 * Run all examples
 */
async function runAllExamples() {
  try {
    await example1_basicUsage();
    await example2_productSearch();
    await example3_faqSearch();
    await example4_metadataFiltering();
    await example5_performanceComparison();
    console.log('\n✓ All examples completed!\n');
  } catch (error) {
    console.error('Error running examples:', error);
  }
}

// Run if executed directly
if (require.main === module) {
  runAllExamples();
}

module.exports = {
  example1_basicUsage,
  example2_productSearch,
  example3_faqSearch,
  example4_metadataFiltering,
  example5_performanceComparison,
};