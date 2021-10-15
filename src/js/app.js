window.addEventListener("DOMContentLoaded", () => {
    const modeButton = document.getElementById("mode-button");
    modeButton.addEventListener("click", () => {
        const bodyElement = document.body;
        const buttonIcon = modeButton.querySelector(".bx");
        if (!bodyElement.classList.contains("dark-mode")) {
            bodyElement.classList.add("dark-mode");
            buttonIcon.classList.remove("bx-moon");
            buttonIcon.classList.add("bx-sun");
            buttonIcon.setAttribute("title", "light");

        }else if (bodyElement.classList.contains("dark-mode")) {
            bodyElement.classList.remove("dark-mode");
            buttonIcon.classList.remove("bx-sun");
            buttonIcon.classList.add("bx-moon");
            buttonIcon.setAttribute("title", "dark");
        }
    })

    fetch('https://bobs-family-midland-menu.herokuapp.com/categories')
    .then(response => response.json())
    .then(data => {
        data.forEach(category => {
            let sortedProducts = [];
            let categoryList = `${category.name}-list`;
            let featured = category.products.filter(product => product.featured == true);
            let standard = category.products.filter(product => product.addon == null || product.addon == false && product.featured == null || product.featured == false);
            let addon = category.products.filter(product => product.addon == true);
            sortedProducts.push(...featured, ...standard, ...addon);
            let conversion = sortedProducts.map(product => {
                let description;
                let itemClass;
                if (product.description == null) {
                    itemClass = "menu-item no-gap";
                    description = "";
                } else {
                    itemClass = "menu-item";
                    description = `<div class="item-description">${product.description}</div>`
                }
                return `
                <li class="${itemClass}">
                    <div class="item-name">${product.name}</div>
                    <div class="item-price">$${(Math.round(product.price * 100) / 100).toFixed(2)}</div>
                    ${description}
                </li>`;
            });
            let categoryHTML = conversion.join("");
            document.getElementById(categoryList).innerHTML = categoryHTML;
        });
    });
})