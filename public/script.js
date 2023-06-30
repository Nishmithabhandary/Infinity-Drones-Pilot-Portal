fetch('/data')
  .then(response => response.json())
  .then(data => {
    const labels = data.map(item => item.label);
    const values = data.map(item => item.value);

    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Bar Chart',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'SUCCESFUL FLIGHT DETAILS',
              font: {
                weight: 'bold',
                size:30
              }
            },
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'PILOT EMAIL ID',
                font: {
                    weight: 'bold',
                    size: 18
                  }
              }
            },
            y: {
              title: {
                display: true,
                text: 'SUCCESSFUL FLIGHTS',
                font: {
                    weight: 'bold',
                    size: 18
                  }
              },
              beginAtZero: true
            }
          }
        }
      });
      
      
      
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });