import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React, {useEffect} from "react"
import {Router} from "next/router";
import {useRouter} from "next/navigation";

export default function App({ Component, pageProps,router }: AppProps) {
  const routing = useRouter()
  useEffect(()=>{
     // const token = localStorage.getItem("token")
  //  if(!token) routing.push("/auth/login")
  },[])

  return(
      <Component {...pageProps} />
  )
}
