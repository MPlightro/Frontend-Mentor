document.addEventListener('DOMContentLoaded', async () => {
  const summaryList = document.getElementById('summary-list');
  const totalScoreElem = document.getElementById('total-score');
  const percentileTextElem = document.getElementById('percentile-text');

  try {
    const res = await fetch('data.json');
    const data = await res.json();

    // Calculate average score
    const total = data.reduce((sum, item) => sum + item.score, 0);
    const avg = Math.round(total / data.length);
    totalScoreElem.textContent = avg;

    // Calculate percentile so that 76 => 65%
    const percentile = Math.round(avg * 65 / 76);
    if (percentileTextElem) {
      percentileTextElem.textContent = `You scored higher than ${percentile}% of the people who have taken these tests.`;
    }

    // Helper for class names
    const categoryClass = {
      Reaction: 'reaction',
      Memory: 'memory',
      Verbal: 'verbal',
      Visual: 'visual'
    };

    // Populate summary items
    summaryList.innerHTML = data.map(item => `
      <div class="summary-item ${categoryClass[item.category] || ''}">
        <span class="label">
          <img src="${item.icon}" alt="${item.category} icon" />
          ${item.category}
        </span>
        <span>
          <span class="score">${item.score}</span>
          <span class="total">/ 100</span>
        </span>
      </div>
    `).join('');
  } catch (e) {
    summaryList.innerHTML = '<p style="color:red;">Failed to load summary data.</p>';
    if (percentileTextElem) {
      percentileTextElem.textContent = '';
    }
  }
});
