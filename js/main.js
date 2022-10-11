const API = "http://localhost:8000/posts";
let currentPage = 1;
readPosts();

let addPost_main = document.getElementById("add_post");
let sectionModalMain = document.getElementsByClassName("modal-wind-main")[0];
let btnClose_modal = document.getElementById("close");

let inpModalImg = document.getElementById("inp-modal-img");
let btnAdd = document.getElementById("add_post_1");
let contentMain = document.getElementsByClassName("content-main")[0];

let sectionCont = document.getElementsByClassName("section-content")[0];
let divLeft = document.getElementsByClassName("left")[0];

// let btnClose_modal_2 = document.getElementById("close-2");
let btnSave = document.getElementById("add_post_1-2");

// для пагинации
let prevBtn = document.getElementById("prev-btn");
let nextBtn = document.getElementById("next-btn");

// кнопка для добавления нового поста
addPost_main.addEventListener("click", () => {
  sectionModalMain.style.display = "flex";
});

btnClose_modal.addEventListener("click", () => {
  sectionModalMain.style.display = "none";
});

// ! =========== Create Start ===========
// проверка API
// fetch(API)
//   .then(res => res.json())
//   .then(data => {
//     console.log(data);
//   });

function createPosts(obj) {
  fetch(API, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(obj),
  }).then(() => readPosts());
}
// btn "поделиться" из модального окана

btnAdd.addEventListener("click", () => {
  // проверка на заполненность полей
  if (!inpModalImg.value.trim() || !inpModalText.value.trim()) {
    alert("Заполните поле");
    return;
  }
  let obj = {
    description: inpModalText.value,
    URL_img: inpModalImg.value,
  };
  createPosts(obj);

  inpModalImg.value = "";
  inpModalText.value = "";
  sectionModalMain.style.display = "none";
});
// ? =========== Create End =============

// ! ============ Read Start ============
function readPosts() {
  fetch(`${API}?q=&_page=${currentPage}&_limit=3`)
    .then(res => res.json())
    .then(data => {
      divLeft.innerHTML = "";
      data.forEach(posts => {
        divLeft.innerHTML += `
        <div class="content-main">
            <div class="content-nav">
            <img src="" alt="avatar" />
            <p>текст из инпута пользователя</p>
            </div>
            <div class="content-profile">
            <div class="content-image">
            <img
            width="350px"
            src=${posts.URL_img}
                  alt="из инпута img"
                />
              </div>
            </div>
            <div class="container-like-comment">
              <div class="like-comment-icons">
              <img src="./media/like-1.png"
              alt="like"
              width="18px" />
              <img
              src="./media/photo_2022-10-11_14-45-41.jpg"
              alt="comment"
              width="18px"
              />
              <img src="./media/message.png" alt="messg" width="15px" />
              </div>
              <div>
              <img
              id="other"
              src="./media/photo_2022-10-11_14-45-19.jpg"
              alt="other"
              width="20px"
              onclick="btnOther(${posts.id})"
              />
              </div>
              </div>
              <div class="content-description">
              <h4>название аккаунта</h4>
              
              <p class="content-description-text">${posts.description}</p>
              </div>
              <div class="content-comments">
              <p class="comments">текст из инпута комент</p>
              </div>
          </div>
          <!--! modal wind  2   start  -->
          <section class="modal-wind-main-2">
          <div class="modal-wind-2">
          <div class="modal-wind-nav-2">
          <button onclick="modalClose()" id="close-2">Отмена</button>
          <h3>Редактировать публикацию</h3>
          <button onclick="save()" id="add_post_1-2">Готово</button>
          </div>
          <div class="modal-img-2">
          <input id="inp-modal-img-2" type="url" placeholder="URL of image" />
          <div class="modal-description-2">
          <img src="" alt="avatar пользователя" />
          <h3>profile_name</h3>
          <input
          id="inpModalText-2"
          style="width: 100%; height: 100px"
          type="text"
          placeholder="предыдущий пост"
          />
                    <button onclick="deletePosts(${posts.id})" id="delete">Удалить</button>
                    </div>
                    </div>
              </div>
            </section>
            <!--! modal wind  2  end  -->
            `;
        divLeft.style.padding = "30px 0 30px";
      });
    });
  pageTotal();
}

// ? ============ Read End ============

// ! paginate start
let countPage = 1;
function pageTotal() {
  fetch(`${API}`)
    .then(res => res.json())
    .then(data => {
      countPage = Math.ceil(data.length / 3);
    });
}

prevBtn.addEventListener("click", () => {
  if (currentPage <= 1) return;
  currentPage--;
  readPosts();
});
nextBtn.addEventListener("click", () => {
  if (currentPage >= countPage) return;
  currentPage++;
  readPosts();
});
// ? ========== Paginate End ==========

// ! ============== EDIT START ===============

function editPost(id, editedPst) {
  // проверка на заполненность полей
  let inpEditDescription = document.getElementById("inpModalText-2");
  let inpModalImg_2 = document.getElementById("inp-modal-img-2");

  if (!inpEditDescription.value.trim() || !inpModalImg_2.value.trim()) {
    alert("Заполните поле");
    return;
  }
  console.log("worrk");
  fetch(`${API}/${id}`, {
    method: "PATCH", // put
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedPst),
  }).then(() => readPosts());
}
let editId = "";
let btnOther2 = document.getElementById("other");
let inpEditDescription = document.getElementById("inpModalText-2");
let inpModalImg_2 = document.getElementById("inp-modal-img-2");
function btnOther(id) {
  console.log(id);
  let editModalMain = document.getElementsByClassName("modal-wind-main-2")[0];
  editModalMain.style.display = "flex";
  // inpEditDescription.innerHTML = `${}`
  fetch(`${API}/${id}`)
    .then(res => res.json())
    .then(postsObj => {
      console.log(postsObj.description);
      inpEditDescription = postsObj.description;
      inpModalImg_2 = postsObj.URL_img;
      editId = postsObj.id;
    });
}
let inpModalText = document.getElementById("inpModalText");

// let btnClose_modal_2 = document.getElementById("close-2");
// btnClose_modal_2.addEventListener("click", () => {
//   console.log("close");
//   editModalMain.style.display = "none";
// });

function modalClose() {
  let editModalMain = document.getElementsByClassName("modal-wind-main-2")[0];
  editModalMain.style.display = "none";
}

function save() {
  let editModalMain = document.getElementsByClassName("modal-wind-main-2")[0];
  let inpEditDescription = document.getElementById("inpModalText-2");
  let editedPst = {
    description: inpEditDescription.value,
    URL_img: inpModalImg_2.value,
  };
  editPost(editId, editedPst);
  editModalMain.style.display = "none";
}
// ! ===============EDIT END ==============

// ! ============ Delete Start ===========
// let btnDel = document.getElementById("delete");
// btnDel.addEventListener("click", () => {
//   console.log(post.id);
//   deletePosts();
// });

function deletePosts(id) {
  // console.log(id);
  fetch(`${API}/${id}`, {
    method: "DELETE",
  }).then(() => readPosts());
}
// ? ============ Delete End ===========
