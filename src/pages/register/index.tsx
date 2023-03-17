import { useState } from "react"
import { signIn } from "next-auth/client"

export default function RegisterForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false, // não redirecionar automaticamente
    })

    // tratar os resultados da autenticação
    console.log(result)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  )
}
