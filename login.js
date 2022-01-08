// Firebase den alınan veriler
var firebaseConfig = {
    apiKey: "AIzaSyAunBt08giONjPHVD164JqE9vzcArj4BDg",
  authDomain: "web-lo.firebaseapp.com",
  databaseURL: "https://web-lo-default-rtdb.firebaseio.com",
  projectId: "web-lo",
  storageBucket: "web-lo.appspot.com",
  messagingSenderId: "87287137505",
  appId: "1:87287137505:web:dba2483f7356c18796a3a0",
  measurementId: "G-S141HC9MRT"
  };
 
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth()
  const database = firebase.database()
  
  function register () {
   
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value


    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false)  {
      alert('Email ya da Password HATALI!')
      return
    }
    if (validate_field(full_name) == false){
      alert('Hata!')
      return
    }
   
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {

      var user = auth.currentUser
  
      // Realtime database e ekleme yap
      var database_ref = database.ref()
  
      // data oluşturma
      var user_data = {
        email : email,
        full_name : full_name,
        last_login : Date.now()
      }
  
      // Firebase e atma
      database_ref.child('users/' + user.uid).set(user_data)
  

      alert('Başarılı! Kullanıcı Oluşturuldu')
    })
    .catch(function(error) {

      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }

  function login () {

    email = document.getElementById('email').value
    password = document.getElementById('password').value
  

    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email ya da Password HATALI!')
      return

    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      var user = auth.currentUser
  
      var database_ref = database.ref()
  
      var user_data = {
        last_login : Date.now()
      }
  
      database_ref.child('users/' + user.uid).update(user_data)
  
      alert('Hoşgeldiniz !')
  
    })
    .catch(function(error) {
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  
  
  
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      return true
    } else {
      return false
    }
  }
  
  function validate_password(password) {
    // 6 karakterden fazla girdi
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }