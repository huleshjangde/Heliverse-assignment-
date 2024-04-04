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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setUsers } from "@/redux/userSlice";
import { toast } from "sonner";
import AddNewUser from "@/components/AddNewUser";
import { removeUserFromTeam, setSelectedUsers } from "@/redux/userSelect";
import TeamsList from "@/components/TeamsList";
import { setTeams } from "@/redux/teamsSlice";
import { Button } from "@/components/ui/button";

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

  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users);
  
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
        const response = await fetch(`https://heliverse-assignment-90tw.onrender.com/api/users`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data: User[] = await response.json();
        // setUserData(data);
        dispatch(setUsers(data));
      } catch (error: any) {
        console.error("Error fetching user data:", error.message);
      }
    }

    fetchUserData();
  }, []);

  const filteredUsers = users?.filter(
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

 

  const [selectedUsers, setSelectedUsers2] = useState<User[]>([]);
  const [teamName, setTeamName] = useState<string>("");
  const team = useSelector((state: RootState) => state.team);


  const handleUserSelect = (user: User) => {
    // Check if the user meets the criteria for selection
    const isUniqueDomain = team.selectedUsers.every(
      (selectedUser) => selectedUser.domain !== user.domain,
    );
    const isAvailable = user.available;

    if (isUniqueDomain && isAvailable) {
      // setSelectedUsers2((prevUsers) => [...prevUsers, user]);
      const updatedSelectedUsers = [...team.selectedUsers, user];
      dispatch(setSelectedUsers(updatedSelectedUsers));
    } else {
      // Notify the user that the selected user cannot be added to the team
  

      toast.warning("User cannot be added to the team. Please select a user with a unique domain and availability.")

    }
  };
  const onRemove = (id:any) => {
    console.log(id);
    console.log('====================================');
    console.log("hello");
    console.log('====================================');
    dispatch(removeUserFromTeam(id));
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



  const [teams, setTeams2] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`https://heliverse-assignment-90tw.onrender.com/api/team`);
        if (!response.ok) {
          throw new Error('Failed to fetch teams');
        }
        const data = await response.json();
        console.log('====================team data================');
        console.log(data);
        console.log('====================================');
        setTeams2(data);
    dispatch(setTeams(data));

      } catch (error:any) {
        console.error('Error fetching teams:', error.message);
      }
    };

    fetchTeams();
  }, []);

  return (
    <>
{
  show &&   <div className="fixed shadow-md z-50 top-20 w-[95vw] h-[100vh] overflow-y-scroll sm:w-[30vw] right-2 bg-gray-400">

  <TeamsList/>

</div>
}
   
    <div className="w-full fixed z-50 top-2 h-fit bg-white flex justify-between px-4 sm:px-20  shadow-md py-5"><h1 className="font-bold text-lg ">Heliverse Assignment</h1> <Button variant={"default"} onClick={()=> setShow(!show)}>Manage Team  <p className="size-5 rounded-full bg-white text-black ml-2">{team.selectedUsers.length > 0 && team.selectedUsers.length}</p></Button></div>
      <div className="flex  mt-24 flex-col space-x-4 mb-4 px-2 sm:px-10 border border-gray-300 rounded-md shadow-md mx-0 sm:mx-10 my-10">
      <p className=" font-bold px-5 text-2xl  w-fit rounded-md mb-5 mt-2">Filtter Users</p>
      <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border w-[200px] border-gray-300 rounded-md px-3 py-2 mb-4"
          />
          <div className="flex flex-wrap space-x-4 mb-4">


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
   
          
      </div>
     


     
      <div className=" flex flex-col">

      <div className="ml-10 mb-5  w-full flex justify-end px-28"> <AddNewUser/></div>

        <div className="w-full  px-2 sm:px-10 ">
         
          {filteredUsers && filteredUsers.length > 0 ? (
            <div className="grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {filteredUsers.map((user) => ( <>

                <UserCard
                  key={user._id}
                  user={user}
                  onAddToTeam={() => handleUserSelect(user)}
                  onRemove={() => onRemove}

                />

</>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 w-full  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {users &&
                users.map((user: any) => (
                  <UserCard
                    key={user._id}
                    user={user}
                    onAddToTeam={() => handleUserSelect(user)}
                    onRemove={() => onRemove(user._id as string) }
                  />
                ))}
            </div>
          )}
        </div>
      
      </div>
    </>
  );
}
