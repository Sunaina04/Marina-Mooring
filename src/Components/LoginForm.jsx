import React from "react";
import { useState } from "react";

export default function LoginForm() {
    const [form, setForm] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        Password: '',
        Address: '',
        zipcode: '',
    })

    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <>
            <form className="flex flex-col gap-y-2">
                <input type="text" name="firstname" onChange={handleChange} placeholder="First Name" className="px-4 py-2" />
                <input type="text" name="lastname" onChange={handleChange} placeholder="Last Name" className="px-4 py-2" />
                <input type="text" name="email" onChange={handleChange} placeholder="Email" className="px-4 py-2" />
                <input type="text" name="password" onChange={handleChange} placeholder="Password" className="px-4 py-2" />
                <input type="text" name="address" onChange={handleChange} placeholder="Address" className="px-4 py-2" />
                <input type="text" name="zipcode" onChange={handleChange} placeholder="Zip Code" className="px-4 py-2" />
            </form>
            <div>
                {form.FirstName}
            </div>
        </>
    )
}