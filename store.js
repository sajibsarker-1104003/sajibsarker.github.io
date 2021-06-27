//Checking ReadyState//
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready();
}
//Define ready Function//
function ready() {
  var removeCartItemButtons = document.getElementsByClassName('btn-danger');//Create a Class btn-danger in removeCartItemButtons variables//
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem);//Click In Work To removeCartItemButtons//
  }

  var quantityInputs = document.getElementsByClassName('cart-quantity-input');//Create a Class cart-quantity-input in quantityInputs Variables//
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);//Click In Work To quantityChanged//
  }

  var addToCartButtons = document.getElementsByClassName('shop-item-button');//Create a Class shop-item-button in addToCartButtons Variables//
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener('click', addToCartClicked);//Click In Work To addToCartClicked//
  }

  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);//Click To Work In Purchase Button in purchaseClicked function//
}
//Defining purchaseClicked Function//
function purchaseClicked() {
  alert('Thank you for your purchase');//After Purchasing This Alert Will Show//
  var cartItems = document.getElementsByClassName('cart-items')[0];//Store cart-item Class Value In cartItems Variables// 
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);//Remove CartItems //
  }
  updateCartTotal();//Call To updateCartTotal Function//
}
//Define removeCartItem Function//
function removeCartItem(e) {
  var buttonClicked = e.target;//Event Occured//
  buttonClicked.parentElement.parentElement.remove();//Remove Elements Of Current Items Of Parents Parent Child//
  updateCartTotal();//Again Call To updateCartTotal Function//
}
//Define quantityChanged Function//
function quantityChanged(e) {
  var input = e.target;
  //Checking Input Value Is Not a Number or Less Than Zero//
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();//Again Call To updateCartTotal Function//
}
//Define addToCartClicked Function//
function addToCartClicked(e) {
  var button = e.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;//shop-item-title Class Stored In title Variable//
  var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;//shop-item-price Class Stored In price Variable//
  var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;//shop-item-image Class Stored In imageSrc Variable//
  addItemToCart(title, price, imageSrc);//Passing Three Variables as Attribute in addItemToCart Function//
  updateCartTotal();//Again Call To updateCartTotal Function//
}
//Define addItemToCart Function//
function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement('div');//Create Element div in cartRow Variable//
  cartRow.classList.add('cart-row');//Adding cart-row Class In cartRow//
  var cartItems = document.getElementsByClassName('cart-items')[0];//Calling First Item in cart-item Class In cartItems Variable//
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title');// cart-item-title Class In cartItemNames Variable//
  for (var i = 0; i < cartItemNames.length; i++) {
    //Checking If Same Title Will Exist // 
    if (cartItemNames[i].innerText == title) {
      alert('This item is already added to the cart');//Warning In Alert Box//
      return;
    }
  }
  //Creating Output Part For Adding Cart//
  var cartRowContents = `
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
          <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value="1">
          <button class="btn btn-danger" type="button">REMOVE</button>
      </div>`
  cartRow.innerHTML = cartRowContents;//cartRow HTML Value Store In cartRowContents //
  cartItems.append(cartRow);//cartRow Will Append In cartItems//
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);//Click To Occur removeCartItem Function//
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);//Click To Change To Occur quantityChanged Function//
}
//Define updateCartTotal Function//
function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0];//Calling cart-items In cartItemContainer Variables//
  var cartRows = cartItemContainer.getElementsByClassName('cart-row');//Calling cart-row Class in cartRows Variables//
  var total = 0;//Initial Value Define//
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName('cart-price')[0];//Calling cart-price Class In priceElement Variables//
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];//Calling cart-quantity-input Class In quantityElement Variables//
    var price = parseFloat(priceElement.innerText.replace('$', ''));//Convert Floating Point And Replace To Seen In As $2//
    var quantity = quantityElement.value;//Input By quantityElements Value//
    total = total + (price * quantity);//Total Price//
  }
 total = Math.round(total * 100) / 100;
  document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;//Storing This Output In cart-price-total Class//
}
