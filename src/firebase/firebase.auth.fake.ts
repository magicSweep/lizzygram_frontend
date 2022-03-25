import wait from "waait";

class Observer {
  private subscribers: Set<any> = new Set();

  subscribe = (f: any) => {
    console.log("------SUBSCRIBE", this.subscribers);

    this.subscribers.add(f);

    return () => this.subscribers.delete(f);
  };

  notify = (val: any) => {
    console.log("------NOTIFY", val, this.subscribers);
    this.subscribers.forEach((f) => f(val));
  };
}

let observer = new Observer();

export const login = async () => {
  await wait(2000);

  setTimeout(() => {
    observer.notify({
      displayName: "Yallopukka",
      email: "ya@frog.pog",
      uid: "jkFrANbtA4bBEjFsvWWbSOPdt56yt",
    });
  }, 1000);

  return true;
};

export const logout = async () => {
  await wait(2000);

  setTimeout(() => {
    observer.notify(undefined);
  }, 1000);

  return true;
};

export const subscribe = (
  onUserStatusChanged: (user: any) => void,
  onError: (err: any) => void
) => {
  setTimeout(() => {
    observer.notify(undefined);
  }, 2000);

  return observer.subscribe(onUserStatusChanged);
  //firebase.auth().onAuthStateChanged(onUserStatusChanged, onError);
};
