// Set this multiplier to scale the UI (e.g., 1 = normal, 1.2 = 20% bigger, 0.8 = 20% smaller)
const scaleMultiplier = 1.3; // <-- EDIT THIS VALUE TO SCALE EVERYTHING

document.addEventListener('DOMContentLoaded', async () => {
  const summaryList = document.getElementById('summary-list');
  const totalScoreElem = document.getElementById('total-score');
  const percentileTextElem = document.getElementById('percentile-text');
  // const wrapper = document.querySelector('.main-wrapper'); // Removed direct style manipulation for wrapper here

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

    // IMPORTANT: All wrapper.style manipulations have been removed from here.
    // Layout and scaling are now exclusively handled by CSS.

  } catch (e) {
    summaryList.innerHTML = '<p style="color:red;">Failed to load summary data.</p>';
    if (percentileTextElem) {
      percentileTextElem.textContent = '';
    }
  }
});