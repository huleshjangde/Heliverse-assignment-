import React, { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormField } from '@/redux/formSlice';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from 'next/image';
import { AppDispatch, RootState } from '@/redux/store';
import { toast } from 'sonner';
import { addUser } from '@/redux/userSlice';
import { PiPlus, PiPlusBold } from 'react-icons/pi';

interface User {
  
  first_name: string;
  last_name: string;
  email: string;
  domain: string;
  available: boolean;
  avatar: string;
  gender: string;
}

interface Props {
  user: User;
}

const AddNewUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userForms = useSelector((state: RootState) => state.userForm);
  var {available,avatar,domain,email,first_name,gender,last_name} = userForms.formData

  // useEffect(() => {
  //   // Populate the form data with the selected user's information when the modal is opened

  // }, [user, dispatch]);

  const setdata = () => {
   
      dispatch(setFormField({ field: 'first_name', value:"" }));
      dispatch(setFormField({ field: 'last_name', value:""}));
      dispatch(setFormField({ field: 'email', value:"" }));
      dispatch(setFormField({ field: 'domain', value:"" }));
      dispatch(setFormField({ field: 'gender', value:"" }));
      dispatch(setFormField({ field: 'available', value:"" }));
      dispatch(setFormField({ field: 'avatar', value:"" }));
    
  }


  const AddUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({available:available,avatar:avatar,domain:domain,email:email,first_name:first_name,gender:gender,last_name:last_name})
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(addUser(data));

        console.log('User Added successfully');
        toast.success("User Added successfully");
      } else {
        console.error('Failed to Add user:', response.statusText);
        toast.success("Failed to Add user");

      }
    } catch (error:any) {
      console.error('Error add user:', error.message);
    }
  };
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={setdata} variant="default"> <PiPlusBold className='mr-2'/> Add New User</Button>
      </DialogTrigger>

    

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="first name" className="text-right">
             First Name
            </Label>

            <Input     onChange={(e) => dispatch(setFormField({ field: "first_name",
    value: e.target.value}))} id="first name" value={`${first_name}`} className="col-span-3" />

          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="last name" className="text-right">
             Last Name
            </Label>
            <Input onChange={(e:any)=>{dispatch(setFormField({ field: 'last_name', value: e.target.value }))}} id="last name" value={last_name} className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" onChange={(e:any)=>{dispatch(setFormField({ field: 'email', value: e.target.value }))}} value={email} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="domain" className="text-right">
              Domain
            </Label>
            <Input onChange={(e:any)=>{dispatch(setFormField({ field: 'domain', value: e.target.value }))}} id="domain" value={domain} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="available" className="text-right">
          Available
        </Label>
        <div className="col-span-3 flex gap-5">
          <label htmlFor="available-yes">
            <input
              id="available-yes"
              type="radio"
              value="true"
              checked={available === true}
              onChange={(e:any)=>{dispatch(setFormField({ field: 'available', value: true }))}}
            />
            Yes
          </label>
          <label htmlFor="available-no">
            <input
              id="available-no"
              type="radio"
              value="false"
              checked={available === false}
              onChange={(e:any)=>{dispatch(setFormField({ field: 'available', value: false }))}}
            />
            No
          </label>
        </div>
        </div>

<div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Image" className="text-right">
              Image url
            </Label>
            <Input onChange={(e:any)=>{dispatch(setFormField({ field: 'avatar', value: e.target.value }))}} id="Image"  value={avatar} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="avatar" className="text-right">
              Avatar
            </Label>
            <Image width={100} height={100} src={avatar} alt="User Avatar" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={AddUser}>Add New</Button>
        </DialogFooter>
      </DialogContent>
     
    </Dialog>
  );
};

export default AddNewUser;
