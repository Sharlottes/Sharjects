export const copy = (text: string) =>
  new Promise((resolve, reject) => {
    const type = "text/plain";
    navigator.permissions
      .query({ name: "clipboard-write" } as any)
      .then((permission) => {
        if (permission.state === "granted" || permission.state === "prompt") {
          navigator.clipboard
            .write([new ClipboardItem({ [type]: new Blob([text], { type }) })])
            .then(resolve, reject)
            .catch(reject);
        } else {
          reject(new Error("Permission not granted!"));
        }
      });
  });
