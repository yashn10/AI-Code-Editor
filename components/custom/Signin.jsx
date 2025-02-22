import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useContext } from "react";
import UserContext from "@/context/UserContext";
import { Button } from "../ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import uuid4 from "uuid4";
// import CreateUser from "@/convex/users";


const Signin = ({ openDialogue, closeDialogue }) => {

    const { user, setUser } = useContext(UserContext);
    const CreateUser = useMutation(api.users.CreateUser);

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse);
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: 'Bearer ' + tokenResponse.access_token, Accept: 'application/json' } },
            );

            console.log(userInfo);
            const data = userInfo?.data;
            await CreateUser({
                uid: uuid4(),
                name: data?.name,
                email: data?.email,
                image: data?.picture
            })

            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(data));
            }

            setUser(userInfo?.data);
            closeDialogue(true);
        },
        onError: errorResponse => console.log(errorResponse),
    });

    return (

        <Dialog open={openDialogue} onOpenChange={closeDialogue}>
            <DialogContent>
                <DialogHeader>
                    <div className="p-2 gap-6 flex flex-col">
                        <DialogTitle className="text-center">Please sign in to continue</DialogTitle>
                        <DialogDescription className="text-center">
                            To use this feature you need to be signed in with your Google account.
                        </DialogDescription>
                        <Button variant="outline" className="w-1/3 mx-auto" onClick={googleLogin}>Sign in with Google</Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default Signin