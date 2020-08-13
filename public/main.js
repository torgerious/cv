let myLinks = document.querySelectorAll('a');

for (let link of myLinks) {
  link.setAttribute('target', '_blank');
}