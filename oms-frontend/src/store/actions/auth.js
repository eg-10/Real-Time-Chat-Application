import axios from "axios";
import * as actionTypes from "./actionTypes";
import { HOST_URL } from "../../settings";

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (username, token) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
		username: username
	};
};

export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	};
};

export const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("username");
	localStorage.removeItem("expirationDate");
	return {
		type: actionTypes.AUTH_LOGOUT
	};
};

export const checkAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const authLogin = (username, password) => {
	return dispatch => {
		dispatch(authStart());
		axios
			.post(`${HOST_URL}/api/auth/login/`, {
				username: username,
				password: password
			})
			.then(res => {
				const token = res.data.token;
				const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
				localStorage.setItem("token", token);
				localStorage.setItem("username", username);
				localStorage.setItem("expirationDate", expirationDate);
				dispatch(authSuccess(username, token));
				dispatch(checkAuthTimeout(3600));
			})
			.catch(err => {
				dispatch(authFail(err));
			});
	};
};

export const authSignup = (username, password, email, first_name, last_name) => {
	return dispatch => {
		dispatch(authStart());
		axios
			.post(`${HOST_URL}/api/auth/register/`, {
				username: username,
				email: email,
				password: password,
				first_name: first_name,
				last_name: last_name
			})
			.then(res => {
				const token = res.data.token;
				const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
				localStorage.setItem("token", token);
				localStorage.setItem("username", username);
				localStorage.setItem("expirationDate", expirationDate);
				dispatch(authSuccess(username, token));
				dispatch(checkAuthTimeout(3600));
			})
			.catch(err => {
				dispatch(authFail(err));
			});
	};
};

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem("token");
		const username = localStorage.getItem("username");
		if (token === undefined) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem("expirationDate"));
			if (expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				dispatch(authSuccess(username, token));
				dispatch(
					checkAuthTimeout(
						(expirationDate.getTime() - new Date().getTime()) / 1000
					)
				);
			}
		}
	};
};