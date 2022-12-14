import { service } from "aidbox-react/lib/services/service";

import config from "./config";
import { RemoteDataResult } from "aidbox-react/lib/libs/remoteData";
import { User } from "../types/aidbox";

export interface OAuthState {
  nextUrl?: string;
}

export function parseOAuthState(state?: string): OAuthState {
  try {
    return state ? JSON.parse(atob(state)) : {};
  } catch {}

  return {};
}

export function formatOAuthState(state: OAuthState) {
  return btoa(JSON.stringify(state));
}

export function getAuthorizeUrl(state?: OAuthState) {
  const stateStr = state ? `&state=${formatOAuthState(state)}` : "";

  return `${config.baseURL}/auth/authorize?client_id=${config.clientId}&response_type=token${stateStr}`;
}

export function getToken() {
  return window.localStorage.getItem("token") || undefined;
}

export function setToken(token: string) {
  window.localStorage.setItem("token", token);
}

export function removeToken() {
  window.localStorage.removeItem("token");
}

export function logout() {
  return service({
    method: "DELETE",
    url: "/Session",
  });
}

export function getUserInfo() {
  return service<User>({
    method: "GET",
    url: "/auth/userinfo",
  });
}

export function getSessionid() {
  return sessionStorage.getItem("sessionId") || undefined;
}

export interface SigninBody {
  email: string;
  password: string;
}

export function signin(data: SigninBody): Promise<RemoteDataResult> {
  return service({
    url: "/auth/token",
    method: "POST",
    data: {
      username: data.email,
      password: data.password,
      client_id: "SPA",
      grant_type: "password",
    },
  });
}
