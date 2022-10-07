import React from "react";

interface IUser {
    name: string;
    password: string;
}

export interface IUserContext {
    User: IUser;
    updateUser: (name:string) => void
  }
  
  // create context, but there is no default value - set it to undefined.
  export const QuizContext = React.createContext<IUserContext | undefined>(
    undefined
  );