import axios from "axios";
import * as actionTypes from "./actionTypes";
import { HOST_URL } from "../../settings";
import * as chatActions from "./chat"

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (username, token, customer_id) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
		username: username,
		customer_id: customer_id,
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
}

export const authLogout = (token) => {
	return dispatch => {
		token = 'Token ' + token;
		axios
			.post(`${HOST_URL}/api/auth/logout/`, {}, {
				headers: {
					Authorization: token
				}
			})
			.then(response => {
				console.log("Logged Out Successfully");
				dispatch(logout());
			})
			.catch(err => {
				console.log("Log Out Errors");
			});
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
		axios.post(`${HOST_URL}/api/auth/login/`, {
			username: username,
			password: password
		})
			.then(response => {
				console.log(response.data);
				const token = response.data.token;
				const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
				const customer_id = response.data.user.customer_profile.id;
				localStorage.setItem("token", token);
				localStorage.setItem("username", username);
				localStorage.setItem("expirationDate", expirationDate);
				dispatch(authSuccess(username, token, customer_id));
				dispatch(chatActions.chatsConnectAndInit(
					response.data.user.customer_profile.chats,
					response.data.user.customer_profile.contacts,
					response.data.user.customer_profile.profile_photo,
				));
				dispatch(checkAuthTimeout(3600));
			})
			.catch(err => {
				dispatch(authFail("Invalid Credentials"));
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
			.then(response => {
				console.log(response.data);
				const token = response.data.token;
				const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
				const customer_id = response.data.user.customer_profile.id;
				localStorage.setItem("token", token);
				localStorage.setItem("username", username);
				localStorage.setItem("expirationDate", expirationDate);
				dispatch(authSuccess(username, token, customer_id));
				dispatch(chatActions.chatInit(
					response.data.user.customer_profile.chats,
					response.data.user.customer_profile.contacts
				));
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