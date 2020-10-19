const model = {}
model.currentUser = {}
model.conversations = []
model.currentConversation = {}
model.register = async ({firstName, lastName, email, password}) => {
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        
    // update profile
        firebase.auth().currentUser.updateProfile({
            displayName: firstName + ' ' + lastName
        
        })
    // verrify email
        firebase.auth().currentUser.sendEmailVerification()
        alert('Register success! Please confirm your email')
        view.setActiveScreen('loginPage')
    }
    catch(err){
        console.log(err);
        alert(err.message)
    }
}

model.login = async ({email, password}) =>{
    try {
        const response = await firebase.auth().signInWithEmailAndPassword(email, password)
    }
    catch(err) {
        console.log(err);
        alert(err.message)
    }
}
model.addMessage = (message) => {
    const docId = "bSrD6c7ze9B3DiVdDUEb"

    const dataToUpdate = {
        listmessage: firebase.firestore.FieldValue.arrayUnion(message)
    }
    firebase.firestore().collection("conversations").doc(docId).update(dataToUpdate)
}
model.getConversations = async () => {
    const response = await firebase.firestore().collection("conversations").where('users','array-contains',model.currentUser.email).get();
    // console.log(response.docs);
    console.log(getDataFromDocs(response.docs));
    model.conversations = getDataFromDocs(response.docs)
    if (model.conversations.length > 0) {
        model.currentConversation = model.conversations[0]
        view.showCurrentConversation()
    }
} 
model.listenConversationsChange = () =>{
    let isFirstRun = true
    firebase.firestore().collection('conversations').where('users','array-contains',model.currentUser.email).onSnapshot((snapshot) =>{
        if(isFirstRun){
            isFirstRun = false
            return
        }
        const docChanges = snapshot.docChanges()
        for (const oneChange of docChanges){
            if(oneChange.type === 'modified'){
                const dataChange = getDataFromDoc(oneChange.doc)
                for(let i = 0; i < model.conversations.length; i++){
                    model.conversations[i] = dataChange
                } 
                if (dataChange.id === model.currentConversation.id){
                model.currentConversation = dataChange
                // view.showCurrentConversation()
                const position = model.currentConversation.listmessage.length -1
                view.addMessage(model.currentConversation.listmessage[position])
                }
            }

                // console.log(getDataFromDoc(oneChange.doc));
        }
    })
}