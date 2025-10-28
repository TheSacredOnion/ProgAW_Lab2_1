(function () {
  const example = document.getElementById('example')
  const cw1 = document.getElementById('cw1')
  const postIdInput = document.getElementById('postId');
  const cw1GetButton = document.getElementById('cw1-get');
  const cw2 = document.getElementById('cw2')
  const cw3 = document.getElementById('cw3')
  const answer = document.getElementById('answer')

  example.addEventListener("click", function () {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(array => {
        console.log(array)
        answer.innerHTML = JSON.stringify(array);
      })
  })

  cw1.addEventListener("click", function () {
  answer.innerHTML = "Ładowanie danych...";
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(array => {
      answer.innerHTML = "";
      const ul = document.createElement("ul");
      array.forEach(post => {
        const li = document.createElement("li");
        li.innerHTML = `Id = ${post.id} <br> Title = ${post.title} <br> Body = ${post.body}`;
        ul.appendChild(li);
      });
      answer.appendChild(ul);
    })
    .catch(error => {
      console.error("Błąd podczas pobierania danych:", error);
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
        answer.innerHTML = `Id = ${post.id} <br> Title = ${post.title} <br> Body = ${post.body}`;
      })
      .catch(error => {
        console.error("Błąd podczas pobierania danych:", error);
        answer.innerHTML = "Błąd podczas pobierania danych.";
      });
  });

  cw2.addEventListener("click", function () {
    //TODO
  })

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
  })

})();