import Firebase from 'firebase'
let database = new Firebase('https://luminous-torch-2948.firebaseio.com/');

Firebase.enableLogging(true)

export {database}
