$(document).ready(function () {
  function initializeSlider(modalId) {
    $(modalId).on('shown.bs.modal', function () {
      $(modalId + ' .slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: modalId + ' .slider-nav'
      });

      $(modalId + ' .slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: modalId + ' .slider-for',
        dots: true,
        centerMode: true,
        focusOnSelect: true
      });
    });
  }

  initializeSlider('#myNewzModal');
  initializeSlider('#myEventModal');
  initializeSlider('#myAppealModal');
  initializeSlider('#myVideoModal');
 
});
   

$(document).ready(function () {
  $(".card_body_event").on("click", function (e) {
      e.preventDefault();
      $("#myEventModal").modal("show");
  });
  $(".card_body_Appeal").on("click", function (e) {
      e.preventDefault();
      $("#myAppealModal").modal("show");
  });
  $(".card_body_Newz").on("click", function (e) {
      e.preventDefault();
      $("#myNewzModal").modal("show");
  });
  $(".card_body_Video").on("click", function (e) {
      e.preventDefault();
      $("#myVideoModal").modal("show");
  });
});
