let registrationSubmit = document.querySelector("#submitBtn");

registrationSubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  const fname = document.querySelector("#fname");
  const lName = document.querySelector("#lname");
  const emailAddress = document.querySelector("#email");
  fetch("https://testapi.io/api/Tadas/resource/exam", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: fname.value,
      lastName: lName.value,
      email: emailAddress.value,
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
  //BackToIndex();
});

// function BackToIndex() {
//   window.location.href = "/LandingPage/Index.html";
//}
