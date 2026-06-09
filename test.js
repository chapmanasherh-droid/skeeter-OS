/**
 * Test file for semantic search engine
 * Demonstrates usage and validates functionality
 */

const SemanticSearchEngine = require('./semanticSearch');

async function runTests() {
  try {
    console.log('=== Semantic Search Engine Tests ===\n');

    // Initialize engine
    const engine = new SemanticSearchEngine();
    await engine.initialize();

    // Test 1: Add documents
    console.log('Test 1: Adding documents...');
    await engine.addDocument(
      'apple',
      'Apple is a technology company known for iPhones and computers'
    );
    await engine.addDocument(
      'fruit',
      'An apple is a delicious red or green fruit that grows on trees'
    );
    await engine.addDocument(
      'programming',
      'Python and JavaScript are popular programming languages for developers'
    );
    await engine.addDocument(
      'cooking',
      'Apples can be used in recipes for pies, sauces, and salads'
    );
    await engine.addDocument(
      'nutrition',
      'Apples are rich in fiber and vitamins, good for health'
    );
    console.log('✓ Added 5 documents\n');

    // Test 2: Basic search
    console.log('Test 2: Semantic search for "apple"');
    let results = await engine.search('apple', 5);
    console.log(`Found ${results.length} results:`);
    results.forEach((r, i) => {
      console.log(`  ${i + 1}. [${r.id}] Score: ${r.score.toFixed(4)}`);
      console.log(`     "${r.text.substring(0, 60)}..."`);
    });
    console.log();

    // Test 3: Semantic similarity
    console.log('Test 3: Search for "technology company"');
    results = await engine.search('technology company', 3);
    console.log(`Found ${results.length} results:`);
    results.forEach((r, i) => {
      console.log(`  ${i + 1}. [${r.id}] Score: ${r.score.toFixed(4)}`);
      console.log(`     "${r.text.substring(0, 60)}..."`);
    });
    console.log();

    // Test 4: Different context
    console.log('Test 4: Search for "food" (different context)');
    results = await engine.search('food', 3);
    console.log(`Found ${results.length} results:`);
    results.forEach((r, i) => {
      console.log(`  ${i + 1}. [${r.id}] Score: ${r.score.toFixed(4)}`);
      console.log(`     "${r.text.substring(0, 60)}..."`);
    });
    console.log();

    // Test 5: Programming context
    console.log('Test 5: Search for "coding languages"');
    results = await engine.search('coding languages', 3);
    console.log(`Found ${results.length} results:`);
    results.forEach((r, i) => {
      console.log(`  ${i + 1}. [${r.id}] Score: ${r.score.toFixed(4)}`);
      console.log(`     "${r.text.substring(0, 60)}..."`);
    });
    console.log();

    // Test 6: Stats
    console.log('Test 6: Engine Statistics');
    const stats = engine.getStats();
    console.log(`  Documents indexed: ${stats.documentCount}`);
    console.log(`  Initialized: ${stats.initialized}`);
    console.log(`  Model: ${stats.modelName}`);
    console.log();

    console.log('✓ All tests completed successfully!\n');
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
}

// Run tests
runTests();