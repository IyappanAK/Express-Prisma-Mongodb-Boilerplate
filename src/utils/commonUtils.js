const config = require('../config/config');

const commonUtils = new (function () {
  this.encrypt = (txt, key = config.secretKey) => {
    let encryptedStr = null;
    const str = txt && txt !== undefined ? txt : null;

    if (str) {
      const arr = [];
      const l = key.toString().length;
      for (let i = 0; i < str.length; i += 1) {
        arr.push(str.charCodeAt(i) + key.toString().charCodeAt(i % l));
      }
      const newArr = [];
      for (let i = 0; i < arr.length; i += 1) {
        newArr.push(String.fromCharCode(arr[i]));
      }
      encryptedStr = newArr.join('');
    }
    return encryptedStr;
  };

  // function capitalizeFirstLetter(str) {
  //   if (str) {
  //     // return str.charAt(0).toUpperCase() + str.slice(1);
  //     return str.replace(/\b\w/g, function (txt) {
  //       return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  //     });
  //   }

  //   return str;
  // }

  this.decrypt = (str, key = config.secretKey) => {
    let decryptedStr = null;

    if (str && key) {
      const arr = [];
      const l = key.length;
      for (let i = 0; i < str.length; i += 1) {
        arr.push(str.charCodeAt(i) - key.charCodeAt(i % l));
      }
      const newArr = [];
      for (let i = 0; i < arr.length; i += 1) {
        newArr.push(String.fromCharCode(arr[i]));
      }
      decryptedStr = newArr.join('');
    }
    return decryptedStr;
  };

  this.constructData = (data) => {
    return JSON.parse(
      JSON.stringify(data, (_, v) => (typeof v === 'bigint' ? `${v}n` : v)).replace(/"(-?\d+)n"/g, (_, a) => a)
    );
  };


})();

module.exports = commonUtils;
