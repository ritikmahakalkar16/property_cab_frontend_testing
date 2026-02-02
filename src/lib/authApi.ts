const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface RegisterPayload {
  name: string;
  email: string;
  role?: string;
  contact_no?: string;
}

export interface LoginPayload {
  email: string;
  otp: string;
  name?: string;
  role?: string;
  contact_no?: string;
}

export interface SendOtpPayload {
  email: string;
}

export interface AuthResponse {
  status: string;
  message?: string;
  data?: {
    id: string;
    email: string;
    name?: string;
    role: string;
    contact_no?: string;
    email_verified?: boolean;
  };
}

export const authApi = {
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || data.message || 'Registration failed');
    }

    return data;
  },

  sendOtp: async (payload: SendOtpPayload): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || data.message || 'Failed to send OTP');
    }

    return data;
  },

  loginWithOtp: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || data.message || 'Login failed');
    }

    return data;
  },

  logout: async (): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }
  },

  me: async (): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch current user');
    }

    return response.json();
  },
};

export default authApi;
