// /services/authService.ts
export async function login(username: string, password: string) {
    /* Function that returns the JWT token and role of the user. It calls the 
        login endpoint of the ehr-app backend and handles the login logic. */
      
    const response = await fetch("http://localhost:8085/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Login failed");
    }
  
    const data = await response.json();
    return data; // { token, role }
  }
  