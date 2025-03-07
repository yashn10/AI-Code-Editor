import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "../ui/button"
import WorkspaceHistory from "./WorkspaceHistory"
import Sidebarfooter from "./SidebarFooter"
import { useRouter } from "next/navigation"

const AppSidebar = () => {

    const router = useRouter();
    const { toggleSidebar } = useSidebar();

    const routetoMain = () => {
        router.push("/Main");
        toggleSidebar();
    }

    return (
        <Sidebar className="bg-gray-800">
            <SidebarHeader />
            <SidebarContent className="p-4" style={{ scrollbarWidth: 'none' }}>
                <Button className="text-md font-sans font-medium" onClick={routetoMain}>New Chat</Button>
                <WorkspaceHistory />
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter>
                <Sidebarfooter />
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar