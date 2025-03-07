import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const Logout = ({ openoutDialogue, closeDialogue }) => {

    const router = useRouter();

    const handleSignout = () => {
        localStorage.removeItem("user");
        setUser(null);
        router.push('/');
    }

    return (
        <Dialog open={openoutDialogue} onOpenChange={closeDialogue}>
            <DialogContent>
                <DialogHeader>
                    <div className="p-2 gap-6 flex flex-col">
                        <DialogTitle className="text-center">Are you sure to sign out ?</DialogTitle>
                        <DialogDescription className="text-center">
                            You will be signed out of your account and will have to sign in again to continue using our services.
                        </DialogDescription>
                        <Button variant="outline" className="w-1/3 mx-auto" onClick={handleSignout}>Sign Out</Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )

}

export default Logout