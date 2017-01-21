function fetch(method, url, onload) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);

    xhr.onload = (event) => {
      if (xhr.status === 200) {
        onload(xhr);
        resolve(xhr);
      } else {
        reject(xhr);
      }
    };

    xhr.onerror = (event) => {
      reject(xhr);
    }

    xhr.send();
  });
}
