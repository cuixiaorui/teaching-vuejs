import axios from "./axios.js";
// export default function upload(previewImg) {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open("post", "/upload");
//     const formData = new FormData();
//     formData.append("img", previewImg.getFile());
//     xhr.onload = (e) => {
//       resolve(e.target.response);
//     };

//     xhr.upload.onprogress = (e) => {
//       previewImg.updateProgress(e.loaded, e.total);
//     };

//     xhr.send(formData);
//   });
// }

export default function upload(previewImg) {
  const formData = new FormData();
  formData.append("img", previewImg.getFile());

  return axios.post("/upload", formData, {
    onUploadProgress(e) {
      previewImg.updateProgress(e.loaded, e.total);
    },
  });
}
