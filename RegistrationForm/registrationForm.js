let registrationSubmit = document.querySelector("#submit");
const fname = document.querySelector("#fname");
const lName = document.querySelector("#lname");
const emailAddress = document.querySelector("#email");
registrationSubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  getToDo();
});

function RegisterUser() {
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
      fname.value = "";
      lName.value = "";
      emailAddress.value = "";
    })
    .catch((err) => {
      console.log(err);
    });
}

function getToDo() {
  fetch("https://testapi.io/api/Tadas/resource/exam")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((result) => {
      if (
        !result.data.name === fname.value ||
        !result.data.lastName === lName.value
      ) {
        RegisterUser();
      } else {
        console.log("parasyk pop upa kad useris jau yra");
        // parasyk pop upa kad useris jau yra
      }
    });
}
