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

interface Props {
  user: User;
}

const UserForm: React.FC<Props> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();
  const userForms = useSelector((state: RootState) => state.userForm);
  var userForm = userForms.formData

  // useEffect(() => {
  //   // Populate the form data with the selected user's information when the modal is opened

  // }, [user, dispatch]);

  const setdata = () => {
    if (user) {
      console.log('=================user===================');
      console.log(user);
      console.log('====================================');
      dispatch(setFormField({ field: 'first_name', value:user.first_name }));
      dispatch(setFormField({ field: 'last_name', value:user.last_name }));
      dispatch(setFormField({ field: '_id', value:user._id }));
      dispatch(setFormField({ field: 'email', value:user.email }));
      dispatch(setFormField({ field: 'domain', value:user.domain }));
      dispatch(setFormField({ field: 'gender', value:user.gender }));
      dispatch(setFormField({ field: 'available', value:user.available }));
      dispatch(setFormField({ field: 'avatar', value:user.avatar }));
    }
  }

useEffect
  const updateUser = async () => {
    try {
      const response = await fetch(`https://heliverse-assignment-90tw.onrender.com/api/users/${userForm._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userForm)
      });

      if (response.ok) {
        console.log('User updated successfully');
        toast.success("User updated successfully");
      } else {
        console.error('Failed to update user:', response.statusText);
      }
    } catch (error:any) {
      console.error('Error updating user:', error.message);
    }
  };
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={setdata} variant="outline">Edit Profile</Button>
      </DialogTrigger>

      {
        userForm? <>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit user profile</DialogTitle>
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
    value: e.target.value}))} id="first name" value={`${userForm.first_name}`} className="col-span-3" />

          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="last name" className="text-right">
             Last Name
            </Label>
            <Input onChange={(e:any)=>{dispatch(setFormField({ field: 'last_name', value: e.target.value }))}} id="last name" value={userForm.last_name} className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" onChange={(e:any)=>{dispatch(setFormField({ field: 'email', value: e.target.value }))}} value={userForm.email} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="domain" className="text-right">
              Domain
            </Label>
            <Input onChange={(e:any)=>{dispatch(setFormField({ field: 'domain', value: e.target.value }))}} id="domain" value={userForm.domain} className="col-span-3" />
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
              checked={userForm.available === true}
              onChange={(e:any)=>{dispatch(setFormField({ field: 'available', value: true }))}}
            />
            Yes
          </label>
          <label htmlFor="available-no">
            <input
              id="available-no"
              type="radio"
              value="false"
              checked={userForm.available === false}
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
            <Input onChange={(e:any)=>{dispatch(setFormField({ field: 'avatar', value: e.target.value }))}} id="Image"  value={userForm.avatar} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="avatar" className="text-right">
              Avatar
            </Label>
            <Image width={100} height={100} src={userForm.avatar} alt="User Avatar" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={updateUser}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
      </> : null }
    </Dialog>
  );
};

export default UserForm;
