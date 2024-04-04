import { CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TeamDetails } from "./TeamDeatails";

// Define the interface for the Team
interface Team {
  name: string;
  users: string[];
}

// Define the props interface for the TeamCard component
interface TeamCardProps {
  teamDetails: Team; // Assign the Team interface to the teamDetails prop
}

// Define the TeamCard component
export default function TeamCard({ teamDetails }: TeamCardProps) {
  console.log('===============team details=====================');
  console.log(teamDetails);
  console.log('====================================');
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-6">
        <div className="space-y-1">
          {/* Display the team name */}
          <h2 className="text-lg font-bold">{teamDetails.name}</h2>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-100 p-4 dark:bg-gray-800">
      <TeamDetails teamDetails={teamDetails}/>
      </CardFooter>
    </Card>
  )
}
