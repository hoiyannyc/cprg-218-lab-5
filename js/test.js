// Function to handle click event of the submit button
document.getElementById('submit-button').addEventListener('click', function () {
    let selectedUrl = document.getElementById('dropdown').value;
  
    let resultsContainer = document.getElementById('option-1-results');
    resultsContainer.innerHTML = '';
  
    let selectedArticle = getSelectedArticle(selectedUrl);
  
    // Create a card for the selected article
    let card = document.createElement('li');
    card.classList.add('card');
    card.innerHTML = `
      <h3>${selectedArticle.title}</h3>
      <img src="${selectedArticle.urlToImage}" alt="${selectedArticle.title}">
      <p><a href="${selectedUrl}" target="_blank">Read more</a></p>
    `;
  
    resultsContainer.appendChild(card);
  });
  
  // Function to get the selected article from the fetched data
  function getSelectedArticle(selectedUrl) {
    const articles = JSON.parse(localStorage.getItem('articles'));
    return articles.find(article => article.url === selectedUrl);
  }
  
  // Function to fetch top headlines based on search term and populate the dropdown
  async function getTopHeadlines() {
    const apiKey = '47e08884e7a64d05bf63f9de1d5fb3f8';
    const baseUrl = 'https://newsapi.org/v2/';
    const endpoint = 'top-headlines';
    const searchTerm = 'trump';
  
    const url = `${baseUrl}${endpoint}?q=${searchTerm}&apiKey=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const articles = data.articles;

        localStorage.setItem('articles', JSON.stringify(articles));
  
        let dropdown = document.getElementById('dropdown');
        for (let article of articles) {
          let option = document.createElement("option");
          option.value = article.url;
          option.text = article.title;
          dropdown.appendChild(option);
        }

        document.getElementById('submit-button').disabled = false;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  
  getTopHeadlines();