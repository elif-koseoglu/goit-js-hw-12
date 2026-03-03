import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import axios from "axios";

const form = document.querySelector(".search-form");
const loader = document.querySelector(".loader");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");

const input = form.elements.searchQuery;
const PIXABAY_API_KEY = "54526996-ee532c7c03c526da473d85494";

// Global değişkenler
let currentQuery = "";
let currentPage = 1;
let totalHits = 0;
let loadedCount = 0;

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const query = input.value.trim();

  if (query === "") {
    iziToast.warning({
      message: "Please enter a search term",
      position: "topRight",
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  loadedCount = 0;

  gallery.innerHTML = "";
  loadMoreBtn.style.display = "none";
  loader.style.display = "block";

  await fetchImages();
});

loadMoreBtn.addEventListener("click", async () => {
  currentPage += 1;
  loader.style.display = "block";

  await fetchImages();
});

async function fetchImages() {
  const params = {
    key: PIXABAY_API_KEY,
    q: currentQuery,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    per_page: 20,
    page: currentPage,
  };

  try {
    const response = await axios.get("https://pixabay.com/api/", { params });
    const data = response.data;

    if (!data.hits || data.hits.length === 0) {
      iziToast.error({
        message:
          "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight",
      });
      loadMoreBtn.style.display = "none";
      return;
    }

    totalHits = data.totalHits;
    loadedCount += data.hits.length;

    const markup = createGalleryMarkup(data.hits);
    gallery.insertAdjacentHTML("beforeend", markup);

    lightbox.refresh();

     if (currentPage > 1) {
      const cardHeight = gallery.querySelector(".gallery-item").getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
      });
    }


    if (loadedCount >= totalHits) {
      loadMoreBtn.style.display = "none";
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: "bottomCenter",
      });
    } else {
      loadMoreBtn.style.display = "block";
    }
  } catch {
    iziToast.error({
      message: "Something went wrong. Please try again later!",
      position: "topRight",
    });
  } finally {
    loader.style.display = "none";
  }
}

function createGalleryMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img
              class="gallery-image"
              src="${webformatURL}"
              alt="${tags}"
              loading="lazy"
            />
          </a>

          <div class="image-info">
            <p class="info-item"><b>Likes</b> ${likes}</p>
            <p class="info-item"><b>Views</b> ${views}</p>
            <p class="info-item"><b>Comments</b> ${comments}</p>
            <p class="info-item"><b>Downloads</b> ${downloads}</p>
          </div>
        </li>
      `
    )
    .join("");
}