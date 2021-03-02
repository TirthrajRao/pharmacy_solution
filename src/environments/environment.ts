// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    // apiKey: "AIzaSyBf8zuQkI0tG3KChp1pKPpbEnV85YIZzss",
    // authDomain: "your-pharmacy.firebaseapp.com",
    // databaseURL: "https://your-pharmacy.firebaseio.com",
    // projectId: "your-pharmacy",
    // storageBucket: "your-pharmacy.appspot.com",
    // messagingSenderId: "500969976375",
    // appId: "1:500969976375:web:7591d205133115ebdf85b2",
    // measurementId: "G-2RKKJ2YFK8",

    apiKey: "AIzaSyBmDSSZpvlty51OkEc3cae9t6V3UQJ9hsU",
    authDomain: "pharmacy-solution.firebaseapp.com",
    // databaseURL: "https://pharmacy-solution.firebaseio.com",
    databaseURL: "https://pharmacy-solution-default-rtdb.firebaseio.com",
    
    projectId: "pharmacy-solution",
    storageBucket: "pharmacy-solution.appspot.com",
    messagingSenderId: "619338378765",
    appId: "1:619338378765:web:4525585aedc53f88d72f44",
    measurementId: "G-ZJSBPBC51X"
  }

  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
