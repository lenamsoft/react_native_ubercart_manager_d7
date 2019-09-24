import React, {  AsyncStorage } from 'react-native';


export function signInWithNameAndPassword(username, password) {

    return new Promise((resolve, reject) => {
        var opts = 'username=' + username + '&password=' + password;
        
        var formBody = [];
        formBody.push("username=" + username);
        formBody.push("password=" + password);

        formBody = formBody.join("&"); 

        fetch("http://d7.lenamsoft.com/app_api/login", {
                method: "POST",
                body: formBody,
                headers: { 'Content-type': 'application/x-www-form-urlencoded' }
            })
            .then((response) => response.json())
            //If response is in json then in success
            .then((responseJson) => {
                //Success 
                let ext = responseJson.token;
                if(ext) {
                    AsyncStorage.setItem('site_token', responseJson.token);
                    return resolve('ok');
                }
                
                console.log(responseJson);
                alert(JSON.stringify(responseJson));
            })
            .catch((error) => {
                //Error 
                console.error(error);
            });

        reject('Wrong Account');
    })


}


export default signInWithNameAndPassword;