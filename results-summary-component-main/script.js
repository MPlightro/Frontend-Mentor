document.addEventListener('DOMContentLoaded', async () => {
    const summaryList = document.getElementById('summary-list');
    const totalScoreElem = document.getElementById('total-score');
    const percentileTextElem = document.getElementById('percentile-text');

    try {
        const res = await fetch('data.json');
        const data = await res.json();

        // Calculate average score
        const total = data.reduce((sum, item) => sum + item.score, 0);
        const avg = Math.round((total - 0.5) / data.length);
        totalScoreElem.textContent = avg;

        // Calculate percentile
        const percentile = Math.round(avg * 65 / 76); // This calculation (avg * 65 / 76) is from your original script.
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
            <div class="item ${categoryClass[item.category] || ''}">
                <div class="img-category-wrapper">
                    <img class="result__icon" src="${item.icon}" alt="${item.category} icon" />
                    <p class="result__category">${item.category}</p>
                </div>
                <p class="result__score">
                    ${item.score}
                    <span> / 100 </span>
                </p>
            </div>
        `).join('');

    } catch (e) {
        summaryList.innerHTML = '<p style="color:red;">Failed to load summary data.</p>';
        if (percentileTextElem) {
            percentileTextElem.textContent = '';
        }
    }
});