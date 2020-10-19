const init = () => {
  var firebaseConfig = {
    apiKey: "AIzaSyBUw1Q0Oun7Rgj_dl4Z-2HutTwEmK97XTw",
    authDomain: "chat-app-ee95a.firebaseapp.com",
    databaseURL: "https://chat-app-ee95a.firebaseio.com",
    projectId: "chat-app-ee95a",
    storageBucket: "chat-app-ee95a.appspot.com",
    messagingSenderId: "335408789197",
    appId: "1:335408789197:web:deca18eab4463f4ab21b84",
    measurementId: "G-76GX5PPM8D"
  };

  firebase.initializeApp(firebaseConfig);
  console.log((firebase.app().name));
  firebase.auth().onAuthStateChanged((res) => {
    console.log(res);
    if (res) {
      if (res.emailVerified) {
        model.currentUser = {
          displayName: res.displayName,
          email: res.email
        }
        view.setActiveScreen('chatPage')
  
      }
      else{
        view.setActiveScreen('registerPage')
        alert('Please verify email')
      }
      }
      else{
        view.setActiveScreen('registerPage')
      }
    }

  

  )}   // view.setActiveScreen('registerPage')
  // firestoreQueries()
  


window.onload = init

// firestoreQueries = async () => {
  // get one document
  
  // const response = await firebase.firestore().collection("users").doc("v5PFxAZlKzGUMqwYxvbz").get()
  // const user = getDataFromDoc(response)
  // console.log(user);
  // get many document
  // const response = await firebase.firestore().collection("users").where("address", "==", "Ha Noi").get()
  // const users = getDataFromDocs(response.docs)

  // console.log(users);
  // update document
  // const dataToUpdate = {
  //   name: "cde",
  //   address: "HN",
  //   phones: firebase.firestore.FieldValue.arrayUnion("0123123")
  // }
  // const docID = "HZWvyZ7cPpgXgBeQwxQn"
  // firebase.firestore().collection("users").doc(docID).update(dataToUpdate)

  // delete document
  // const docId = "HZWvyZ7cPpgXgBeQwxQn"
  // firebase.firestore().collection("users").doc(docId).delete()
  // add new document
//   const dataToAdd = {
//     name : "abc" ,
//     age : 12
//   }
//   firebase.firestore().collection("users").add(dataToAdd)
// }
getDataFromDoc = (res) => {
  const data = res.data()
  data.id = res.id
  return data
}
getDataFromDocs = (docs) => {
  const arr = []
  for (const oneDoc of docs){
    arr.push(getDataFromDoc(oneDoc));
  }
  return arr;
}