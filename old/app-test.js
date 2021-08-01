const menu = [
    {
      id: 1,
      title: "Homemade Onion Rings",
      category: "appetizers",
      price: 4.99,
      img: "./images/item-1.jpeg",
      desc: ``,
    },
    {
      id: 2,
      title: "Chili Cheese Fries",
      category: "appetizers",
      price: 3.99,
      img: "./images/item-2.jpeg",
      desc: ``,
    },
    {
      id: 3,
      title: "Cheese Sticks",
      category: "appetizers",
      price:  5.99,
      img: "./images/item-3.jpeg",
      desc: `Serving of 6`,
    },
    {
      id: 4,
      title: "Fried Pickles ",
      category: "appetizers",
      price: 3.50,
      img: "./images/item-4.jpeg",
      desc: ``,
    },
    {
      id: 5,
      title: "Jalapeno Poppers",
      category: "appetizers",
      price: 5.99 ,
      img: "./images/item-5.jpeg",
      desc: `Serving of 6`,
    },
    {
      id: 6,
      title: "Wings",
      category: "appetizers",
      price: 6.99,
      img: "./images/item-6.jpeg",
      desc: `Serving of 6`,
    },
    {
      id: 7,
      title: "Wings",
      category: "appetizers",
      price: 9.99,
      img: "./images/item-7.jpeg",
      desc: `Serving of 12`,
    },
    {
      id: 8,
      title: "Chicken Tenders",
      category: "appetizers",
      price: 4.95,
      img: "./images/item-8.jpeg",
      desc: `Serving of 4`,
    },
   
  ];
  // get parent element
  const mainContent = document.querySelector("main");
  const btnContainer = document.querySelector(".btn-container");
  // display all items when page loads
  window.addEventListener("DOMContentLoaded", function () {
    diplayMenuItems(menu);
    displayMenuButtons();
  });
  
  function diplayMenuItems(menuItems) {
    let displayMenu = menuItems.map(function (item) {
      // console.log(item);
  
      return `<article class="menu-item">
            <div class="item-info">
              <header>
                <h4>${item.title}</h4>
                <h4 class="price">$${item.price}</h4>
              </header>
              <p class="item-text">
                ${item.desc}
              </p>
            </div>
          </article>`;
    });
    displayMenu = displayMenu.join("");
    // console.log(displayMenu);
  
    mainContent.innerHTML = displayMenu;
  }