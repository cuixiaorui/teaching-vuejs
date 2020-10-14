// 放置所有的关于接口的内容

import http from "../utils/http";

export function fetchLogin({ username, password }) {
  return http.post("/login", {
    username,
    password
  });
}

export function fetchPhotos(p) {
  return http.get("/getPhotos", {
    params: {
      p
    }
  });
}

// 上传图片接口
export function fetchUpload(file, uploadProgress) {
  const formData = new FormData();
  formData.append("img", file);

  return http.post("/upload", formData, {
    onUploadProgress(e) {
      uploadProgress(e.loaded, e.total);
    }
  });
}

export function fetchPhotoById(pId) {
  return http.get("/getPhoto", {
    params: {
      pId
    }
  });
}
