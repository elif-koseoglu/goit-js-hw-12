import{S as b,i as l,a as w}from"./assets/vendor-xJi9366P.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const m=document.querySelector(".search-form"),p=document.querySelector(".loader"),u=document.querySelector(".gallery"),n=document.querySelector(".load-more"),L=m.elements.searchQuery,v="54526996-ee532c7c03c526da473d85494";let f="",c=1,y=0,d=0;const P=new b(".gallery a",{captionsData:"alt",captionDelay:250});m.addEventListener("submit",async s=>{s.preventDefault();const r=L.value.trim();if(r===""){l.warning({message:"Please enter a search term",position:"topRight"});return}f=r,c=1,d=0,u.innerHTML="",n.style.display="none",p.style.display="block",await g()});n.addEventListener("click",async()=>{c+=1,p.style.display="block",await g()});async function g(){const s={key:v,q:f,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:20,page:c};try{const o=(await w.get("https://pixabay.com/api/",{params:s})).data;if(!o.hits||o.hits.length===0){l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),n.style.display="none";return}y=o.totalHits,d+=o.hits.length;const a=S(o.hits);if(u.insertAdjacentHTML("beforeend",a),P.refresh(),c>1){const e=u.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}d>=y?(n.style.display="none",l.info({message:"We're sorry, but you've reached the end of search results.",position:"bottomCenter"})):n.style.display="block"}catch{l.error({message:"Something went wrong. Please try again later!",position:"topRight"})}finally{p.style.display="none"}}function S(s){return s.map(({webformatURL:r,largeImageURL:o,tags:a,likes:e,views:t,comments:i,downloads:h})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${o}">
            <img
              class="gallery-image"
              src="${r}"
              alt="${a}"
              loading="lazy"
            />
          </a>

          <div class="image-info">
            <p class="info-item"><b>Likes</b> ${e}</p>
            <p class="info-item"><b>Views</b> ${t}</p>
            <p class="info-item"><b>Comments</b> ${i}</p>
            <p class="info-item"><b>Downloads</b> ${h}</p>
          </div>
        </li>
      `).join("")}
//# sourceMappingURL=index.js.map
