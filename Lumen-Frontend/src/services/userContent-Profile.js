import axiosApi from "./refreshToken";

export const getProfile = () => {
  return axiosApi.get("/user/profile");
};

export const editProfile = async (payload) => {
  const result = await axiosApi.put("/user/editprofile", payload);
  return result;
};

export const updatePassword = async (payload) => {
  const response = await axiosApi.put("/user/changepassword", payload);
  return response.data;
};

export const updateProfilePicture = async (payload) => {
  const response = await axiosApi.put("/user/change-profile-picture", payload);
  return response.data;
};

export const deleteAccount = async () => {
  const response = await axiosApi.delete("/user/deleteAccount");
  return response.data;
};
//content

export const UploadImageToLumen = async (payload) => {
  const response = await axiosApi.post("/user/upload-new", payload);
  return response;
};

export const deleteImage = async (img_id) => {
  const response = await axiosApi.delete(`/user/uploads/${img_id}/delete`);
  return response.data;
};

export const find_specific_img = async (img_id) => {
  const response = await axiosApi.get(`/user/uploads/${img_id}`);
  return response;
};

export const updateImage = async (img_id, payload) => {
  const response = await axiosApi.put(
    `/user/uploads/${img_id}/update`,
    payload,
  );
  return response.data;
};

export const GetAllImagesByUser = async () => {
  const response = await axiosApi.get(`/user/uploads`);
  return response.data;
};
