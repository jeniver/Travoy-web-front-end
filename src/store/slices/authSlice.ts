import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@travoy/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const loadAuthState = (): AuthState => {
  try {
    const serializedUser = localStorage.getItem('user');
    const serializedToken = localStorage.getItem('token');
    if (serializedUser === null || serializedToken === null) {
      return {
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    }
    const user = JSON.parse(serializedUser) as User;
    const token = serializedToken;
    return {
      user,
      token,
      isAuthenticated: !!token,
      loading: false,
    };
  } catch (e) {
    console.error("Could not load auth state from localStorage", e);
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
    };
  }
};

const initialState: AuthState = loadAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      // localStorage.setItem('user', JSON.stringify(action.payload)); // Handled by login/register forms
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      // localStorage.setItem('token', action.payload); // Handled by login/register forms
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setToken, logout, setLoading } = authSlice.actions;

export default authSlice.reducer;
