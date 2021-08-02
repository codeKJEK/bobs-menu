window.addEventListener("DOMContentLoaded", () => {
    const asideMenu = document.getElementById("app-aside"),
    inlineMenu = document.getElementById("inline-menu"),
    inlineCtas = inlineMenu.querySelectorAll("a"),
    filterMenu = document.getElementById("filter-menu"),
    checkBoxes = filterMenu.querySelectorAll("input"),
    closeBtns = document.querySelectorAll(".close-btn"),
    clearFilter = document.querySelector(".clear-filter"),
    menuOption = document.getElementById("menu-option"),
    filterOption = document.getElementById("filter-option"),
    menuSections = document.querySelectorAll(".menu-section"),
    menuItems = document.querySelectorAll(".menu-item"),
    sideItems = document.querySelectorAll(".side-item");
    
    fetch("https://bobs-family-midland-menu.herokuapp.com/products?_sort=name:asc")
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            console.log("ERROR: Network Error or No Product Found")
        }
    })
    .then(data => {
        console.log(data);
        let allCategories = [];
        data.forEach(product => {
            if(!allCategories.includes(product.category)) {
                allCategories.push(product.category);
            }
        });
        allCategories.forEach(category => {
            let singleCategory = data.filter(product => product.category == category);
            let categoryHTML = singleCategory.map(item => {
                let desc = ``
                if (item.description == null) {
                    desc = ``
                } else {
                    desc = `<p>${item.description}</p>`
                }
                return `
                <article>
                    <header class="article-header">
                        <h3>${item.name}</h3>
                        <h3>${(Math.round(item.price * 100) / 100).toFixed(2)}</h3>
                    </header>
                    ${desc}
                </article>`
            });
            categoryHTML = categoryHTML.join("");
            let inlineNav = `
            <ul>
            <li><button data-category="${category}" data-action="${category}-click-filter" class="filter-btn"><figure data-category="${category}" data-action="${category}-click-filter"><img src="uploads/filter-icon-dark.svg" alt="filter" data-category="${category}" data-action="${category}-click-filter"
            data-category="${category}" data-action="${category}-click-menu"></figure>filter</button></li>
            <li><button data-category="${category}" data-action="${category}-click-menu" class="menu-btn"><figure data-category="${category}" data-action="${category}-click-menu"><img src="uploads/menu-icon-dark.svg" alt="menu" data-category="${category}" data-action="${category}-click-menu"></figure>menu</button></li>
            <li class="call-cta"><a href="tel:+7048883898" data-category="${category}" data-action="${category}-click-call"><figure data-category="${category}" data-action="${category}-click-call"><img src="uploads/call-icon-dark.svg" alt="call" data-category="${category}" data-action="${category}-click-call"></figure>call</a></li>
            </ul>
            `
            categoryHTML += inlineNav;
            document.getElementById(category).insertAdjacentHTML('beforeend', categoryHTML);
        })
        const filterBtns = document.querySelectorAll(".filter-btn"),
        menuBtns = document.querySelectorAll(".menu-btn");
        filterBtns.forEach(btn => btn.addEventListener("click", () => {
            asideMenu.setAttribute("aria-hidden", "false");
            inlineMenu.hidden = true;
            filterMenu.hidden = false;
            menuOption.classList.remove("active");
            filterOption.classList.add("active");
            
        }))
        menuBtns.forEach(btn => btn.addEventListener("click", () => {
            asideMenu.setAttribute("aria-hidden", "false");
            filterMenu.hidden = true;
            inlineMenu.hidden = false;
            filterOption.classList.remove("active");
            menuOption.classList.add("active");
        }))
    })
    function closeMenu() {
        asideMenu.setAttribute("aria-hidden", "true");
        inlineMenu.hidden = true;
        filterMenu.hidden = true;
    }
    closeBtns.forEach(btn => btn.addEventListener("click", () => {
        closeMenu();
    }))
    inlineCtas.forEach(cta => cta.addEventListener("click", () => {
        if(window.innerWidth < 769){
            closeMenu();
        }
        
    }))
    asideMenu.addEventListener("click", (event) => {
        if(event.target === asideMenu) {
            console.log(event.target)
            closeMenu();
        }
    })
    menuOption.addEventListener("click", () => {
        filterMenu.hidden = true;
        inlineMenu.hidden = false;
        filterOption.classList.remove("active");
        menuOption.classList.add("active");
    })
    filterOption.addEventListener("click", () => {
        filterMenu.hidden = false;
        inlineMenu.hidden = true;
        menuOption.classList.remove("active");
        filterOption.classList.add("active");
    })
    
    checkBoxes.forEach(checkBox => checkBox.addEventListener("change", () => {
        let numSelected = 0;
        let filterSection = [];
        let filterMenu = [];
        let filterAside = [];
        
        checkBoxes.forEach(input => {
            if (input.checked === true) {
                numSelected++
                filterSection.push(input.getAttribute("aria-controls"))
                filterMenu.push(`${input.getAttribute("aria-controls")}-cta`);
                filterAside.push(`${input.getAttribute("aria-controls")}-sideCta`);
            }
        })
        console.log(numSelected)
        if(numSelected > 0) {
            clearFilter.classList.add("color");
            menuSections.forEach(section => {
                if(filterSection.includes(section.getAttribute("id"))) {
                    section.hidden = false
                } else {
                    section.hidden = true;
                }
            })
            menuItems.forEach(item => {
                if(filterMenu.includes(item.getAttribute("id"))) {
                    item.hidden = false
                } else {
                    item.hidden = true;
                }
            })
            sideItems.forEach(item => {
                if(filterAside.includes(item.getAttribute("id"))) {
                    item.hidden = false;
                } else {
                    item.hidden = true;
                }
            })
        } else {
            menuSections.forEach(section => {
                section.hidden = false;
            })
            menuItems.forEach(item => {
                item.hidden = false;
            })
            sideItems.forEach(item => {
                item.hidden = false;
            })
        }
    }))
    clearFilter.addEventListener("click", () => {
        clearFilter.classList.remove("color");
        checkBoxes.forEach(checkbox => {
            checkbox.checked = false;
        })
        menuSections.forEach(section => {
            section.hidden = false;
        })
        menuItems.forEach(item => {
            item.hidden = false;
        })
        sideItems.forEach(item => {
            item.hidden = false;
        })
    })
})


