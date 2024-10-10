"use client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setInLocalStorage = (key: string, value: any) => {
  return localStorage.setItem(key, JSON.stringify(value));
};
