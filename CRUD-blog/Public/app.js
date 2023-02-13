const loadArticles = (url) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
        if (xhr.status === 200) {
            const articles = JSON.parse(xhr.responseText);
            const articleList = document.getElementById('article-list');
            for (let i = 0; i < articles.length; i++) {
                const article = articles[i];
                const articleDiv = document.createElement('div');
                const title = document.createElement('h2');
                title.textContent = article.title;
                const content = document.createElement('p');
                content.textContent = article.content;
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', () => {
                    const titleInput = document.getElementById('title-input');
                    titleInput.value = article.title;
                    const contentInput = document.getElementById('content-input');
                    contentInput.value = article.content;
                    const updateButton = document.getElementById('update-button');
                    updateButton.dataset.articleId = article.id;
                });
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => {
                    deleteArticle(`/articles/${article.id}`);
                });
                articleDiv.appendChild(title);
                articleDiv.appendChild(content);
                articleDiv.appendChild(editButton);
                articleDiv.appendChild(deleteButton);
                articleList.appendChild(articleDiv);
            }
        }
    };
    xhr.send();
}

const addArticles = (url, article) => {
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(article)
    })
    .then(response => {
        if (response.ok) {
          console.log('Article added');
        } else {
          console.log('Error');
        }
    })
    .catch(error => console.error(error));
}

const articleForm = document.getElementById('article-form');
articleForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title-input').value;
    const content = document.getElementById('content-input').value;
    const articleId = document.getElementById('update-button').dataset.articleId;
    const article = {
        title: title,
        content: content
    };
    if (articleId) {
        updateArticle(`/articles/${articleId}`, article);
    } else {
        addArticles('/addArticles', article);
    }
});

const updateArticle = (url, article) => {
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(article)
    })
    .then(response => {
      if (response.ok) {
        console.log('Article updated');
      } else {
        console.log('Error');
      }
    })
    .catch(error => console.error(error));
}  

const deleteArticle = (url) => {
    fetch(url, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            console.log('Article deleted');
        } else {
            console.log('Error');
        }
    })
    .catch(error => console.error(error));
}
loadArticles('articles.json');