//Create array of posts
let posts = [
  {
    author: {
      name: 'Pippo Cartesio',
      pic: 'https://picsum.photos/500/300',
    },
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis amet natus, illum, commodi exercitationem dolores illo doloremque recusandae dicta numquam voluptas ipsam atque libero molestias?',
    image: 'https://picsum.photos/600/500',
    n_likes: 23
  },
  {
    author: {
      name: 'Emma Rossi',
    },
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis amet natus, illum, commodi exercitationem dolores illo doloremque recusandae dicta numquam voluptas ipsam atque libero molestias?',
    image: 'https://picsum.photos/600/400',
    n_likes: 15199
  },
  {
    author:{
      name: 'Roberto Abatantuono',
      pic: 'https://picsum.photos/200/300',
    },
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis amet natus, illum, commodi exercitationem dolores illo doloremque recusandae dicta numquam voluptas ipsam atque libero molestias?',
    n_likes: 99
  }
];

//add date and id properties to to every obj of the array
posts.forEach((post, i) => {
  post.date =  formatDate(generateDate());
  post.id = i+1;
});


const cards = document.querySelector('.card-container');

posts.forEach((post) =>{
  let img = "";
  let profileImg;
  let footerCard;

  //If the image exist as property of the actual object diplay it in the post inside th page
  if(post.image != undefined){
    img = `<img src="${post.image}" class="card-img" alt="Image not found"></img>`;
    footerCard = `<div class="card-body p-0 d-flex gap-5 w-100 justify-content-center mt-5">`
  }
  else
    footerCard = `<div class="card-body p-0 d-flex gap-5 w-100 justify-content-center mt-3">`
    
  //If the profile picture as property of the actual object display it in the post inside the page
  if(post.author.pic != undefined)
    profileImg = `<img src="${post.author.pic}" class="profile-pic" alt="Image not found"></img>`;
  //Else create a div and put inside of it the initials of the author's name
  else{
    let nameInitials = post.author.name.split(" ").map((e)=>e[0]).join("");
    profileImg = `<div class="profile-pic d-flex align-items-center justify-content-center fs-2 text-white">${nameInitials}</div>`
  }
  
  //append the element
  cards.innerHTML += `
              <div class="card p-3 myCard">
                <div class="card-body p-0 mb-3">
                  <div class="d-flex  mb-3 gap-4">
                    ${profileImg}
                    <div class="d-flex flex-column">
                      <strong>${post.author.name}</strong>
                      <span>${post.date}</span>
                    </div>
                  </div>
                  <p class="card-text">${post.description}</p>
                </div>
                ${img}
                ${footerCard}
                  <button class="like"><i class="fa-solid fa-thumbs-up"></i></button>
                  <span>Piace a <strong class="like-text">${post.n_likes}</strong> persone</span>
                </div>
              </div>
             `;
})

const like = document.querySelectorAll('.card button');
const likeText = document.querySelectorAll('.like-text');

//Array of which posts the user liked
let postsLiked = [];


like.forEach((button,i) => {

  button.addEventListener('click',function(){
    //if the button is not already been clicked add class 'active' to the button, increment the number of likes, update the like-text and at the end push the id of the post inside postsLiked
    if(!this.classList.contains('active')){
      this.classList.add('active')
      likeText[i].innerText = ++posts[i].n_likes;
      postsLiked.push(i+1);
    } 
    //else remove class 'active' to the button, decrement the number of likes, update the like-text and at the end remove the id of the post inside postsLiked
    else{
      this.classList.remove('active')
      likeText[i].innerText = --posts[i].n_likes;
      postsLiked = postsLiked.filter((likeItem)=> likeItem!=i+1);
    }

  })

})

//function we use to generate a random date from 2012 until current year
function generateDate(){
  let day = Math.floor(Math.random() * (32 - 1) + 1);
  let month = Math.floor(Math.random() * (13 - 1) + 1);
  const year = Math.floor(Math.random() * (parseInt((new Date().getFullYear())) + 1 - 2012) + 2012);

  if(day < 10)
    day = "0" + day;
  if(month < 10)
    month = "0" + month;

  return month + "-" + day + "-" + year;
}

//function we use to format the date to: 'gg/mm/yyyy'
function formatDate(date) {
    const formatted = date.split("-");
    return formatted[1] + "/" + formatted[0] + "/" + formatted[2];
}
