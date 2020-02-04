function displayDiv(id) {
  document.getElementById(id).style.display = 'block';
}

function hideDiv(id) {
  document.getElementById(id).style.display = 'none';
}

function toggleDiv(id, display = 'block') {
  var div = document.getElementById(id);

  div.style.display = div.style.display == 'none' ? display : 'none';
}

function toggleDivVis(id) {
  var div = document.getElementById(id);
  const vis = div.style.visibility;
  if (!vis || vis === 'hidden') div.style.visibility = 'visible';
  else div.style.visibility = 'hidden';
}
