"use client"
import { AppDispatch, RootState } from '@/redux/store';
import { clearTeamState, setTeamName } from '@/redux/userSelect';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import TeamCard from './TeamCard';
import { Button } from './ui/button';
import { PiPlusBold } from 'react-icons/pi';

const TeamsList = () => {

    
    const dispatch = useDispatch<AppDispatch>();
    const teamsData = useSelector((state: RootState) => state.teams);
    const teamsList = teamsData.teams
    const team = useSelector((state: RootState) => state.team);

    console.log('================teanm====================');
    console.log(teamsList);
    console.log('====================================');

    interface Team {
        name: string;
        users: string[];
      }
    
  const handleCreateTeam = async () => {

    if(team.name=="" || team.selectedUsers.length ==0){
        toast.warning("please enter team name or select users for team")
    }
    try {
      // Create the team object
      const team2 = {
        name: team.name,
        selectedUsers: team.selectedUsers.map((user) => user._id.toString()), // Assuming selectedUsers contains the user objects
      };

      // Send a POST request to the backend API
      const response = await fetch("https://heliverse-assignment-90tw.onrender.com/api/team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(team2),
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to create team");
      }

      // Reset the form after team creation
    

      // Optionally, you can handle the response
      const data = await response.json();
      console.log("Team created successfully:", data);
      toast.success("Team created successfully",data.name)

      dispatch(clearTeamState())
    } catch (error: any) {
      console.error("Error creating team:", error.message);
    }
  };


  return (
   <>
   
   
   
  {/* team */}
  <div className="w-full py-5 h-fit px-10 border border-gray-200 rounded-md shadow-sm">
          <p className="font-semibold mb-2">Please Enter Team Name:</p>
          <input
          required
            type="text"
            placeholder="Enter team name..."
            value={team.name}
            onChange={(e:any)=>{dispatch(setTeamName(e.target.value))}}
            className="border border-gray-300 rounded-md px-3 py-2 mb-4"
          />

          <div>
            <p className="font-semibold mb-2 my-2">Selected users</p>
            <ul className='mb-5'>
              {team.selectedUsers.map((user) => (
                <li className='bg-gray-200 rounded-sm px-2 py-1 w-fit inline-block mx-1 my-1' key={user._id}>
                  {user.first_name} {user.last_name}
                </li>
              ))}
            </ul>
          </div>


          <Button
           variant={ 'default'}
            onClick={handleCreateTeam}
            className=" text-white px-4 py-2 rounded-md"
          >
          <PiPlusBold className='mr-2'/>  Create Team
          </Button>


<p className="font-bold text-2xl mt-10">Teams </p>
          <div className="flex flex-col gap-3 mt-5 ">

            {
                teamsList.map((teamDetails:Team)=>(<>
        
        <TeamCard teamDetails={teamDetails}/>
                </>))
            }
          </div>
        </div>
   </>
  )
}

export default TeamsList