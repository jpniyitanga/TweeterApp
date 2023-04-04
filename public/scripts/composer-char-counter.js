$(document).ready(function () {
  $(".textarea").on("input", function (event) {
    $text = $(this).val();
    $charactersLeft = 140 - $text.length;

    $counter = $(this).closest("form").find(".counter");
    $counter.text($charactersLeft);

    if ($charactersLeft < 0) {
      $counter.addClass("redFont");
    } else {
      $counter.removeClass("redFont");
    }
  });
});
