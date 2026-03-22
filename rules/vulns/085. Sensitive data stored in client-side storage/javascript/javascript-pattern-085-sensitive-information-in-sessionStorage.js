// ruleid: javascript-pattern-085-sensitive-information-in-sessionStorage
const token = sessionStorage.getItem(SESSION_STORAGEL_TOKEN);

export class foo {
  // ruleid: javascript-pattern-085-sensitive-information-in-sessionStorage
  updateToken = (accessToken) =>
    sessionStorage.setItem(SESSION_STORAGEL_TOKEN, accessToken);
}