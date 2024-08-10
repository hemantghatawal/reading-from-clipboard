let $log = document.querySelector("#log");
document.querySelector("#readCB").addEventListener("click", async () => {
  let contents = await navigator.clipboard.read();

  for (let item of contents) {
    console.log("Types for this item: ", item.types);

    if (item.types.includes("text/html")) {
      let blob = await item.getType("text/html");
      let html = await blob.text();
      console.log(html);
      $log.innerHTML += html.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
      $log.innerHTML += "<hr>";
    }

    if (item.types.includes("text/plain")) {
      let blob = await item.getType("text/plain");
      let text = await blob.text();
      console.log(text);
      $log.innerHTML += text.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
      $log.innerHTML += "<hr>";
    }

    if (item.types.includes("image/png")) {
      // modified from MDN sample
      const pngImage = new Image();
      pngImage.alt = "PNG image from clipboard";
      const blob = await item.getType("image/png");
      pngImage.src = URL.createObjectURL(blob);
      $log.appendChild(pngImage);
    }
  }
});
