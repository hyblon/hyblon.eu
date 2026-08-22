document.addEventListener("DOMContentLoaded", function() {
  const targetUrl = window.fef || window.location.href.split('?')[0];
  const apiEndpoint = `https://webmention.io/api/mentions.jf2?target=${encodeURIComponent(targetUrl)}`;

  fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("webmention-container");
      if (!data.children || data.children.length === 0) {
        container.innerHTML = "<p>Nessuna webmention per ora.</p>";
        return;
      }

      let html = '<ul class="webmention-list">';
      data.children.forEach(mention => {
        const author = mention.author ? mention.author.name : "Anonimo";
        const authorUrl = mention.author && mention.author.url ? mention.author.url : "#";
        const authorPhoto = mention.author && mention.author.photo ? mention.author.photo : "";
        const text = mention.content && mention.content.text ? mention.content.text : "";
        const type = mention["wm-property"];
        const sourceUrl = mention.url || "#";
        let label = "ha menzionato questo articolo";
        if (type === "in-reply-to") label = "ha risposto:";
        if (type === "like-of") label = "ha messo un mi piace a questo articolo.";
        if (type === "repost-of") label = "ha condiviso questo articolo.";

        html += `<li class="webmention-item ${type}">`;
        if (authorPhoto) {
          html += `<img src="${authorPhoto}" alt="" width="24" height="24" style="border-radius:50%; margin-right:8px;">`;
        }
        html += `<a href="${authorUrl}" target="_blank" rel="nofollow">${author}`;

        if (sourceUrl && sourceUrl !== "#") {
          html += ` <a href="${sourceUrl}" target="_blank" rel="nofollow" style="font-size: 0.85em;">(vai alla risposta)</a>`;
        }

        html += `</a> ${label}` ;
        if (text) {
          html += `<blockquote><p>${text}</p></blockquote>`;
        }
        html += `</li>`;
      });

      html += '</ul>';
      container.innerHTML = html;
    })
    .catch(error => {
      console.error("Errore nel caricamento delle webmentions:", error);
      document.getElementById("webmention-container").innerHTML = "<p>Impossibile caricare le webmentions.</p>";
    });
});

