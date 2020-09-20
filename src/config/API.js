import axios from 'axios';

// axios.defaults.withCredentials = false;

// axios.get('https://jsonapi.test/sanctum/csrf-cookie', {withCredentials: true});

export default axios.create({
    baseURL: `https://backendexample.sanbersy.com/api`,
    // headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'X-Requested-With': 'XMLHttpRequest',
    //     'Content-Type': 'application/x-www-form-urlencoded'
    // },
    // xsrfCookieName: 'XSRF-TOKEN'
});

// export default axios.create({
//     baseURL: `https://hilmanhabibi.my.id`
// });