import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../components/common/InputField";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import GoogleSignInButton from "../components/login/GoogleSignInButton";
import AuthForm from "../components/login/AuthForm";

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const { user, setUser } = useUserStore();

  useEffect(() => {
    if (user) {
      navigate("/planner");
    }
  }, [navigate, user]);

  const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await signInWithEmail(data.email, data.password);
    } catch (error) {
      console.error("Error signing in with email:", error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const authUser = result.user;
      setUser({
        uid: authUser.uid,
        name: authUser.displayName,
        email: authUser.email,
        photo: authUser.photoURL,
      });
      navigate("/planner");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      let authUser;
      if (isSignUp) {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        authUser = result.user;
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password);
        authUser = result.user;
      }
      setUser({
        uid: authUser.uid,
        name: authUser.displayName,
        email: authUser.email,
        photo: authUser.photoURL,
      });
      navigate("/planner");
    } catch (error) {
      console.error("Error signing in with email:", error);
    }
  };

  return (
    <div>
      <section className="bg-white flex flex-col">
        <div className="flex justify-center items-center flex-grow py-12">
          <div className="border rounded-md p-8 w-full max-w-md shadow-sm">
            <h2 className="text-2xl font-bold mb-6">
              {isSignUp ? "Sign Up" : "Login"}
            </h2>
            <AuthForm
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              register={register}
              errors={errors}
              isSignUp={isSignUp}
              setIsSignUp={setIsSignUp}
            />
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">Or</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>
            <GoogleSignInButton onClick={signInWithGoogle} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;