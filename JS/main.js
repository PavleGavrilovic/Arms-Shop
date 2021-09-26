// SPINNER SAKRIVANJE.......................

$(function () {
    $(window).on("load", function () {
      $("#spinnerWrapper").fadeOut("slow");
      $(" html, body").css({ overflow: "visible" });
      $("#cartIcon").css({display:"block"});
    });
  });


// SCROLL TO ABOUT AND CONTACT...........................



document.getElementById("navbar").style.cssText=`
height:40px;
`;

document.getElementById("navbar").innerHTML=`
<button class="navBtn" id="aboutNav">About</button>
<button class="navBtn" id="contactNav">Contact</button>
`;

$("#aboutNav").click(function() {
    $('html, body').animate({
        scrollTop: $("#aboutWrapper").offset().top
    }, 1000);
});

$("#contactNav").click(function() {
    $('html, body').animate({
        scrollTop: $("footer").offset().top
    }, 1000);
});

// .....................................................


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
<div id="social">
<img src="assets/images/fbook.png" alt="facebook" class="social">
<img src="assets/images/twitter.png" alt="twitter" class="social">
<img src="assets/images/instagram.png" alt="instagram" class="social">
</div>
<div id="copyright">
    <h5 >©Pavle Gavrilovic 2021</h3>
</div>
`;


document.getElementById("aboutWrapper").style.cssText=`
margin-top:80px;
height:200px;
background-color: bisque;
`;

document.getElementById("aboutWrapper").innerHTML=`
<h1 id="aboutHeader">About Us:</h1>
<p id="aboutP">This is a shop with a wide assortment of swords and sword accessories for gentlemen duelists of a more refined age.
All of the swords are handcrafted with the utmost respect and care. All of the manuals are composed of scanned original pages.
</p>
`;


let text = "";

fetch(
  "https://raw.githubusercontent.com/PavleGavrilovic/Arms-Shop/main/data/data.json"
)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      text += `
        <div class="weaponArticleWrapper" data-id="${element.id}">
            <div class="weaponArticle">
                <h3 class="articleName">${element.name}</h3>
                <img src=${element.image} alt="arms_img" class="weaponImg">
                <p>Type: ${element.type}</p>
                <h3>${element.price} €</h3>
            </div>
            <button class="weaponBtn">Add To Cart</button>
        </div>
        `;
    });

    document.getElementById("mainWrapper").innerHTML = text;

    // MODAL WINDOW.................................................

    let weapons = document.getElementsByClassName("weaponArticle");

    for (let i = 0; i < weapons.length; i++) {
      weapons[i].addEventListener("click", showModal);
    }

    function showModal(e) {
      let clicked = e.currentTarget.parentNode;
      let articleId = clicked.dataset.id;

      let find = data.find(function (param) {
        if (param.id == articleId) {
          return param;
        }
      });

      document.getElementById("modalContainer").classList.add("show");
      document.getElementById("modal").innerHTML = `
            <div>
            <h3>${find.name}</h3>
            <img src=${find.image} alt="arms_img" class="modalImg">
            <p>Type: <b>${find.type}</b></p>
            <p>${find.description}</p>
            <h3 id="modalPrice">${find.price} €</h3>
            </div>
        `;
    }

    document
      .getElementById("modalContainer")
      .addEventListener("click", closeModal);

    function closeModal() {
      document.getElementById("modalContainer").classList.remove("show");
    }

    // ADD TO CART...........................................................

    let buttons = document.getElementsByClassName("weaponBtn");

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", getArticle);
    }

    let itemsArray = [];


    function getArticle(e) {
      e.currentTarget.disabled = true;
      e.currentTarget.innerHTML = "Item in Cart";

      let clicked = e.currentTarget.parentNode;
      let articleId = clicked.dataset.id;
      let find = data.find(function (param) {
        if (param.id == articleId) {
          return param;
        }
      });
      

      itemsArray.push(find.price);

      let spaceSum = Number(itemsArray.reduce((a, b) => Number(a) + Number(b)));

      document.getElementById("articlesSpace").innerHTML += `
    <div class="cartItem" data-id=${find.id} data-price=${find.price}>
    <h4>${find.name}</h4> 
    <img src=${find.image} alt="arms_img" class="cartImgPreview">
    <p class="quantityP" >
        quantity: <input type="number" value="1"/>
        <div class="spinner-button inc-button"><b>+</b></div>
        <div class="spinner-button dec-button"><b>-</b></div>
    </p>
    <h4 class="pricePreview">${find.price}€</h4>
    </div>
`;
      document.getElementById("cartSpaceTotal").innerHTML = `
    <h4>Total: ${spaceSum}€</h4>
    
    `;

      // QUANTITY CHANGE................................................

      let pluses = document.getElementsByClassName("inc-button");
      let minuses = document.getElementsByClassName("dec-button");

      for (let i = 0; i < pluses.length; i++) {
        pluses[i].addEventListener("click", function () {
          this.parentNode.querySelector("input[type=number]").stepUp();

          document.getElementById(
            "cartSpaceTotal"
          ).innerHTML = `Total: ${(spaceSum =
            spaceSum + Number(this.parentNode.dataset.price))}€`;
        });
      }

      for (let i = 0; i < minuses.length; i++) {
        minuses[i].addEventListener("click", function () {
          this.parentNode.querySelector("input[type=number]").stepDown();
          
          document.getElementById(
            "cartSpaceTotal"
          ).innerHTML = `Total: ${(spaceSum =
            spaceSum - Number(this.parentNode.dataset.price))}€`;
          if (spaceSum == 0) {
            itemsArray = [];
          }

          if (this.parentNode.querySelector("input[type=number]").value == 0) {
            let itemId = this.parentNode.dataset.id;
            for (let i = 0; i < data.length; i++) {
              if (data[i].id == itemId) {
                document.getElementsByClassName("weaponBtn")[
                  i
                ].disabled = false;
                document.getElementsByClassName("weaponBtn")[i].innerHTML =
                  "Add To Cart";
              }
            }
            this.parentNode.remove();
          }
        });
      }
    }

    document.getElementById("cartPurchase").addEventListener("click", () => {
      if (itemsArray.length == 0) {
        alert("Your Cart is Empty");
      } else {
        alert("Thank You for Shopping with Us!");
        document.getElementById("articlesSpace").innerHTML="";
        document.getElementById("cartSpaceTotal").innerHTML="";
      }
    });
  });

// SHOWING CART CONTENT............................

document.getElementById("cartIcon").addEventListener("click", showCart);

function showCart() {
  if (document.getElementById("cartSpace").style.visibility == "visible") {
    document.getElementById("cartSpace").style.cssText = `
    visibility:hidden;
    `;
  } else {
    document.getElementById("cartSpace").style.cssText = `
    visibility:visible;
    
    `;
  }
}

// TOGGLING DARK AND LIGHT MODE...........................................

document.getElementById("dark").addEventListener("change", changeColor);

function changeColor() {
  if (document.getElementById("dark").checked) {
    document.getElementsByClassName("social")[0].src =
      "assets/images/fbook-white.png";
    document.getElementsByClassName("social")[1].src =
      "assets/images/twitter-white.png";
    document.getElementsByClassName("social")[2].src =
      "assets/images/instagram-white.png";
    document.getElementById("cartPurchase").style.backgroundColor =
      "darkslateblue";
    document.getElementById("cartPurchase").style.color = "white";
    let quantityButtons = document.getElementsByClassName("spinner-button");
    for (let i = 0; i < quantityButtons.length; i++) {
      quantityButtons[i].style.backgroundColor = "darkslateblue";
      quantityButtons[i].style.color = "white";
    }

    document.getElementById("copyright").style.color = "white";
    document.getElementById("copyright").style.paddingBottom = "25px";

    document.getElementById("aboutNav").style.cssText = `
            color:white;
            background-color:darkslateblue;
            `;

    document.getElementById("contactNav").style.cssText = `
            color:white;
            background-color:darkslateblue;
            `;

    document.getElementById("aboutWrapper").style.cssText = `
        color:white;
        background-color:rgb(29, 28, 28);
        `;

    document.getElementById("headerImg").src =
      "https://raw.githubusercontent.com/PavleGavrilovic/Arms-Shop/main/assets/images/darkHeaderImg.png";
    document.body.style.backgroundColor = "black";
    document.getElementsByTagName("header")[0].style.cssText = `
        color:white;
        background-color:rgb(29, 28, 28);
        `;
    document.getElementsByTagName("footer")[0].style.cssText = `
        color:white;
        background-color:rgb(29, 28, 28);
        `;
    document.getElementById("darkLight").style.backgroundColor =
      "darkslateblue";
    document.getElementById("cartIcon").style.backgroundColor = "darkslateblue";
    document.getElementById("contactBtn").style.cssText = `
        color:white;
        background-color:darkslateblue;
        margin-bottom: 25px;
        `;
    document.getElementById("goToCartBtn").style.cssText = `
        color:white;
        background-color:darkslateblue;
        `;

    let articles = document.getElementsByClassName("weaponArticle");

    for (let i = 0; i < articles.length; i++) {
      articles[i].style.color = "white";
    }

    let buttons = document.getElementsByClassName("weaponBtn");

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.backgroundColor = "darkslateblue";
      buttons[i].style.color = "white";
    }

    document.getElementById("modal").style.cssText = `
        color:white;
        background-color:rgb(40,40,40);
        `;

    document.getElementById("cartSpace").style.backgroundColor =
      "rgb(90, 90, 90)";
    document.getElementById("cartSpace").style.color = "white";
  } else {
    document.getElementsByClassName("social")[0].src =
      "assets/images/fbook.png";
    document.getElementsByClassName("social")[1].src =
      "assets/images/twitter.png";
    document.getElementsByClassName("social")[2].src =
      "assets/images/instagram.png";
    document.getElementById("cartPurchase").style.backgroundColor = "gold";
    document.getElementById("cartPurchase").style.color = "black";
    let quantityButtons = document.getElementsByClassName("spinner-button");
    for (let i = 0; i < quantityButtons.length; i++) {
      quantityButtons[i].style.backgroundColor = "gold";
      quantityButtons[i].style.color = "black";
    }

    document.getElementById("copyright").style.color = "black";
    document.getElementById("copyright").style.paddingBottom = "25px";

    document.getElementById("aboutNav").style.cssText = `
            color:black;
            background-color:gold;
            `;

    document.getElementById("contactNav").style.cssText = `
            color:black;
            background-color:gold;
            `;

    document.getElementById("aboutWrapper").style.cssText = `
        color:black;
        background-color:bisque;
        `;

    document.getElementById("headerImg").src =
      "https://raw.githubusercontent.com/PavleGavrilovic/Arms-Shop/main/assets/images/headerImg.jpg";
    document.body.style.backgroundColor = "white";
    document.getElementsByTagName("header")[0].style.cssText = `
        color:black;
        background-color:bisque;
        `;
    document.getElementsByTagName("footer")[0].style.cssText = `
        color:black;
        background-color:bisque;
        `;
    document.getElementById("darkLight").style.backgroundColor = "gold";
    document.getElementById("cartIcon").style.backgroundColor = "gold";
    document.getElementById("contactBtn").style.cssText = `
        color:black;
        background-color:gold;
        margin-bottom: 25px;
        `;
    document.getElementById("goToCartBtn").style.cssText = `
        color:black;
        background-color:gold;
        `;

    let articles = document.getElementsByClassName("weaponArticle");

    for (let i = 0; i < articles.length; i++) {
      articles[i].style.color = "black";
    }

    let buttons = document.getElementsByClassName("weaponBtn");

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.backgroundColor = "gold";
      buttons[i].style.color = "black";
    }

    document.getElementById("modal").style.cssText = `
        color:black;
        background-color:white;
        `;

    document.getElementById("cartSpace").style.backgroundColor = "white";
    document.getElementById("cartSpace").style.color = "black";
  }
}
