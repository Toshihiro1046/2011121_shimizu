
var favoriteList = {};

function registerFavorite() {
  var name = prompt('お気に入りの名前を入力してください。','お気に入り');
  if (name && name != '') {
    var condition = getCondition();
 
    favoriteList[name] = condition;
    savaConditionList();
    setFavoriteList();
    alert('お気に入りを保存しました。:' + name);
  }
}
 


function getCondition() {
  var condition = {};
 
  condition.title = $('#title').val();
  condition.Name = $('#Name').val();
  condition.Director = $('#Director').val();
  condition.Music = $('#Music').val();
  condition.evaluation = $('#searchConditionForm input[name="evaluation"]:radio:checked').val();
  condition.Date = $('#Date').val();
  condition.movieType = $('#movieType').val();
 
  return condition;
}
 

function setCondition() {
  var Name = $('#favoriteList').val();
  if(Name) {
    var condition = favoriteList[Name];
    if(condition) {
      $('#title').val(condition.title);
      $('#Name').val(condition.Name);
      $('#Director').val(condition.Director);
      $('#Music').val(condition.Music);
      $('#searchConditionForm input[name="evaluation"]').val([condition.evaluation]);
      $('#Date').val(condition.Date);
      $('#movieType').val(condition.movieType);
    }
  }
}
 

function removeFavorite() {
  var Name = $('#favoriteList').val();
  if(Name) {
    if(confirm('お気に入りを削除します。:' + Name)) {
      delete favoriteList[Name];
      setFavoriteList();
 
      if(existFavorite()) {
        savaConditionList();
      } else {
        localStorage.removeItem('favName');
      }
    }
  }
}
 


 

function savaConditionList() {
  localStorage.setItem('favoriteList', JSON.stringify(favoriteList));
}
 

function setFavoriteList() {
  $('#favoriteList').empty();
  for (var name in favoriteList) {
    $('#favoriteList').append('<option value="' + name + '">' + name + '</option>');
  }
}
 
$(function() {

  if(!localStorage) {
    alert('ローカルストレージが使えません。');
  }
 

  var favoriteStr = localStorage.getItem('favConditionList');
  if(favoriteStr){
    favoriteList = JSON.parse(favoriteStr);
    setFavoriteList();
  }
 

  $('#favBtn').on('click', registerFavorite);
  $('#useBtn').on('click', setCondition);
  $('#deleteBtn').on('click', removeFavorite);            
      
       
});

