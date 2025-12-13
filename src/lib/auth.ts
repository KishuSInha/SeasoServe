// Simple authentication using localStorage
export interface User {
  id: string;
  name: string;
  age: string;
  height: string;
  weight: string;
  allergies: string;
  diseases: string;
  dietType: string;
  email: string;
  password: string;
  createdAt: string;
}

const USERS_KEY = 'seasoserve_users';
const CURRENT_USER_KEY = 'seasoserve_current_user';

export const registerUser = (userData: Omit<User, 'id' | 'createdAt'>): { success: boolean; message: string } => {
  try {
    const users = getUsers();
    // Check if email already exists
    if (users.find(u => u.email === userData.email)) {
      return { success: false, message: 'Email already registered' };
    }

    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    return { success: true, message: 'Registration successful' };
  } catch (error) {
    return { success: false, message: 'Registration failed' };
  }
};

export const loginUser = (email: string, password: string): { success: boolean; message: string; user?: User } => {
  try {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }

    // Store current user (without password)
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

    return { success: true, message: 'Login successful', user };
  } catch (error) {
    return { success: false, message: 'Login failed' };
  }
};

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = (): Omit<User, 'password'> | null => {
  try {
    const userStr = localStorage.getItem(CURRENT_USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

const getUsers = (): User[] => {
  try {
    const usersStr = localStorage.getItem(USERS_KEY);
    return usersStr ? JSON.parse(usersStr) : [];
  } catch {
    return [];
  }
};
