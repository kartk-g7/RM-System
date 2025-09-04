// src/components/ProtectedRoute.js
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function ProtectedRoute({ children, role }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().role === role) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } else {
        setAuthorized(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [role]);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (!authorized) return <Navigate to="/" />;

  return children;
}

export default ProtectedRoute;
