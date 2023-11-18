// We don't use the 'alert', because it is easier to mock this function as a module
// and we may want to exchange the implementation later
export function notifyUser(text: string) {
  alert(text);
}
