const params = new URLSearchParams(window.location.search);

const productId = Number(params.get("id"));

const product = products.find(p => p.id === productId);


/* PRODUCT NOT FOUND */

if (!product) {

  document.querySelector(".product-detail").innerHTML = `
    <div>
      <h1>Product not found</h1>
      <p>This product could not be found.</p>
      <a href="jewellery.html">Back to Jewellery</a>
    </div>
  `;

} else {


  /* PRODUCT IMAGE */

  const imageHTML = jewelSvg(product.id);

  const imageContainer = document.getElementById("productImage");

  /*
    jewelSvg() returns an IMG or SVG.
    We extract the actual image source when possible.
  */

  const temp = document.createElement("div");

  temp.innerHTML = imageHTML;

  const generatedImage = temp.querySelector("img");


  if (generatedImage) {

    imageContainer.src = generatedImage.src;

    imageContainer.alt = product.name;

  } else {

    /*
      For products that currently use SVG placeholders,
      use the same SVG directly inside the zoom container.
    */

    document.getElementById("productZoom").innerHTML = imageHTML;

    const svg = document.querySelector("#productZoom svg");

    if (svg) {
      svg.style.width = "100%";
      svg.style.height = "100%";
    }

  }


  /* PRODUCT INFORMATION */

  document.getElementById("productName").textContent =
    product.name;

  document.getElementById("productCategory").textContent =
    product.cat.charAt(0).toUpperCase() + product.cat.slice(1);

  document.getElementById("productPrice").innerHTML =
    priceLabel();

  document.getElementById("productWeight").textContent = getWeight(product);


  /* DESCRIPTION */

  document.getElementById("productDescription").textContent =
    "A beautifully crafted piece from the Jamil Jewellers collection. Designed with timeless elegance and attention to detail. Please contact us for material, weight, stone details and current availability.";


  /* PAGE TITLE */

  document.title =
    product.name + " — Jamil Jewellers";


  /* ADD TO CART */

  document.getElementById("addProductBtn").onclick = function () {

    addToCart(product.id);

  };

}


/* AMAZON-STYLE IMAGE ZOOM */

const zoomBox = document.getElementById("productZoom");
const zoomImage = document.getElementById("productImage");


if (zoomBox) {

  zoomBox.addEventListener("mousemove", function (e) {

    if (!zoomImage || !zoomImage.src) return;

    const rect = zoomBox.getBoundingClientRect();

    const x =
      ((e.clientX - rect.left) / rect.width) * 100;

    const y =
      ((e.clientY - rect.top) / rect.height) * 100;


    zoomImage.style.transformOrigin =
      `${x}% ${y}%`;

    zoomImage.style.transform =
      "scale(2.5)";

  });


  zoomBox.addEventListener("mouseleave", function () {

    if (!zoomImage) return;

    zoomImage.style.transformOrigin =
      "center center";

    zoomImage.style.transform =
      "scale(1)";

  });

}