const apiKey = 'VRNiLwo_7D3OtGbaHvIFVndihvudEZIt';

function lookupStock() {
  const ticker = document.getElementById('ticker').value.toUpperCase();
  const days = parseInt(document.getElementById('range').value);
  const to = new Date();
  const from = new Date(to.getTime() - days * 24 * 60 * 60 * 1000);

  const fromDate = from.toISOString().split('T')[0];
  const toDate = to.toISOString().split('T')[0];

  fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${fromDate}/${toDate}?adjusted=true&sort=asc&apiKey=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      const labels = data.results.map(entry => new Date(entry.t).toLocaleDateString());
      const prices = data.results.map(entry => entry.c);

      new Chart(document.getElementById('stockChart').getContext('2d'), {
        type: 'line',
        data: {
          labels,
          datasets: [{ label: `${ticker} Closing Prices`, data: prices }]
        }
      });
    });
}

fetch('https://tradestie.com/api/v1/apps/reddit?date=2022-04-03')
  .then(res => res.json())
  .then(data => {
    const top5 = data.slice(0, 5);
    const tbody = document.querySelector('#redditTable tbody');
    top5.forEach(stock => {
      const icon = stock.sentiment === 'Bullish' ? '📈' : '📉';
      const row = `<tr>
        <td><a href="https://finance.yahoo.com/quote/${stock.ticker}" target="_blank">${stock.ticker}</a></td>
        <td>${stock.no_of_comments}</td>
        <td>${stock.sentiment} ${icon}</td>
      </tr>`;
      tbody.innerHTML += row;
    });
  });

if (annyang) {
  annyang.addCommands({
    'lookup *ticker': ticker => {
      document.getElementById('ticker').value = ticker.toUpperCase();
      document.getElementById('range').value = '30';
      lookupStock();
    }
  });
}
