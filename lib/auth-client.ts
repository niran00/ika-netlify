export async function loginUserDB(formData: FormData) {
    const email = formData.get("email")?.toString()
    const password = formData.get("password")?.toString()
  
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    
    console.log("send res", res.json);

    return res.json()
}