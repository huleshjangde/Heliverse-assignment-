import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Card, CardHeader, CardContent } from "./ui/card";
import UserUpdateForm from "./UserUpdateForm";

// Define the props interface for the TeamDetails component
interface TeamDetailsProps {
  teamDetails: {
    name: string;
    users: string[];
  };
}

export function TeamDetails({ teamDetails }: TeamDetailsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Team Details</DialogTitle>
         
        </DialogHeader>
        <div>
            <p className="shadow-sm  mb-5 w-fit px-2 pt-2 rounded-md">{teamDetails.name}</p>
            {/* <pre>{teamDetails.users}</pre> */}
            {
              teamDetails.users.map((user:any)=>(<>
              

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
                <AvatarFallback>{`${user.first_name}${user.last_name}`}</AvatarFallback>
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

       
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className=" text-sm">
          <div className="flex justify-between w-full  gap-2">
            <div className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <div className="w-full"><span className={`${user.available ? "bg-green-300" : "bg-red-200"}  px-4 py-1 rounded-md`}>{user.available ? "Available" : "Not Available"}</span> </div>
           

           
          </div>
        </div>
      </CardContent>
    </Card>
              </>))  
            }
        </div>
      </DialogContent>
    </Dialog>
  );
}






