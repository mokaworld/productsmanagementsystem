let deviceName = document.getElementById("deviceName");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let category = document.getElementById("category");
let count = document.getElementById("count");
let submit = document.getElementById("submit");
let countInp = document.getElementById("count-inp");
let mode = "create";
let help;
let SearchByTitle = document.getElementById("searchTitle");
let SearchByCategory = document.getElementById("searchCategory");

//get total
function getTotal() {
  if (price.value !== "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result + " LE";
  } else {
    total.innerHTML = "0 LE";
  }
}

deviceName.addEventListener("keyup", getTotal);
price.addEventListener("keyup", getTotal);
taxes.addEventListener("keyup", getTotal);
ads.addEventListener("keyup", getTotal);
discount.addEventListener("keyup", getTotal);

let product = localStorage.product ? JSON.parse(localStorage.product) : [];

submit.addEventListener("click", function (e) {
  e.preventDefault();
  let newProduct = {
    deviceName: deviceName.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    category: category.value.toLowerCase(),
    count: count.value,
  };

  if (mode === "create") {
    if (newProduct.count > 1) {
      for (let i = 0; i < newProduct.count; i++) {
        product.push(newProduct);
      }
    } else {
      product.push(newProduct);
    }
  } else {
    product[help] = newProduct;
    mode = "create";
    submit.innerHTML = "Create";
    countInp.style.display = "block";
  }

  localStorage.setItem("product", JSON.stringify(product));
  clearData();
  showData();
});

function clearData() {
  deviceName.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "0 LE";
  category.value = "";
  count.value = "";
}

function showData() {
  let table = "";
  for (let i = 0; i < product.length; i++) {
    table += `
                        <tr>
                            <th scope="row">${i + 1}</th>
                            <td>${product[i].deviceName}</td>
                            <td>${product[i].price}</td>
                            <td>${product[i].taxes}</td>
                            <td>${product[i].ads}</td>
                            <td>${product[i].discount}</td>
                            <td>${product[i].total}</td>
                            <td>${product[i].category}</td>
                            <td><button onclick="updateRow(${i})" type="button" class="btn btn-success"><span>Update</span> <i class="fa-solid fa-pen"></i></button></td>
                            <td><button onclick="deleteRow(${i})" type="button" class="btn btn-danger"><span>Delete</span> <i class="fa-solid fa-trash"></i></button></td>
                        </tr>
                    `;
  }
  document.getElementById("tbody").innerHTML = table;

  let deleteAll = document.getElementById("deleteAll");
  if (product.length > 0) {
    deleteAll.style.display = "inline-block";
    deleteAll.innerHTML = `<span>Delete All</span> <i class="fa-solid fa-trash-can"></i> (${product.length})`;
  } else {
    deleteAll.style.display = "none";
  }
}

showData();

window.deleteRow = function (i) {
  product.splice(i, 1);
  localStorage.product = JSON.stringify(product);
  showData();
};

window.deleteAll = function () {
  localStorage.clear();
  product = [];
  showData();
};

window.updateRow = function (i) {
  deviceName.value = product[i].deviceName;
  price.value = product[i].price;
  taxes.value = product[i].taxes;
  ads.value = product[i].ads;
  discount.value = product[i].discount;
  getTotal();
  countInp.style.display = "none";
  category.value = product[i].category;
  submit.innerHTML = "Update";
  mode = "update";
  help = i;
};

function getSearchMode(id) {
  let searchBar = document.getElementById("searchBar");

  if (id === "searchTitle") {
    searchMode = "title";
    searchBar.placeholder = "Search By Title ...";
  } else {
    searchMode = "category";
    searchBar.placeholder = "Search By Category ...";
  }
  searchBar.focus();
  searchBar.value = "";
  showData();
}

let searchMode = "title";

function search(value) {
  let table = "";
  if (searchMode == "title") {
    for (let i = 0; i < product.length; i++) {
      let searchVal = product[i].deviceName.includes(value.toLowerCase());
      if (searchVal) {
        table += `
        <tr>
            <th scope="row">${i - 1}</th>
            <td>${product[i].deviceName}</td>
            <td>${product[i].price}</td>
            <td>${product[i].taxes}</td>
            <td>${product[i].ads}</td>
            <td>${product[i].discount}</td>
            <td>${product[i].total}</td>
            <td>${product[i].category}</td>
            <td><button onclick="updateRow(${i})" type="button" class="btn btn-success"><span>Update</span> <i class="fa-solid fa-pen"></i></button></td>
            <td><button onclick="deleteRow(${i})" type="button" class="btn btn-danger"><span>Delete</span> <i class="fa-solid fa-trash"></i></button></td>
        </tr>
    `;
      }
      document.getElementById("tbody").innerHTML = table;
    }
  } else {
    for (let i = 0; i < product.length; i++) {
      let searchVal = product[i].category.includes(value.toLowerCase());
      if (searchVal) {
        table += `
        <tr>
            <th scope="row">${i + 1}</th>
            <td>${product[i].deviceName}</td>
            <td>${product[i].price}</td>
            <td>${product[i].taxes}</td>
            <td>${product[i].ads}</td>
            <td>${product[i].discount}</td>
            <td>${product[i].total}</td>
            <td>${product[i].category}</td>
            <td><button onclick="updateRow(${i})" type="button" class="btn btn-success"><span>Update</span> <i class="fa-solid fa-pen"></i></button></td>
            <td><button onclick="deleteRow(${i})" type="button" class="btn btn-danger"><span>Delete</span> <i class="fa-solid fa-trash"></i></button></td>
        </tr>
    `;
      }
      document.getElementById("tbody").innerHTML = table;
    }
  }
}



  const sunIcon = document.getElementById("sun");
  const moonIcon = document.getElementById("moon");
  const body = document.querySelector("body");
  const moodToggle = document.getElementById("mood");

  const storedMood = localStorage.getItem("mood");

  
  if (storedMood === "light") {
      sunIcon.style.display = "none"; 
      moonIcon.style.display = "block";
      body.classList.add("light"); 
  } else {
      sunIcon.style.display = "block"; 
      moonIcon.style.display = "none"; 
      body.classList.remove("light"); 
  }


  moodToggle.addEventListener("click", function () {
      if (sunIcon.style.display === "block") {
          moonIcon.style.display = "block";
          sunIcon.style.display = "none";
          body.classList.add("light");
         
          localStorage.setItem("mood", "light");
      } else {
          sunIcon.style.display = "block";
          moonIcon.style.display = "none";
          body.classList.remove("light");
     
          localStorage.setItem("mood", "dark");
      }
  });


  let loader = document.querySelector(".loading-page");

  window.addEventListener("load",function(e){
    loader.style.display = "none";
  })