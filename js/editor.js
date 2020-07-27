var List = $("#tdlApp ul");
var Mask = "tdl_";
var N_store;

document.addEventListener("keydown", function(e) {
  localStorage.setItem(N_store + "text_in_editor", document.getElementById("editor").innerHTML);
});

function showTasks() {
  document.getElementById("editor").style.display = "none";
  var Storage_size = localStorage.length;
  if (Storage_size > 0) {
    for (var i = 0; i < Storage_size; i++) {
      var key = localStorage.key(i);
      if (key.indexOf(Mask) == 0) {
        N_store = key[4];
        $("<li></li>")
          .addClass("tdItem")
          .attr("data-itemid", key)
          .text(localStorage.getItem(key))
          .appendTo(List);
      }
    }
  }
}

showTasks();

$("#tdlApp input").on("keydown", function(e) {
  if (e.keyCode != 13) return;
  var str = e.target.value;
  e.target.value = "";
  if (str.length > 0) {
    var number_Id = 0;
    List.children().each(function(index, el) {
      var element_Id = $(el)
        .attr("data-itemid")
        .slice(4);
      if (element_Id > number_Id) number_Id = element_Id;
    });
    number_Id++;
    localStorage.setItem(Mask + number_Id, str);
    N_store = number_Id;
    localStorage.setItem(N_store + "text_in_editor", "");
    document.getElementById("editor").innerHTML = "";
    document.getElementById("editor").style.display = "block";
    $("<li></li>")
      .addClass("tdItem")
      .attr("data-itemid", Mask + number_Id)
      .text(str)
      .appendTo(List);
    document.getElementById("h1_name").innerHTML = "Новый документ: " + localStorage.getItem("tdl_" + N_store);
  }
});

$(document).on("click", ".tdItem", function(e) {
  var jet = $(e.target);
  if (event.altKey) {
    localStorage.removeItem(jet.attr("data-itemid"));
    localStorage.removeItem(jet.attr("data-itemid")[4] + "text_in_editor");
    document.getElementById("editor").innerHTML = "";
    document.getElementById("editor").style.display = "none";
    document.getElementById("h1_name").innerHTML = "Текстовый редактор с автосохранением";
    jet.remove();
    return true;
  }
  N_store = jet.attr("data-itemid")[4];
  document.getElementById("editor").style.display = "block";
  document.getElementById("editor").innerHTML = localStorage.getItem(N_store + "text_in_editor");
  document.getElementById("h1_name").innerHTML = "Документ: " + localStorage.getItem("tdl_" + N_store);
});
