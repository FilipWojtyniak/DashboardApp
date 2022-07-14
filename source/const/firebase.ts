import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDlLDUigpmmM0zJsif2Ih62KbDoQYOViyg",
    authDomain: "restaurantapp-627f5.firebaseapp.com",
    projectId: "restaurantapp-627f5",
    storageBucket: "restaurantapp-627f5.appspot.com",
    messagingSenderId: "23737157544",
    appId: "1:23737157544:web:ec1bd4b3a50dbae7117f9d"
  };
  
  let app;
  if(firebase.apps.length ===0){
      app = firebase.initializeApp(firebaseConfig);
  }else{
      app = firebase.app();
  }
  
  const auth = firebase.auth()
  
  export {auth};