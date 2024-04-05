"use client";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import UserUpdateForm from "./UserUpdateForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { removeUser } from "@/redux/userSlice";
import { toast } from "sonner";
import { removeUserFromTeam } from "@/redux/userSelect";

interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  domain: string;
  available: boolean;
  avatar: string;
  gender: string;
}

interface UserCardProps {
  user: User;
  onAddToTeam: (userId: string) => void;
  onRemove:any
}

export default function UserCard({ user, onAddToTeam,onRemove }: UserCardProps) {
  const handleAddToTeam = () => {
    onAddToTeam(user._id);
  };
  const handelRemove = () => {
    dispatch(removeUserFromTeam(user._id));
  };



  const dispatch = useDispatch<AppDispatch>();
  const team = useSelector((state: RootState) => state.team);


    const handleDeleteUser = async (id:string) => {
      try {
        const response = await fetch(`https://heliverse-assignment-90tw.onrender.com/api/users/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // If the deletion was successful, dispatch the deleteUser action
          console.log('User deleted successfully');
        toast.success("User deleted successfully");

          dispatch(removeUser(id))
        } else {
          console.error('Failed to delete user:', response.statusText);
        }
      } catch (error:any) {
        console.error('Error deleting user:', error.message);
      }
    };
  
  return (
    <Card className="">
      <CardHeader className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10 border">
                <AvatarImage
                  alt={`${user.first_name} ${user.last_name}`}
                  src={user.avatar}
                />
                <AvatarFallback>{`${user.first_name[0]}${user.last_name[0]}`}</AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5">
                <div className="font-semibold">{`${user.first_name} ${user.last_name}`}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {user.email}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {user.domain}
                </div>
              </div>
            </div>
            {/* <Button size="sm">{user.available ? 'Available' : 'Not Available'}</Button> */}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* <Button size="sm">Edit</Button> */}
            <UserUpdateForm user={user}/>
            <Button onClick={()=>handleDeleteUser(user._id)} size="sm" variant="outline">
              Delete
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className=" text-sm">
          <div className="flex justify-between w-full  gap-2">
            <div className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <div className="w-full"><span className={`${user.available ? "bg-green-300" : "bg-red-200"}  px-4 py-1 rounded-md`}>{user.available ? "Available" : "Not Available"}</span> </div>
           
{
 team.selectedUsers.some(
  (selectedUser) => selectedUser._id === user._id
) ?  <Button disabled={!user.available} onClick={handelRemove} size="sm" className="bg-red-400 hover:bg-red-500" variant="default">
Remove user
</Button> :  <Button disabled={!user.available} onClick={handleAddToTeam} size="sm" variant="default">
              Add to team
            </Button>
}
           
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
