let text="";

fetch("https://raw.githubusercontent.com/PavleGavrilovic/Arms-Shop/main/data/data.json")
.then((response) => response.json())
.then((data)=>{
    data.forEach(element => {
        text+=`
        <div class="weaponArticle" data-id="${element.id}">
        <h3>${element.name}</h3>
        <img src=${element.image} alt="arms_img" class="weaponImg">
        <p>Type: ${element.type}</p>
        <h3>${element.price} €</h3>
        <button class="weaponBtn">Add To Cart</button>
        </div>
        `
    });

    document.getElementById("mainWrapper").innerHTML=text;

    // MODAL WINDOW.................................................

let weapons=document.getElementsByClassName("weaponArticle");

for(let i=0;i<weapons.length;i++){
    weapons[i].addEventListener("click",showModal);
}

function showModal(){
    let clicked=this;
        let articleId=clicked.dataset.id

        let find=data.find(function (param) {
            if(param.id==articleId){
                return param;
            }
        })
        
        document.getElementById("modalContainer").classList.add("show");
        document.getElementById("modal").innerHTML=`
            <div>
            <h3>${find.name}</h3>
            <img src=${find.image} alt="arms_img" class="modalImg">
            <p>Type: <b>${find.type}</b></p>
            <p>${find.description}</p>
            <h3 id="modalPrice">${find.price} €</h3>
            </div>
        `;
        
        
}

document.getElementById("modalContainer").addEventListener("click",closeModal);

function closeModal(){
    document.getElementById("modalContainer").classList.remove("show");
}


});

document.getElementsByTagName("footer")[0].style.cssText=`
padding-bottom: 25px;
background-color: bisque;
`;

document.getElementsByTagName("footer")[0].innerHTML=`
<h1>Contact Us:</h1>
<fieldset>
    <form action="#" method="POST">
    <label for="fname" class="labelContact">Name:</label>
    <input type="text" id="fname" class="inputContact">
    <label for="email" class="labelContact">Email:</label>
    <input type="email" id="email" class="inputContact"><br>
    <textarea placeholder="Write your message here..."></textarea>
    <button id="contactBtn">Send</button>
    </form>
</fieldset>
`;

// TOGGLING DARK AND LIGHT MODE...........................................

document.getElementById("dark").addEventListener("change",changeColor);

function changeColor(){
    if(document.getElementById("dark").checked){
        document.getElementById("headerImg").src = "https://raw.githubusercontent.com/PavleGavrilovic/Arms-Shop/main/assets/images/darkHeaderImg.png";
        document.body.style.backgroundColor="black";
        document.getElementsByTagName("header")[0].style.cssText=`
        color:white;
        background-color:rgb(29, 28, 28);
        `;
        document.getElementsByTagName("footer")[0].style.cssText=`
        color:white;
        background-color:rgb(29, 28, 28);
        `;
        document.getElementById("darkLight").style.backgroundColor="darkslateblue";
        document.getElementById("cartIcon").style.backgroundColor="darkslateblue";
        document.getElementById("contactBtn").style.cssText=`
        color:white;
        background-color:darkslateblue;
        margin-bottom: 25px;
        `;
        document.getElementById("goToCartBtn").style.cssText=`
        color:white;
        background-color:darkslateblue;
        `;

        let articles=document.getElementsByClassName("weaponArticle");

        for(let i=0;i<articles.length;i++){
            articles[i].style.color="white";
        }

        let buttons=document.getElementsByClassName("weaponBtn");

        for(let i=0;i<buttons.length;i++){
            buttons[i].style.backgroundColor="darkslateblue";
            buttons[i].style.color="white";
        }

        document.getElementById("modal").style.cssText=`
        color:white;
        background-color:rgb(40,40,40);
        `;
    }else{
        document.getElementById("headerImg").src = "https://raw.githubusercontent.com/PavleGavrilovic/Arms-Shop/main/assets/images/headerImg.jpg";
        document.body.style.backgroundColor="white";
        document.getElementsByTagName("header")[0].style.cssText=`
        color:black;
        background-color:bisque;
        `;
        document.getElementsByTagName("footer")[0].style.cssText=`
        color:black;
        background-color:bisque;
        `;
        document.getElementById("darkLight").style.backgroundColor="gold";
        document.getElementById("cartIcon").style.backgroundColor="gold";
        document.getElementById("contactBtn").style.cssText=`
        color:black;
        background-color:gold;
        margin-bottom: 25px;
        `;
        document.getElementById("goToCartBtn").style.cssText=`
        color:black;
        background-color:gold;
        `;

        let articles=document.getElementsByClassName("weaponArticle");

        for(let i=0;i<articles.length;i++){
            articles[i].style.color="black";
        }

        let buttons=document.getElementsByClassName("weaponBtn");

        for(let i=0;i<buttons.length;i++){
            buttons[i].style.backgroundColor="gold";
            buttons[i].style.color="black";
        }

        document.getElementById("modal").style.cssText=`
        color:black;
        background-color:white;
        `;
    }
}

