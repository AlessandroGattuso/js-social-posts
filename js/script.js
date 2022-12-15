let posts = [
  {
    authorName: 'Pippo Cartesio',
    authorPic: 'https://picsum.photos/500/300',
    date: '06-30-2021',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis amet natus, illum, commodi exercitationem dolores illo doloremque recusandae dicta numquam voluptas ipsam atque libero molestias?',
    image: 'https://picsum.photos/200/200',
    n_likes: 23
  },
  {
    authorName: 'Emma Rossi',
    date: '02-16-2021',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis amet natus, illum, commodi exercitationem dolores illo doloremque recusandae dicta numquam voluptas ipsam atque libero molestias?',
    image: 'https://picsum.photos/300/300',
    n_likes: 15199
  },
  {
    authorName: 'Roberto Abatantuono',
    authorPic: 'https://picsum.photos/200/300',
    date: '10-04-2021',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis amet natus, illum, commodi exercitationem dolores illo doloremque recusandae dicta numquam voluptas ipsam atque libero molestias?',
    n_likes: 99
  }
];

posts.forEach((post, i) => {
  post.date = convertDate(post.date)
  post.id = i+1;
});

const cards = document.querySelector('.card-container');

let img;
let pic;

posts.forEach((post) =>{

  if(post.image != undefined)
    img = `<img src="${post.image}" class="card-img" alt="Image not found"></img>`;
  

  if(post.authorPic != undefined) 
    pic = `<img src="${post.authorPic}" class="profile-pic" alt="Image not found"></img>`;

  else{
    let nameInitials = post.authorName.split(" ").map((e)=>e[0]).join("");
    pic = `<div class="profile-pic d-flex align-items-center justify-content-center fs-2 text-white">${nameInitials}</div>`
  }
  
  let card = `
              <div class="card p-3 myCard">
                <div class="card-body p-0 mb-3">
                  <div class="d-flex  mb-3 gap-4">
                    ${pic}
                    <div class="d-flex flex-column">
                      <strong>${post.authorName}</strong>
                      <span>${post.date}</span>
                    </div>
                  </div>
                  <p class="card-text">${post.description}</p>
                </div>
                ${img}
                <div class="card-body p-0 d-flex gap-5 w-100 justify-content-center mt-4">
                    <button class="like"><i class="fa-solid fa-thumbs-up"></i></button>
                    <span>Piace a <strong class="like-text">${post.n_likes}</strong> persone</span>
                </div>
              </div>
             `;
  cards.innerHTML += card;
})

const like = document.querySelectorAll('.card button');
const likeText = document.querySelectorAll('.like-text');
let postLiked = [];

like.forEach((button,i) => {

  button.addEventListener('click',function(){
    if(!this.classList.contains('active')){
      this.classList.add('active')
      likeText[i].innerText = ++posts[i].n_likes;
      postLiked.push(i);
    } 
    else{
      this.classList.remove('active')
      likeText[i].innerText = --posts[i].n_likes;
      postLiked = postLiked.filter((likeItem)=> likeItem!=i);
    }
  })

})

function convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  let d = new Date(inputFormat)
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
}