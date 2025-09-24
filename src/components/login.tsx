"use client";

// import Link from "next/link";
import React, { useState,useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {medcertusers} from "@/utils/userdata/medcertusers"
const LOCAL_STORAGE_KEY = "dhaUser";


interface LoginProps {
  dict: any;

}

const LoginForm: React.FC<LoginProps> = ({dict}) => {
  const [loginType, setLoginType] = useState<"uae-pass" | "sheryan">(
    "sheryan"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();
  const {lang} = useParams();
  const [welcomeText, setWelcomeText] = useState(""); // Add this state
  const [isClient, setIsClient] = useState(false); // Add this state

  useEffect(() => {
    setIsClient(true);
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setWelcomeText(dict?.Logins?.welcome?.[user.role] || dict?.Logins?.welcome?.default);
    } else {
      setWelcomeText(dict?.Logins?.welcome?.default);
    } 
  }, [dict]);

  const handleUaePassLogin = () => {
    // Redirect to UAE Pass authentication (placeholder)
    window.location.href = "https://ids.uaepass.ae/authenticationendpoint/login.do?client_id=dha_web_prod&commonAuthCallerPath=%2Foauth2%2Fauthorize&forceAuth=false&passiveAuth=false&redirect_uri=https%3A%2F%2Fservices.dha.gov.ae%2Fmga%2Fsps%2Foidc%2Frp%2FOIDC%2Fredirect%2FISAMOP&response_type=code&scope=urn%3Auae%3Adigitalid%3Aprofile&state=PJBXnq043S&tenantDomain=carbon.super&sessionDataKey=c85fce34-3318-4965-a57d-bfcf4b696a62&relyingParty=dha_web_prod&type=oauth2&sp=DHA+Web+Portal&isSaaSApp=false&authenticators=BasicAuthenticator%3ALOCAL";
  };

  const handleSheryanLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    const user = medcertusers.find(
      (u:any) =>
        u.loginType === "sheryan" &&
        u.email === email &&
        u.password === password
    );
    if (user) {
      setSuccessMsg(dict?.Logins?.successMsgs );
      // Save user to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
      }
      // let destination: string;
      // switch(user.role) {
      //   case "admin":
      //   destination = `/${lang}/admin/dashboard`;
      //   break;
      //   case "dha":
      //   destination = `/${lang}/dha/dashboard`;
      //   break;
      //   case "facility":
      //   destination = `/${lang}/facility/dashboard`;
      
      // }
      router.push(`/${lang}/${user.role}/dashboard`);
      setSuccessMsg(dict?.Logins?.successMsgs);
      // router.push(destination);
        
    } else {
      setErrorMsg(dict?.Logins?.errorMsgs);
    }
  };
  useEffect(() => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const u = JSON.parse(stored);
      setUserRole(u.role);
    }
  }
}, []);

  
  const renderWelcomeText = () => {
  const storedUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("dhaUser") || "{}")
      : {};
  const userRole = storedUser?.role || "";

  if (!userRole) return dict?.Logins?.welcome?.default;
  return (
    dict?.Logins?.welcome?.[userRole] 
    
  );
};

  return (
    <section className="min-h-auto pt-12 bg-[var(--section-bg-1)] text-[var(--section-text)]">
      <div className="grid lg:grid-cols-2 justify-center max-w-7xl mx-auto px-4 py-12 gap-12">
        {/* Left side: Info text */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">{dict?.Logins?.head}</h2>
          <p>
            {dict?.Logins?.para}
          </p>
          <ul className="list-disc pl-12">
            <li>{dict?.Logins?.list1}</li>

            <li>{dict?.Logins?.list2}</li>

            <li>{dict?.Logins?.list3}</li>
          </ul>
        </div>

        {/* Right side: Login form */}
        <div className="w-full max-w-md mx-auto">
          <div className="text-2xl font-semibold text-[var(--section-text)] mb-6 text-center">
             {isClient ? welcomeText : dict?.Logins?.welcome?.default}
          </div>
          <div className="rounded-lg shadow border border-[var(--section-border)] bg-[var(--section-bg-2)] text-[var(--section-text)]">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex justify-center mb-4 gap-4">
                <button
                  className={`px-4 py-2 rounded ${
                    loginType === "uae-pass"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 dark:bg-gray-700  dark:text-white"
                  }`}
                  onClick={() => setLoginType("uae-pass")}
                  type="button"
                >
                  {dict?.Logins?.button1}
                </button>
                <button
                  className={`px-4 py-2 rounded whitespace-nowrap ${
                    loginType === "sheryan"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 dark:bg-gray-700  dark:text-white"
                  }`}
                  onClick={() => setLoginType("sheryan")}
                  type="button"
                >
                  {dict?.Logins?.button2}
                </button>
              </div>
              {loginType === "uae-pass" ? (
                <div className="text-center">
                  <button
                    onClick={handleUaePassLogin}
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    {dict?.Logins?.button3}
                  </button>
                </div>
              ) : (
                <form
                  className="space-y-4 md:space-y-6"
                  action="#"
                  method="POST"
                  onSubmit={handleSheryanLogin}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium"
                    >
                      {dict?.Logins?.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="name@company.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full p-2.5 rounded-lg bg-[var(--section-bg-1)] border border-[var(--section-border)] text-[var(--section-text)] placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium"
                    >
                      {dict?.Logins?.password}
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full p-2.5 rounded-lg bg-[var(--section-bg-1)] border border-[var(--section-border)] text-[var(--section-text)] placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center text-sm gap-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      { dict?.Logins?.label1 }
                    </label>
                    <a
                      href="#"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {dict?.Logins?.atri}
                    </a>
                  </div>
                  {successMsg && (
                    <div className="text-green-600 text-center font-medium">
                      {successMsg}
                    </div>
                  )}
                  {errorMsg && (
                    <div className="text-red-600 text-center font-medium">
                      {errorMsg}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    {dict?.Logins?.button4}
                  </button>
                  <p className="text-sm font-light text-[var(--section-text-muted)]">
                    {dict?.Logins?.para1}{" "}
                    <a
                      href="#"
                      className="font-medium text-blue-500 hover:underline"
                    >
                      {dict?.Logins?.atri1}
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
