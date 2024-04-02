"use client";
import UserCard from "@/components/UserCard";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  domain: string;
  gender: string;
  available: boolean;
  avatar: string;
}

interface Filters {
  domain: string[];
  gender: string[];
  available: string[];
}
export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    domain: [],
    gender: [],
    available: [],
  });

  const [userData, setUserData] = useState<User[] | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch("http://localhost:3000/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data: User[] = await response.json();
        setUserData(data);
      } catch (error: any) {
        console.error("Error fetching user data:", error.message);
      }
    }

    fetchUserData();
  }, []);

  const filteredUsers = userData?.filter(
    (user) =>
      (selectedFilters.domain.length === 0 ||
        selectedFilters.domain.includes(user.domain)) &&
      (selectedFilters.gender.length === 0 ||
        selectedFilters.gender.includes(user.gender)) &&
      (selectedFilters.available.length === 0 ||
        selectedFilters.available.includes(user.available.toString())) &&
      (user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const handleFilterChange = (filterType: string, value: string[]) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  interface User2 {
    id: number;
    name: string;
    domain: string;
    available: boolean;
  }

  interface Team {
    name: string;
    users: string[];
  }

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [teamName, setTeamName] = useState<string>("");

  const handleUserSelect = (user: User) => {
    // Check if the user meets the criteria for selection
    const isUniqueDomain = selectedUsers.every(
      (selectedUser) => selectedUser.domain !== user.domain,
    );
    const isAvailable = user.available;

    if (isUniqueDomain && isAvailable) {
      setSelectedUsers((prevUsers) => [...prevUsers, user]);
    } else {
      // Notify the user that the selected user cannot be added to the team
      alert(
        "User cannot be added to the team. Please select a user with a unique domain and availability.",
      );
    }
  };

  // const userIds = selectedUsers.map(user => user._id);
  // const handleCreateTeam = () => {
  //   const team: Team = {
  //     name: teamName,
  //     users: selectedUsers.map(user => user._id.toString()), // Convert IDs to strings
  //   };
  //   // onCreateTeam(team);
  //   // Optionally, you can reset the form after team creation
  //   setTeamName('');
  //   setSelectedUsers([]);
  // };

  const handleCreateTeam = async () => {
    try {
      // Create the team object
      const team = {
        name: teamName,
        selectedUsers: selectedUsers.map((user) => user._id.toString()), // Assuming selectedUsers contains the user objects
      };

      // Send a POST request to the backend API
      const response = await fetch("http://localhost:3000/api/team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(team),
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to create team");
      }

      // Reset the form after team creation
      setTeamName("");
      setSelectedUsers([]);

      // Optionally, you can handle the response
      const data = await response.json();
      console.log("Team created successfully:", data);
    } catch (error: any) {
      console.error("Error creating team:", error.message);
    }
  };

  return (
    <>
      <div className="flex space-x-4 mb-4">
        <Select
          onValueChange={(value: any) => handleFilterChange("domain", [value])}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Domain" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Management">Management</SelectItem>
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="UI Designing">UI Designing</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value: any) => handleFilterChange("gender", [value])}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value: any) =>
            handleFilterChange("available", [value])
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Avaibility" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="true">Available</SelectItem>
              <SelectItem value="false">Not Available</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex">
        <div className="w-[70%] overflow-y-scroll h-[100vh] ">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 mb-4"
          />
          {filteredUsers && filteredUsers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
              {filteredUsers.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  onAddToTeam={() => handleUserSelect(user)}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {userData &&
                userData.map((user: any) => (
                  <UserCard
                    key={user._id}
                    user={user}
                    onAddToTeam={function (userId: string): void {
                      throw new Error("Function not implemented.");
                    }}
                  />
                ))}
            </div>
          )}
        </div>

        {/* team */}
        <div className="w-[30%] h-fit">
          <input
            type="text"
            placeholder="Enter team name..."
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 mb-4"
          />

          <div>
            <p>Selected users:</p>
            <ul>
              {selectedUsers.map((user) => (
                <li key={user._id}>
                  {user.first_name} {user.last_name}
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={handleCreateTeam}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Create Team
          </button>
        </div>
      </div>
    </>
  );
}
