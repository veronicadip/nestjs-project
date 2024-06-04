import { Injectable } from "@nestjs/common";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, FacebookAuthProvider, createUserWithEmailAndPassword, signOut, UserInfo } from 'firebase/auth';


@Injectable({})
export class AuthService {


    signup() {
        return { msg: "I have signed up" }
    }
}