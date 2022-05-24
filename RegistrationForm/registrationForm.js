// fetch("https://testapi.io/api/Tadas/resource/exam")
//   .then((Response) => {
//     if (Response.ok) {
//       console.log("ok");
//       return Response.json();
//     } else {
//       console.log("not okay");
//     }
//   })
//   .then((result) => {
//     console.log(result.data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//const { result } = require("cypress/types/lodash");

// fetch("https://testapi.io/api/Tadas/resource/exam", {
//   method: "POST",
//   headers: {
//     "Content-type": "application/json",
//   },
//   body: JSON.stringify({
//     name: "TestName",
//     lastName: "TestLastName",
//     email: "testEmail",
//   }),
// })
//   .then((Response) => {
//     if (Response.ok) {
//       console.log("ok");
//       return Response.json();
//     } else {
//       console.log("not okay");
//     }
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

fetch("https://testapi.io/api/Tadas/resource/exam")
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((result) => console.log(result.data));
