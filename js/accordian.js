document.getElementById("checkout-button") &&
  document
    .getElementById("checkout-button")
    .addEventListener("click", (event) => {
      event.preventDefault();

      const getFormData = (id) => {
        const form = document.getElementById(id);
        const formData = {};
        for (let element of form.elements) {
          if (element.name) {
            formData[element.name] = element.value;
          }
        }
        return formData;
      };
      const personalDetails = getFormData("user-contact-form");
      const AddressDetails = getFormData("user-info-form");
      localStorage.setItem(
        "cartDetails",
        JSON.stringify({ personalDetails, AddressDetails })
      );
      window.location.href = "./checkout-summary-shipping.html";
    });

document.getElementById("reviews-button") &&
  document
    .getElementById("reviews-button")
    .addEventListener("click", (event) => {
      event.preventDefault();

      const getFormData = (id) => {
        const form = document.getElementById(id);
        const formData = {};
        for (let element of form.elements) {
          if (element.name && element.checked) {
            formData[element.name] = element.value;
          }
        }
        console.log("Form data:", formData);
        return formData;
      };
      const shippingMethod = getFormData("reviews-container-form");

      // Uncomment to store and navigate to another page
      localStorage.setItem("shippingMethod", JSON.stringify(shippingMethod));
      window.location.href = "./checkout-payment.html";
    });

document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => {
    // Toggle the active class on the clicked header
    header.classList.toggle("active");

    // Toggle the corresponding sectionContent  display
    const sectionContent = header.nextElementSibling;
    if (sectionContent.style.display === "block") {
      sectionContent.style.display = "none";
    } else {
      sectionContent.style.display = "block";
    }
  });
});
const cardDetails = localStorage.getItem("cartDetails");
if (cardDetails) {
  const cardInfo = JSON.parse(cardDetails);
  document.getElementById("reviewOrderEmail").innerHTML =
    cardInfo.personalDetails["first-name"];
  document.getElementById("reviewOrderPhoneNo").innerHTML =
    cardInfo.personalDetails["last-name"];
  document.getElementById("reviewOrderAddress").style = "width:100%";
  document.getElementById("reviewOrderAddress").innerHTML = Object.entries(
    cardInfo.AddressDetails
  )
    .map(([_, details]) => details)
    .join(" ");
}

const shippingMethod = localStorage.getItem("shippingMethod");
if (shippingMethod) {
  const shippingMethodInfo = JSON.parse(shippingMethod);
  document.getElementById("addressPayment").innerHTML =
    shippingMethodInfo["shipping-method"];
}
