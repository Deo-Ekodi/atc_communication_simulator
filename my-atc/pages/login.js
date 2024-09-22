// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const [role, setRole] = useState('pilot'); // Default role
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // Implement authentication logic here (e.g., API call)
    // For now, we'll simulate a successful login
    const isATCLimitReached = false; // Check if ATC limit is reached (implement logic)
    
    if (role === 'atc' && isATCLimitReached) {
      alert('Maximum ATC users reached!');
      return;
    }
    
    router.push(role === 'atc' ? '/atc-dashboard' : '/pilot-dashboard');
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-md shadow-md w-80">
        <h1 className="text-2xl mb-4">Login as {role.toUpperCase()}</h1>
        <select onChange={(e) => setRole(e.target.value)} className="mb-4 p-2 rounded">
          <option value="pilot">Pilot</option>
          <option value="atc">ATC</option>
        </select>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full p-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
