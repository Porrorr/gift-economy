'use strict';

var setup = function() {
  var deleteGift = document.getElementById('delete-gift');
  if (deleteGift) {
    deleteGift.addEventListener('click', function() {
      var oReq = new XMLHttpRequest();
      oReq.addEventListener('load', function(response) {
        window.location.assign('/gifts');
      })
      oReq.open("DELETE", "");
      oReq.send();
    })
  }
}

window.addEventListener('load', setup, true);
