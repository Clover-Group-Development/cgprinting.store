"use client";

import { IUser } from "@/entities/user";
import { UserRole } from "@/enums";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [users, setUsers] = useState<Array<IUser>>([]);
  const [model, setModel] = useState<IUser>();
  const fnameInputRef = useRef<HTMLInputElement>(null);
  const lnameInputRef = useRef<HTMLInputElement>(null);
  const roleSelectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/users");
      setUsers(data);
    })();
  }, []);

  const updateModel = () => {
    const { value: firstName } = fnameInputRef.current!;
    const { value: lastName } = lnameInputRef.current!;
    const { value: role } = roleSelectRef.current!;

    setModel({
      firstName,
      lastName,
      role: Number(role),
    } as IUser);
  };

  const createUser = async () => {
    await axios.post("/api/users", model);
    alert("All good!");
  };

  return (
    <div>
      {users.map((u) => (
        <div key={u._id}>
          <h1>
            {u.lastName}, {u.firstName}
          </h1>
          <h1>{u.role}</h1>
        </div>
      ))}
      <form className="flex flex-col">
        <input name="firstName" onInput={updateModel} ref={fnameInputRef} />
        <input name="lastName" onInput={updateModel} ref={lnameInputRef} />
        <select ref={roleSelectRef}>
          <option key={0} value="0">
            Admin
          </option>
          <option key={1} value="1">
            Contributor
          </option>
          <option key={2} value="2">
            Customer
          </option>
        </select>
        <button type="button" onClick={createUser}>
          Create
        </button>
      </form>
    </div>
  );
}
