import { initializeApp as ia } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { GoogleAuthProvider, getAuth as a, signInWithPopup as sp, signOut as so } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

export function initializeApp(apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId) {
  ia({
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId
  });
}

export async function signInWithPopup(scopes) {
  const auth = a();
  const provider = new GoogleAuthProvider();
  for (const scope of scopes) {
    provider.addScope(scope);
  }

  try {
    const res = await sp(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(res);
    const access_token = credential?.accessToken;
    const id_token = await auth.currentUser.getIdToken(true);

    return  JSON.stringify({
      id_token,
      access_token,
    });
  }
  catch (e) {
    return  JSON.stringify({
      id_token: "",
      access_token: "",
    });
  }
}

export function signOut(auth) {
  if (auth.currentUser) {
    signOut(auth);
  }
}
