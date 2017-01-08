var RN = window.RN || {};
RN.Header = function() {

  function init() {
    window.addEventListener("scroll", checkScrollPosition);
  }

  function checkScrollPosition() {
    var fixed = document.body.scrollTop > 0,
        header = document.querySelector('.header');
    header.classList.toggle('header--fixed', fixed);
    document.body.classList.toggle('shrunk', fixed);
  }

  return {
    init: init
  }

}();