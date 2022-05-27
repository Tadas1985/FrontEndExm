let login = document.querySelector("#submit");
const fname = document.querySelector("#fname");
const lName = document.querySelector("#lname");
const message = document.querySelector("#message");
login.addEventListener("submit", (event) => {
  event.preventDefault();
  CheckUser();
});

function CheckUser() {
  fetch("https://testapi.io/api/Tadas/resource/exam")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((result) => {
      console.log(result);
      let isUserExist = result.data.filter((element) => {
        return element.name === fname.value && element.lastName === lName.value;
      });
      console.log(isUserExist);
      if (isUserExist.length > 0) {
        localStorage.setItem("userToDo", `${fname.value}  ${lName.value}`);
      } else {
        setTimeout(() => {
          message.style.display = "none";
        }, 2000);
      }
    });
}
