import { API } from "./config";
import * as authUtil from "./utils/auth.util";
export const BaseURL = API.endpoint + "/";

import axios from 'axios'

const defaultHeaders = {
    isAuth: true,
    AdditionalParams: {},
    isJsonRequest: true,
    api_key: true,
};

export const ApiPostNoAuth = (type, userData) => {
    return (
        new Promise((resolve, reject) => {
            axios
                .post(
                    BaseURL + type,
                    userData,
                    getHttpOptions({ ...defaultHeaders, isAuth: false })
                )
                .then((responseJson) => {
                    resolve(responseJson);
                })
                .catch((error) => {
                    if (
                        error &&
                        error.hasOwnProperty("response") &&
                        error.response &&
                        error.response.hasOwnProperty("data") &&
                        error.response.data &&
                        error.response.data.hasOwnProperty("error") &&
                        error.response.data.error
                    ) {
                        reject(error.response.data.error);
                    } else {
                        reject(error);
                    }
                });
        })
    );
};

export const ApiPutNoAuth = (type, userData) => {
   return new Promise((resolve, reject) => {
        axios
            .put(
                BaseURL + type,
                userData,
                getHttpOptions({ ...defaultHeaders, isAuth: false })
            )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (
                    error &&
                    error.hasOwnProperty("response") &&
                    error.response &&
                    error.response.hasOwnProperty("data") &&
                    error.response.data &&
                    error.response.data.hasOwnProperty("error") &&
                    error.response.data.error
                ) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
};

export const ApiGetNoAuth = (type) => {
    return new Promise((resolve, reject) => {
        axios
            .get(
                BaseURL + type,
                getHttpOptions({ ...defaultHeaders, isAuth: false })
            )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (
                    error &&
                    error.hasOwnProperty("response") &&
                    error.response &&
                    error.response.hasOwnProperty("data") &&
                    error.response.data &&
                    error.response.data.hasOwnProperty("error") &&
                    error.response.data.error
                ) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
};

export const Api = (type, methodtype, userData) => {
    return new Promise((resolve, reject) => {
        userData = userData || {};
        axios({
            url: BaseURL + type,
            headers: getHttpOptions(),
            data: userData,
            type: methodtype,
        })
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (
                    error &&
                    error.hasOwnProperty("response") &&
                    error.response &&
                    error.response.hasOwnProperty("data") &&
                    error.response.data &&
                    error.response.data.hasOwnProperty("error") &&
                    error.response.data.error
                ) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
};

export const ApiGet = (type) => {
    return new Promise((resolve, reject) => {
        axios
            .get(BaseURL + type, getHttpOptions())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (
                    error &&
                    error.hasOwnProperty("response") &&
                    error.response &&
                    error.response.hasOwnProperty("data") &&
                    error.response.data &&
                    error.response.data.hasOwnProperty("error") &&
                    error.response.data.error
                ) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
};

export const ApiPost = (type, userData, AdditionalHeader) => {
    return new Promise((resolve, reject) => {
        axios
            .post(BaseURL + type, userData, {
                ...getHttpOptions(),
                ...AdditionalHeader,
            })
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                console.log("error", error);
                if (
                    error &&
                    error.hasOwnProperty("response") &&
                    error.response &&
                    error.response.hasOwnProperty("data") &&
                    error.response.data &&
                    error.response.data.hasOwnProperty("error") &&
                    error.response.data.error
                ) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
};

export const ApiPut = (type, userData) => {
    return new Promise((resolve, reject) => {
        axios
            .put(BaseURL + type, userData, getHttpOptions())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (
                    error &&
                    error.hasOwnProperty("response") &&
                    error.response &&
                    error.response.hasOwnProperty("data") &&
                    error.response.data &&
                    error.response.data.hasOwnProperty("error") &&
                    error.response.data.error
                ) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
};

export const ApiPatch = (type, userData) => {
    return new Promise((resolve, reject) => {
        axios
            .patch(BaseURL + type, userData, getHttpOptions())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (
                    error &&
                    error.hasOwnProperty("response") &&
                    error.response &&
                    error.response.hasOwnProperty("data") &&
                    error.response.data &&
                    error.response.data.hasOwnProperty("error") &&
                    error.response.data.error
                ) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
};

export const ApiDelete = (type, userData) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(BaseURL + type, getHttpOptions())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (
                    error &&
                    error.hasOwnProperty("response") &&
                    error.response &&
                    error.response.hasOwnProperty("data") &&
                    error.response.data &&
                    error.response.data.hasOwnProperty("error") &&
                    error.response.data.error
                ) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
};

export const ApiDownload = (type, userData) => {
    let method = userData && Object.keys(userData).length > 0 ? "POST" : "GET";
    return new Promise((resolve, reject) => {
        axios({
            url: BaseURL + type,
            method,
            headers: getHttpOptions().headers,
            responseType: "blob",
            data: userData,
        })
            .then((res) => resolve(new Blob([res.data])))
            .catch((error) => {
                if (
                    error &&
                    error.hasOwnProperty("response") &&
                    error.response &&
                    error.response.hasOwnProperty("data") &&
                    error.response.data &&
                    error.response.data.hasOwnProperty("error") &&
                    error.response.data.error
                ) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
};

export const ApiGetBuffer = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "GET",
            mode: "no-cors",
        })
            .then((response) => {
                if (response.ok) {
                    return response.buffer();
                } else {
                    resolve(null);
                }
            })
            .then((buffer) => {
                resolve(buffer);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

export const getHttpOptions = (options = defaultHeaders) => {
    let headers = {};
    // if (options.hasOwnProperty("isAuth") && options.isAuth) {
    //     if (authUtil.getToken()) {
    //         headers["Authorization"] = authUtil.getToken();
    //     }
    // }
    headers["Authorization"] = 'Bearer hjorhudlnvqbarhjtgydqccibgrnbhpxqcdvdvdb'
    headers["X-Api-Key"] = 'HFwEskqv4K4Qo3iEPUaVb5txyNz8Nkf83yBEmRyF'
    return { headers };
};
