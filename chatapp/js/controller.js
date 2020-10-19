
const controller = {}

controller.register =({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
}) => {
    if(firstName === ''){
        // document.getElementById('first-name-error').innerHTML = 'Please input first name'
        view.setErrorMessage('first-name-error','Please input first name')
    } else{
        view.setErrorMessage('first-name-error','')
    }
    if(lastName === ''){
        view.setErrorMessage('last-name-error','Please input last name')
    } else{
        view.setErrorMessage('last-name-error','')
    }
    if(email === ''){
        view.setErrorMessage('email-error', 'Please input email')
    } else{
        view.setErrorMessage('email-error','')
    }
    if(password === ''){
        view.setErrorMessage('password-error', 'Please input password')
    } else{
        view.setErrorMessage('password-error','')
    }
    if(confirmPassword === ''){
        view.setErrorMessage('confirm-password-error', 'Please input cofirm password')
    } else if(confirmPassword != confirmPassword){
        view.setErrorMessage('confirm-password-error','Please input again')
    }
    else{
        view.setErrorMessage('confirm-password-error','')
        }
    if(lastName != '' && firstName !='' && email != '' && password != '' &&
    confirmPassword != '' && password == confirmPassword ){
        const dataregister = {
            firstName,
            lastName,
            email,
            password
        }
        model.register(dataregister)
    }
}


controller.login =({
    email,
    password
}) => {
    // if(email === ''){
    //     view.setErrorMessage('email-error', 'Please input email')
    // } else{
    //     view.setErrorMessage('email-error','')
    // }
    if(password === ''){
        view.setErrorMessage('password-error', 'Please input password')
    } else{
        view.setErrorMessage('password-error','')
    }
    if(email != '' && password != ''){
        const datalogin = {
            email,
            password
        }
        model.login(datalogin)
    }
}


