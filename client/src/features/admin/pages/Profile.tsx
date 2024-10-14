import React, { useState } from "react";

const AdminProfile = () => {
    const [editing, setEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "admin@example.com",
        phone: "123-456-7890",
        role: "Super Admin",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value,
        });
    };

    const toggleEdit = () => {
        setEditing(!editing);
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4 flex justify-center items-center">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
                {/* Profile Picture */}
                <div className="flex justify-center mb-4">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-gray-300"
                    />
                </div>

                {/* Admin Details */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
                        {profile.name}
                    </h2>
                    <p className="text-gray-600 text-center">{profile.role}</p>
                </div>

                {/* Profile Form */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleInputChange}
                            disabled={!editing}
                            className={`mt-1 block w-full px-3 py-2 border ${
                                editing
                                    ? "border-gray-300"
                                    : "border-transparent"
                            } rounded-md text-gray-900 focus:outline-none ${
                                editing
                                    ? "focus:border-indigo-500"
                                    : "bg-gray-100"
                            }`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleInputChange}
                            disabled={!editing}
                            className={`mt-1 block w-full px-3 py-2 border ${
                                editing
                                    ? "border-gray-300"
                                    : "border-transparent"
                            } rounded-md text-gray-900 focus:outline-none ${
                                editing
                                    ? "focus:border-indigo-500"
                                    : "bg-gray-100"
                            }`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700">
                            Phone
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={profile.phone}
                            onChange={handleInputChange}
                            disabled={!editing}
                            className={`mt-1 block w-full px-3 py-2 border ${
                                editing
                                    ? "border-gray-300"
                                    : "border-transparent"
                            } rounded-md text-gray-900 focus:outline-none ${
                                editing
                                    ? "focus:border-indigo-500"
                                    : "bg-gray-100"
                            }`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700">
                            Role
                        </label>
                        <input
                            type="text"
                            name="role"
                            value={profile.role}
                            onChange={handleInputChange}
                            disabled
                            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-transparent rounded-md text-gray-900"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-between">
                    {editing ? (
                        <>
                            <button
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                                onClick={() => {
                                    setEditing(false);
                                    // You can also add save logic here.
                                }}
                            >
                                Save
                            </button>
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                                onClick={() => setEditing(false)}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 w-full"
                            onClick={toggleEdit}
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

                {/* Password Reset */}
                <div className="mt-4 text-center">
                    <button className="text-red-500 hover:underline">
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
