import { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col gap-4 p-10">
      <input onChange={(e) => setEmail(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup;