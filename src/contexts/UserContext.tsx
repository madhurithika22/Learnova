import React, { createContext, useContext, useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  xp: number;
  level: number;
  streak: number;
  badges: string[];
  studyPreferences: {
    startTime: string;
    endTime?: string;
    breakDuration: number;
    lunchTime?: string;
  };
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  addXP: (amount: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock user data
const mockUser: User = {
  id: "1",
  name: "Madhu",
  email: "madhu@example.com",
  xp: 2450,
  level: 12,
  streak: 7,
  badges: ["early_finisher", "consistency_champ", "revision_master"],
  studyPreferences: {
    startTime: "17:00",
    endTime: "22:00",
    breakDuration: 30,
    lunchTime: "19:00",
  },
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUser(mockUser);
  };

  const signup = async (name: string, email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUser({
      ...mockUser,
      name,
      email,
      xp: 0,
      level: 1,
      streak: 0,
      badges: [],
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const addXP = (amount: number) => {
    if (user) {
      const newXP = user.xp + amount;
      const newLevel = Math.floor(newXP / 500) + 1;
      setUser({ ...user, xp: newXP, level: newLevel });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateUser,
        addXP,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
