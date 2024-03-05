var form = document.getElementById("form");
var url = document.getElementsByClassName("url")[0];
var shortcuts = Array.from(document.getElementsByClassName("shortcut"));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  proxy(url.value);
})

function proxy(target) {
  if (target.startsWith("https://") || target.startsWith("http://")) {
    hideTab(window.location.href + "go/" + btoa(target));
  } else if (target.includes(".")) {
    hideTab(window.location.href + "go/" + btoa("https://" + target));
  } else {
    alert("Errror. Please enter a valid URL");
  }
  
}

function hideTab(url) {
  var win = window.open();
  win.document.body.style.margin = '0';
  win.document.body.style.height = '100vh';
  var iframe = win.document.createElement('iframe');
  var title = win.document.createElement('title');
  var icon = win.document.createElement('link');
  icon.href = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Google_Classroom_Logo.svg/2372px-Google_Classroom_Logo.svg.png";
  title.innerText = "Google Classroom";
  iframe.style.border = 'none';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.margin = '0';
  iframe.src = url;
  win.document.body.appendChild(iframe);
  win.document.head.appendChild(title);
  win.document.appendChild(icon);
}

shortcuts.forEach((element) => {
  var link = element.dataset.shortcut;
  element.onclick = (e) => {
    e.preventDefault();
    proxy(link);
    console.log(i);
  }
})
