"use client";

import { IUser } from "@/entities/user";
import { UserRole } from "@/enums";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [users, setUsers] = useState<Array<IUser>>([]);
  const [isCreate, setIsCreate] = useState(false);
  const [model, setModel] = useState<Partial<IUser>>({});
  const fnameInputRef = useRef<HTMLInputElement>(null);
  const lnameInputRef = useRef<HTMLInputElement>(null);
  const roleSelectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/users");
      setUsers(data);
    })();
  }, []);

  const renderRow = (user: IUser) => {
    return (
      <tr key={user._id}>
        <td>
          {user.lastName}, {user.firstName}
        </td>
        <td>{UserRole[user.role]}</td>
        <td>
          <button onClick={() => setModel({ ...user })}>Edit</button>
          <button onClick={del}>Delete</button>
        </td>
      </tr>
    );
  };

  const openForm = (create: boolean) => {
    setIsCreate(create);
    if (isCreate) setModel({});
  };

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

  const del = async () => {};

  const save = async () => {
    isCreate
      ? await axios.post("/api/users", model)
      : await axios.patch("/api/users", model);

    alert("All good!");
  };

  return (
    <div>
      <button onClick={() => openForm(true)}>Add</button>
      <table>
        <tr>
          <th>Fullname</th>
          <th>Role</th>
          <th></th>
        </tr>
        <tr>{users.map(renderRow)}</tr>
      </table>
      <form className="flex flex-col">
        <input
          name="firstName"
          value={model?.firstName}
          onInput={updateModel}
          ref={fnameInputRef}
        />
        <input
          name="lastName"
          value={model?.lastName}
          onInput={updateModel}
          ref={lnameInputRef}
        />
        <select
          name="role"
          value={model?.role}
          onChange={updateModel}
          ref={roleSelectRef}
        >
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
        <button type="button" onClick={save}>
          Create
        </button>
      </form>
    </div>
  );
}
