let registrationSubmit = document.querySelector("#submit");

registrationSubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  let fname = document.querySelector("#fname").value;
  let lName = document.querySelector("#lname").value;
  let emailAddress = document.querySelector("#email").value;
  fetch("https://testapi.io/api/Tadas/resource/exam", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: fname,
      lastName: lName,
      email: emailAddress,
    }),
  })
    .then((response) => {
      if (response.ok) {
        console.log("ok");
        return response.json();
      } else {
        console.log("not okay");
      }
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  BackToIndex();
});

function BackToIndex() {
  window.location.href = "/LandingPage/Index.html";
}
