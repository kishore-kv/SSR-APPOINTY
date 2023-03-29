import axios from "axios";

const getHeaders = () => {
  return {
    Authorization: "Bearer" + " " + sessionStorage.getItem("token"),
  };
};

export const request = async (url) => {
  try {
    const data = await axios["get"](url);
    if (!data) {
      throw Error("Empty data from get settings");
    }
    return data;
  } catch (error) {
    return error;
  }
};

export const requestPdf = async (url) => {
  try {
    const data = await axios.get(`${REACT_APP_BASE_URL}/${url}`, {
      responseType: "arraybuffer",
    });
    if (!data) {
      throw Error("Empty data from get settings");
    }
    return data;
  } catch (error) {
    return error;
  }
};

export const requestPost = async (url, formData = {}, method = "post") => {
  try {
    const data = await axios[method](url, formData, {
      headers: getHeaders(),
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const loginRequest = async (data, header) => {
  try {
    return await axios.post(
      `${REACT_APP_BASE_URL}/global-config/config-ui-login`,
      data
    );
  } catch (error) {
    return error;
  }
};

export const configRequest = async (url, action, formData) => {
  try {
    const data = await axios[action](
      `${REACT_APP_BASE_URL}/${url} `,
      formData,
      {
        headers: getHeaders(),
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const requestDelete = async (url, action) => {
  try {
    const data = await axios[action](`${REACT_APP_BASE_URL}/${url} `, {
      headers: getHeaders(),
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const createRequest = async (url, action, formData, id) => {
  const idString = id ? `/${id}` : "";
  try {
    const data = await axios[action](
      `${REACT_APP_BASE_URL}/${url}${idString} `,
      formData,
      {
        headers: getHeaders(),
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};
