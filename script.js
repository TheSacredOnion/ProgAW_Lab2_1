(function () {
  const example = document.getElementById('example');
  const cw1 = document.getElementById('cw1');
  const postIdInput = document.getElementById('postId');
  const cw1GetButton = document.getElementById('cw1-get');
  const cw2 = document.getElementById('cw2');
  const cw3 = document.getElementById('cw3');
  const answer = document.getElementById('answer');

  example.addEventListener("click", function () {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(array => {
        console.log(array);
        answer.innerHTML = `<pre>${JSON.stringify(array, null, 2)}</pre>`;
      });
  });

  cw1.addEventListener("click", function () {
    answer.innerHTML = "Ładowanie danych...";
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(array => {
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        thead.innerHTML = `
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        `;

        array.forEach(post => {
          console.log(`Post ID = ${post.id}, Post Title = ${post.title}`);
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${post.id}</td>
            <td>${post.title}</td>
            <td>${post.body}</td>
          `;
          tbody.appendChild(tr);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        answer.innerHTML = "";
        answer.appendChild(table);
      })
      .catch(error => {
        console.error("Błąd podczas pobierania danych:", error);
        answer.textContent = "Błąd podczas pobierania danych.";
      });
  });

  cw1GetButton.addEventListener("click", function () {
    const postId = postIdInput.value;
    if (!postId) {
      alert("Proszę wpisać ID posta.");
      return;
    }
    answer.innerHTML = "Ładowanie danych...";
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Post nie znaleziony");
        }
        return response.json();
      })
      .then(post => {
        const table = document.createElement("table");
        table.innerHTML = `
          <thead>
            <tr><th>ID</th><th>Title</th><th>Body</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>${post.id}</td>
              <td>${post.title}</td>
              <td>${post.body}</td>
            </tr>
          </tbody>
        `;
        answer.innerHTML = "";
        answer.appendChild(table);
      })
      .catch(error => {
        console.error("Błąd podczas pobierania danych:", error);
        answer.innerHTML = "Błąd podczas pobierania danych.";
      });
  });

  cw2.addEventListener("click", function () {
    //TODO
  });

  cw3.addEventListener("click", async function () {
    answer.innerHTML = "Ładowanie danych...";
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
          title: 'foo',
          body: 'bar',
          userId: 1
        })
      });

      const data = await res.json();
      console.log(data);
      answer.textContent = `Dodano post o ID = ${data.id}`;
    } catch (error) {
      answer.textContent = `Błąd podczas dodawania posta. ${error}`;
    }
  });
})();
