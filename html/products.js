var productCart = [];
var products = [
  { id: 101, name: "Basket Ball", image: "basketball.png", price: 150 },
  { id: 102, name: "Football", image: "football.png", price: 120 },
  { id: 103, name: "Soccer", image: "soccer.png", price: 110 },
  { id: 104, name: "Table Tennis", image: "table-tennis.png", price: 130 },
  { id: 105, name: "Tennis", image: "tennis.png", price: 100 },
];
var s;
$(document).ready(function () {
  products.forEach((e) => {
    s +=
      '<div id="' +
      e.id +
      '" class="product"> <img src="images/' +
      e.image +
      '"><h3 class="title"><a href="#">Product ' +
      e.id +
      "</a></h3><span>Price: $" +
      e.price +
      '.00</span><a class="add-to-cart" onclick=addToCart(' +
      e.id +
      ")>Add To Cart</a></div>";
  });
  $("#products").html(s);

  $("#cart").html();

  $("#emptycart").click(function () {
    if (confirm("Are you Sure you Want to Empty your Product Cart ?") == true) {
      productCart = [];
      displayCart(productCart);
      billAmount(productCart);
    }
  });
});
function addToCart(k) {
  var flag = 0;
  if (productCart.length == 0) {
    products.forEach((e) => {
      if (e.id == k) {
        cartObj = {
          productId: e.id,
          productName: e.name,
          productImage: e.image,
          productPrice: e.price,
          productQuantity: 1,
        };
        productCart.push(cartObj);
      }
    });
  } else {
    productCart.forEach((e) => {
      if (e.productId == k) {
        flag = 1;
      }
    });
    if (flag == 1) {
      productCart.forEach((e) => {
        var c = 0;
        if (e.productId == k) {
          e.productQuantity = e.productQuantity + 1;
        }
      });
    }
    if (flag == 0) {
      products.forEach((e) => {
        if (e.id == k) {
          cartObj = {
            productId: e.id,
            productName: e.name,
            productImage: e.image,
            productPrice: e.price,
            productQuantity: 1,
          };
          productCart.push(cartObj);
        }
      });
    }
  }
  displayCart(productCart);
  billAmount(productCart);
}
function displayCart(data) {
  t =
    "<tr> <th><h3>Product ID:</h3></th> <th><h3>Name:</h3></th> <th><h3>Image:</h3></th> <th><h3>Price:</h3></th> <th><h3>Quantity:</h3></th> <th><h3>Delete Product:</h3></th>  </tr>";
  data.forEach((e) => {
    t +=
      "<tr><td><h3><b>" +
      e.productId +
      "</b></h3></td>"+"<td><h3>" +
      e.productName +
      "</h3></td>"+"<td>" +
      "<img src= 'images/" +
      e.productImage +
      "' style='height:50px ; width:50px ;'></td>"+"<td><h3>" +
      e.productPrice +
      "</h3></td>"+"<td><p><button id='"+e.productId+"'onclick='reduceQuant(this.id)' style='height:20px ; width:20px ;'>-</button><b>" +
      e.productQuantity +"</b><button id='" +e.productId +"' onclick='addQuant(this.id)' style='height:20px ; width:20px ;'>+</button><p></td>"+"<td><button id='" +
      e.productId +
      "' onclick=deleteRow(this.id)>Delete</button></tr>";
  });
  $("#cart").html(t);
  $("table").css("border", "1px");
  $("#cart").css("border", "solid");
  $("#cart").css("width", "90%");
  $("#cart").css("border-width", "2px");
  $("tr:even").css("background", "lightgrey");
}
function addQuant(j) {
  productCart.forEach((e) => {
    if (e.productId == j) {
      e.productQuantity = e.productQuantity + 1;
    }
  });
  displayCart(productCart);
  billAmount(productCart);
}
function reduceQuant(m) {
  var ind = 0;
  for (i = 0; i < productCart.length; i++) {
    if (productCart[i].productId == m) {
      ind = i;
    }
  }
  productCart.forEach((e) => {
    if (e.productId == m) {
      if (e.productQuantity > 1) {
        e.productQuantity = e.productQuantity - 1;
      } else {
        if (
          confirm("Are you Sure you Want to delete product form cart") == true
        ) {
          productCart.splice(ind, 1);
        }
      }
    }
  });
  displayCart(productCart);
  billAmount(productCart);
}
function billAmount(billData) {
  var bill = 0;
  billData.forEach((e) => {
    bill = bill + e.productPrice * e.productQuantity;
  });
  $("#billAmmount").html("<b>Your Bill Amount = $" + bill + "</b>");
}
function deleteRow(delId) {
  var t = 0;
  productCart.forEach((e) => {
    if (productCart[t].productId == delId) {
      if (
        confirm("Are you Sure you Want to delete product form cart") == true
      ) {
        productCart.splice(t, 1);
      }
    }
    t++;
    displayCart(productCart);
    billAmount(productCart);
  });
}
