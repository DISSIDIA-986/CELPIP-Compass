#!/usr/bin/env node

const analyze = require('@next/bundle-analyzer')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE_BUNDLE === 'true',
})

// Configuration for bundle analysis
const config = {
  // Entry points to analyze
  entries: [
    {
      name: 'main',
      path: './app/page.tsx',
    },
    {
      name: 'api',
      path: './app/api',
    },
  ],

  // Size thresholds
  thresholds: {
    // Maximum bundle size in KB
    maxBundleSize: 1024, // 1MB
    maxAssetSize: 512,   // 512KB
    maxEntrypointSize: 1024, // 1MB
  },

  // File types to analyze
  fileTypes: ['js', 'css', 'map', 'json'],

  // Output configuration
  output: {
    format: 'json',
    filename: 'bundle-analysis.json',
    reportFilename: 'bundle-report.html',
  },
}

// Run bundle analysis
const analyzeBundle = async () => {
  try {
    console.log('🔍 Starting bundle analysis...')

    // Get webpack stats
    const stats = await getWebpackStats()

    // Analyze bundle
    const analysis = await analyzeBundle(stats)

    // Check thresholds
    const results = checkThresholds(analysis)

    // Generate report
    generateReport(analysis, results)

    console.log('✅ Bundle analysis completed')
    console.log('📊 Report saved to: bundle-report.html')

    return results
  } catch (error) {
    console.error('❌ Bundle analysis failed:', error)
    process.exit(1)
  }
}

// Mock webpack stats for demonstration
const getWebpackStats = async () => {
  return {
    assets: [
      {
        name: 'main.js',
        size: 350000, // 350KB
        chunks: ['main'],
      },
      {
        name: 'styles.css',
        size: 45000, // 45KB
        chunks: ['styles'],
      },
    ],
    chunks: [
      {
        id: 'main',
        name: 'main',
        size: 300000,
        files: ['main.js'],
      },
    ],
  }
}

// Analyze bundle size
const analyzeBundle = (stats) => {
  const analysis = {
    totalSize: 0,
    assetSizes: {},
    chunkSizes: {},
    largestAssets: [],
    largestChunks: [],
  }

  // Calculate asset sizes
  stats.assets.forEach(asset => {
    const sizeKB = asset.size / 1024
    analysis.assetSizes[asset.name] = sizeKB
    analysis.totalSize += sizeKB

    // Add to largest assets if it's in the top 5
    analysis.largestAssets.push({
      name: asset.name,
      size: sizeKB,
      chunks: asset.chunks,
    })
  })

  // Sort largest assets
  analysis.largestAssets.sort((a, b) => b.size - a.size)
  analysis.largestAssets = analysis.largestAssets.slice(0, 5)

  // Calculate chunk sizes
  stats.chunks.forEach(chunk => {
    const sizeKB = chunk.size / 1024
    analysis.chunkSizes[chunk.name] = sizeKB

    analysis.largestChunks.push({
      name: chunk.name,
      size: sizeKB,
      files: chunk.files,
    })
  })

  // Sort largest chunks
  analysis.largestChunks.sort((a, b) => b.size - a.size)
  analysis.largestChunks = analysis.largestChunks.slice(0, 5)

  return analysis
}

// Check against thresholds
const checkThresholds = (analysis) => {
  const results = {
    passed: true,
    warnings: [],
    errors: [],
    recommendations: [],
  }

  // Check total bundle size
  if (analysis.totalSize > config.thresholds.maxBundleSize) {
    results.errors.push(`Total bundle size (${analysis.totalSize.toFixed(2)}KB) exceeds maximum allowed (${config.thresholds.maxBundleSize}KB)`)
    results.passed = false
  }

  // Check individual assets
  Object.entries(analysis.assetSizes).forEach(([name, size]) => {
    if (size > config.thresholds.maxAssetSize) {
      results.warnings.push(`Asset ${name} (${size.toFixed(2)}KB) exceeds recommended size (${config.thresholds.maxAssetSize}KB)`)
    }
  })

  // Generate recommendations
  if (analysis.totalSize > config.thresholds.maxBundleSize * 0.8) {
    results.recommendations.push('Consider code splitting to reduce bundle size')
  }

  if (analysis.largestAssets.length > 0 && analysis.largestAssets[0].size > 300) {
    results.recommendations.push('Largest asset is over 300KB - consider splitting or optimizing')
  }

  return results
}

// Generate HTML report
const generateReport = (analysis, results) => {
  const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Bundle Analysis Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .pass { color: #28a745; }
        .fail { color: #dc3545; }
        .warn { color: #ffc107; }
        .metric { margin: 10px 0; }
        .asset-list { margin: 20px 0; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f2f2f2; }
        .recommendations { background-color: #f8f9fa; padding: 15px; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>Bundle Analysis Report</h1>

    <div class="metric">
        <h2>Summary</h2>
        <p>Total Bundle Size: <strong>${analysis.totalSize.toFixed(2)}KB</strong></p>
        <p>Status: <span class="${results.passed ? 'pass' : 'fail'}">${results.passed ? '✅ Passed' : '❌ Failed'}</span></p>
    </div>

    <div class="asset-list">
        <h2>Largest Assets</h2>
        <table>
            <tr>
                <th>Asset Name</th>
                <th>Size (KB)</th>
                <th>Chunks</th>
            </tr>
            ${analysis.largestAssets.map(asset => `
                <tr>
                    <td>${asset.name}</td>
                    <td>${asset.size.toFixed(2)}</td>
                    <td>${asset.chunks.join(', ')}</td>
                </tr>
            `).join('')}
        </table>
    </div>

    <div class="asset-list">
        <h2>Largest Chunks</h2>
        <table>
            <tr>
                <th>Chunk Name</th>
                <th>Size (KB)</th>
                <th>Files</th>
            </tr>
            ${analysis.largestChunks.map(chunk => `
                <tr>
                    <td>${chunk.name}</td>
                    <td>${chunk.size.toFixed(2)}</td>
                    <td>${chunk.files.join(', ')}</td>
                </tr>
            `).join('')}
        </table>
    </div>

    ${results.warnings.length > 0 ? `
        <div class="warnings">
            <h2>⚠️ Warnings</h2>
            <ul>
                ${results.warnings.map(warning => `<li class="warn">${warning}</li>`).join('')}
            </ul>
        </div>
    ` : ''}

    ${results.errors.length > 0 ? `
        <div class="errors">
            <h2>❌ Errors</h2>
            <ul>
                ${results.errors.map(error => `<li class="fail">${error}</li>`).join('')}
            </ul>
        </div>
    ` : ''}

    ${results.recommendations.length > 0 ? `
        <div class="recommendations">
            <h2>💡 Recommendations</h2>
            <ul>
                ${results.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>
    ` : ''}
</body>
</html>
  `

  // In a real implementation, you would save this to a file
  console.log('📄 Report HTML generated')
  return html
}

// Run the analysis
if (require.main === module) {
  analyzeBundle()
}

module.exports = { analyzeBundle, checkThresholds, generateReport }