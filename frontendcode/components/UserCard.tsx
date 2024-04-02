"use client";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent, Card } from "@/components/ui/card";

interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  domain: string;
  available: boolean;
  avatar: string;
}

interface UserCardProps {
  user: User;
  onAddToTeam: (userId: string) => void;
}

export default function UserCard({ user, onAddToTeam }: UserCardProps) {
  const handleAddToTeam = () => {
    onAddToTeam(user._id);
  };

  return (
    <Card>
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

          <div className="flex items-center gap-2">
            <Button size="sm">Edit</Button>
            <Button size="sm" variant="outline">
              Delete
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className=" text-sm">
          <div className="flex justify-between w-full  gap-2">
            <div className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span>{user.available ? "Yes" : "No"}</span>
            <Button onClick={handleAddToTeam} size="sm" variant="default">
              Add to team
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
